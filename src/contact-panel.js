import { setModalBackgroundInert, trapFocusWithin } from "./modal-accessibility.js?v=optimisation-v19-20260903";

const CONTACT_PANEL_MIN_WIDTH = 320;
const CONTACT_PANEL_MIN_HEIGHT = 420;
const CONTACT_PANEL_VIEWPORT_GAP = 24;
const CONTACT_PANEL_KEYBOARD_STEP = 28;

export function createContactPanelController(options = {}) {
  const {
    panel,
    trigger,
    closeButton,
    form,
    status,
    resizeHandle,
    getContactScene,
    getEffectiveStoryProgress,
    contactMediaPreloadFrom,
    isMobileViewport,
    clamp
  } = options;

  let bound = false;
  let returnFocus = null;
  const resizeState = {
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0
  };

  function bind() {
    if (bound || !panel || !trigger || !form) return;
    bound = true;
    refreshStartedAt();
    bindResize();
    closeButton?.addEventListener("click", close);
    document.addEventListener("keydown", handleDocumentKeydown);
    form.addEventListener("submit", handleSubmit);
  }

  function request(requestOptions = {}) {
    if (!panel || !trigger) return;
    if (requestOptions.returnFocus instanceof HTMLElement) {
      returnFocus = requestOptions.returnFocus;
    }
    if (panel.hidden) {
      open({ materialize: true });
      return;
    }
    close();
  }

  function open(openOptions = {}) {
    if (!panel || !trigger) return;
    const materialize = openOptions.materialize === true;
    panel.hidden = false;
    panel.focus({ preventScroll: true });
    setModalBackgroundInert(panel, true);
    document.body.classList.add("is-contact-panel-open");
    panel.classList.remove("is-open", "is-materializing");
    trigger.setAttribute("aria-expanded", "true");
    setCtaExpanded(true);
    void panel.offsetWidth;
    if (materialize) panel.classList.add("is-materializing");
    panel.classList.add("is-open");
    fitToViewport();
    window.setTimeout(() => {
      if (!panel.hidden && panel.classList.contains("is-open")) {
        panel.querySelector("input[name='name']")?.focus();
      }
    }, materialize ? 920 : 0);
    if (materialize) {
      window.setTimeout(() => panel.classList.remove("is-materializing"), 1080);
    }
  }

  function close(closeOptions = {}) {
    if (!panel || !trigger) return;
    const restoreFocus = closeOptions.restoreFocus !== false;
    clearResizeState();
    panel.classList.remove("is-open", "is-materializing");
    document.body.classList.remove("is-contact-panel-open");
    trigger.setAttribute("aria-expanded", "false");
    setCtaExpanded(false);
    getContactScene?.()?.setActive?.(getEffectiveStoryProgress() >= contactMediaPreloadFrom);
    setModalBackgroundInert(panel, false);
    window.setTimeout(() => {
      if (!panel.classList.contains("is-open")) panel.hidden = true;
    }, 180);
    if (restoreFocus) {
      const focusTarget = returnFocus && !returnFocus.disabled ? returnFocus : trigger;
      focusTarget?.focus();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status) status.textContent = "Envoi en cours...";

    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });
      const payload = await readJsonResponse(response);
      if (!response.ok || !payload.ok) throw new Error(payload.message || "Erreur d'envoi");

      form.reset();
      refreshStartedAt();
      if (status) status.textContent = "Message reçu.";
      close();
      getContactScene?.()?.showReceivedMessage?.();
    } catch (error) {
      if (status) {
        status.textContent = error instanceof Error && error.message
          ? error.message
          : "Envoi indisponible. Réessayez dans un instant.";
      }
    }
  }

  function handleDocumentKeydown(event) {
    if (panel.hidden) return;
    if (event.key === "Tab") {
      trapFocusWithin(event, panel);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }

  function refreshStartedAt() {
    const startedAtInput = form?.querySelector("input[name='form_started_at']");
    if (!startedAtInput || startedAtInput.tagName !== "INPUT") return;
    const startedAt = String(Math.floor(Date.now() / 1000));
    startedAtInput.setAttribute("value", startedAt);
    startedAtInput.value = startedAt;
  }

  function setCtaExpanded(expanded) {
    document.querySelectorAll("[data-contact-cta]").forEach((button) => {
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  function bindResize() {
    if (!resizeHandle || !panel || !form) return;
    resizeHandle.addEventListener("pointerdown", startResize);
    resizeHandle.addEventListener("keydown", handleResizeKeydown);
  }

  function startResize(event) {
    if (!canResize()) return;
    event.preventDefault();
    event.stopPropagation();
    resizeHandle.focus({ preventScroll: true });
    const rect = panel.getBoundingClientRect();
    resizeState.active = true;
    resizeState.pointerId = event.pointerId;
    resizeState.startX = event.clientX;
    resizeState.startY = event.clientY;
    resizeState.startWidth = rect.width;
    resizeState.startHeight = rect.height;
    document.body.classList.add("is-contact-resizing");
    panel.classList.add("is-resizing");
    resizeHandle.setPointerCapture?.(event.pointerId);
    window.addEventListener("pointermove", resize, { passive: false });
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);
  }

  function resize(event) {
    if (!resizeState.active || event.pointerId !== resizeState.pointerId) return;
    event.preventDefault();
    const width = resizeState.startWidth + (event.clientX - resizeState.startX) * 2;
    const height = resizeState.startHeight + (event.clientY - resizeState.startY) * 2;
    setSize(width, height);
  }

  function stopResize(event) {
    if (!resizeState.active || event.pointerId !== resizeState.pointerId) return;
    resizeHandle?.releasePointerCapture?.(event.pointerId);
    clearResizeState();
  }

  function handleResizeKeydown(event) {
    if (!canResize()) return;
    const rect = panel.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;

    if (event.key === "ArrowRight") width += CONTACT_PANEL_KEYBOARD_STEP;
    else if (event.key === "ArrowLeft") width -= CONTACT_PANEL_KEYBOARD_STEP;
    else if (event.key === "ArrowDown") height += CONTACT_PANEL_KEYBOARD_STEP;
    else if (event.key === "ArrowUp") height -= CONTACT_PANEL_KEYBOARD_STEP;
    else if (event.key === "Home") {
      event.preventDefault();
      clearSize();
      return;
    } else {
      return;
    }

    event.preventDefault();
    setSize(width, height);
  }

  function canResize() {
    return Boolean(panel && form && resizeHandle && !isMobileViewport());
  }

  function setSize(width, height) {
    const limits = getSizeLimits();
    const nextWidth = clamp(width, limits.minWidth, limits.maxWidth);
    const nextHeight = clamp(height, limits.minHeight, limits.maxHeight);
    panel.style.setProperty("--contact-panel-width", `${Math.round(nextWidth)}px`);
    panel.style.setProperty("--contact-panel-height", `${Math.round(nextHeight)}px`);
    panel.classList.add("is-user-resized");
  }

  function fitToViewport() {
    if (!panel || !panel.classList.contains("is-user-resized")) return;
    if (!canResize()) {
      clearSize();
      return;
    }
    const rect = panel.getBoundingClientRect();
    setSize(rect.width, rect.height);
  }

  function clearSize() {
    if (!panel) return;
    clearResizeState();
    panel.classList.remove("is-user-resized", "is-resizing");
    panel.style.removeProperty("--contact-panel-width");
    panel.style.removeProperty("--contact-panel-height");
  }

  function clearResizeState() {
    resizeState.active = false;
    resizeState.pointerId = -1;
    document.body.classList.remove("is-contact-resizing");
    panel?.classList.remove("is-resizing");
    window.removeEventListener("pointermove", resize);
    window.removeEventListener("pointerup", stopResize);
    window.removeEventListener("pointercancel", stopResize);
  }

  function getSizeLimits() {
    const viewport = window.visualViewport || window;
    const viewportWidth = Number(viewport.width) || window.innerWidth;
    const viewportHeight = Number(viewport.height) || window.innerHeight;
    const maxWidth = Math.max(1, viewportWidth - CONTACT_PANEL_VIEWPORT_GAP * 2);
    const maxHeight = Math.max(1, viewportHeight - CONTACT_PANEL_VIEWPORT_GAP * 2);
    return {
      minWidth: Math.min(CONTACT_PANEL_MIN_WIDTH, maxWidth),
      minHeight: Math.min(CONTACT_PANEL_MIN_HEIGHT, maxHeight),
      maxWidth,
      maxHeight
    };
  }

  return { bind, request, open, close, fitToViewport };
}

export async function readJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();
  return { ok: false, message: "Envoi indisponible. Réessayez dans un instant." };
}
