const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

const backgroundSnapshots = new WeakMap();
const siblingSnapshots = new WeakMap();

export function setModalBackgroundInert(modal, active) {
  if (!(modal instanceof HTMLElement)) return;
  if (active) {
    if (backgroundSnapshots.has(modal)) return;
    const snapshot = Array.from(document.body.children)
      .filter((element) => element !== modal && element.tagName !== "SCRIPT")
      .map((element) => ({
        element,
        inert: element.hasAttribute("inert"),
        ariaHidden: element.getAttribute("aria-hidden")
      }));
    backgroundSnapshots.set(modal, snapshot);
    snapshot.forEach(({ element }) => {
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    });
    return;
  }

  restoreSnapshot(backgroundSnapshots.get(modal));
  backgroundSnapshots.delete(modal);
}

export function setSiblingContentInert(container, exception, active) {
  if (!(container instanceof HTMLElement) || !(exception instanceof HTMLElement)) return;
  if (active) {
    if (siblingSnapshots.has(exception)) return;
    const snapshot = Array.from(container.children)
      .filter((element) => element !== exception)
      .map((element) => ({
        element,
        inert: element.hasAttribute("inert"),
        ariaHidden: element.getAttribute("aria-hidden")
      }));
    siblingSnapshots.set(exception, snapshot);
    snapshot.forEach(({ element }) => {
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    });
    return;
  }

  restoreSnapshot(siblingSnapshots.get(exception));
  siblingSnapshots.delete(exception);
}

export function trapFocusWithin(event, container) {
  if (event.key !== "Tab" || !(container instanceof HTMLElement)) return false;
  const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter((element) => element instanceof HTMLElement && isFocusable(element));

  if (!focusable.length) {
    event.preventDefault();
    container.focus({ preventScroll: true });
    return true;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (!container.contains(active)) {
    event.preventDefault();
    first.focus({ preventScroll: true });
    return true;
  }
  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
    return true;
  }
  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
    return true;
  }
  return false;
}

function restoreSnapshot(snapshot = []) {
  snapshot.forEach(({ element, inert, ariaHidden }) => {
    if (inert) element.setAttribute("inert", "");
    else element.removeAttribute("inert");
    if (ariaHidden === null) element.removeAttribute("aria-hidden");
    else element.setAttribute("aria-hidden", ariaHidden);
  });
}

function isFocusable(element) {
  if (element.hidden || element.closest("[hidden]")) return false;
  const styles = getComputedStyle(element);
  return styles.display !== "none" && styles.visibility !== "hidden";
}
