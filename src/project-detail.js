import { getSafeExternalUrl } from "./url-security.js?v=optimisation-v19-20260903";

export function renderProjectDetail(project, options = {}) {
  const getImageSrc = typeof options.getImageSrc === "function"
    ? options.getImageSrc
    : (item) => String(item?.image || "");
  const imageSrc = getImageSrc(project);
  return `
    <button class="project-detail-close" type="button" data-project-detail-close aria-label="Fermer le projet">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6 6 18"></path>
        <path d="M6 6l12 12"></path>
      </svg>
    </button>
    <article class="project-detail-card">
      <div class="project-detail-hero">
        <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(project.name)}" width="960" height="600" loading="eager" decoding="async" fetchpriority="high">
        <div>
          <p class="project-detail-category">${escapeHtml(project.category)}</p>
          <h3 id="project-detail-title">${escapeHtml(project.name)}</h3>
          <p class="project-detail-comment">${escapeHtml(project.comment)}</p>
          ${renderProjectHostingerLink(project)}
          ${renderProjectActions(project)}
        </div>
      </div>
      ${renderProjectTags(project.stack)}
      ${renderProjectTextBlock("À quoi il sert", project.details?.application || project.comment, "project-detail-text-blue")}
      ${renderProjectList("Fonctions", project.details?.capabilities || project.functions, "project-detail-list-green")}
      ${renderProjectList("Avancement", project.progress || project.details?.avancement || [], "project-detail-list-amber")}
      ${renderProjectLinks(project)}
      ${renderProjectScreenshots(project)}
    </article>
  `;
}

function renderProjectHostingerLink(project) {
  const projectLink = getProjectPrimaryApplicationLink(project);
  if (!projectLink) return "";
  const displayUrl = formatProjectUrl(projectLink.url);

  return `
    <div class="project-detail-hostinger">
      <p>${escapeHtml(projectLink.label)}</p>
      <a href="${escapeHtml(projectLink.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir ${escapeHtml(projectLink.label.toLowerCase())} ${escapeHtml(project.name)}">
        <span>${escapeHtml(displayUrl)}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7"></path>
          <path d="M9 7h8v8"></path>
        </svg>
      </a>
    </div>
  `;
}

function renderProjectActions(project) {
  const actions = [];
  const githubUrl = getSafeExternalUrl(project.githubUrl);
  if (githubUrl) actions.push(renderProjectAction(githubUrl, "Détails GitHub"));
  if (!actions.length) return "";
  return `<div class="project-detail-actions">${actions.join("")}</div>`;
}

function renderProjectLinks(project) {
  const links = [];
  const applicationLink = getProjectPrimaryApplicationLink(project);
  if (applicationLink) links.push(`Application publique: ${formatProjectUrl(applicationLink.url)}`);
  else links.push("Application publique: pas encore disponible.");
  const githubUrl = getSafeExternalUrl(project.githubUrl);
  if (githubUrl) links.push(`Détails GitHub: ${formatProjectUrl(githubUrl)}`);
  else links.push("GitHub: pas encore disponible.");
  return renderProjectList("Liens", links, "project-detail-list-blue");
}

function getProjectHostingerUrl(project) {
  return getSafeExternalUrl(project.hostingerUrl || project.url);
}

function getProjectPrimaryApplicationLink(project) {
  const hostingerUrl = getProjectHostingerUrl(project);
  if (hostingerUrl) return { url: hostingerUrl, label: "Application" };
  const privateUrl = getSafeExternalUrl(project.privateUrl);
  if (privateUrl) return { url: privateUrl, label: project.privateLabel || "Accès privé" };
  return null;
}

function formatProjectUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.host + parsed.pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
}

function renderProjectAction(url, label) {
  return `
    <a class="project-detail-action" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
      <span>${escapeHtml(label)}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 17 17 7"></path>
        <path d="M9 7h8v8"></path>
      </svg>
    </a>
  `;
}

function renderProjectTags(tags = []) {
  if (!tags.length) return "";
  return `
    <div class="project-detail-tags">
      ${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>
  `;
}

function renderProjectTextBlock(title, body, className = "") {
  if (!body) return "";
  return `
    <section class="project-detail-text ${className}">
      <p>${escapeHtml(title)}</p>
      <div>${escapeHtml(body)}</div>
    </section>
  `;
}

function renderProjectList(title, lines = [], className = "") {
  const items = (Array.isArray(lines) ? lines : [lines])
    .map((line) => String(line || "").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (!items.length) return "";
  return `
    <section class="project-detail-list ${className}">
      <p>${escapeHtml(title)}</p>
      <ul>
        ${items.map((line) => `<li><span></span>${escapeHtml(line)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderProjectScreenshots(project) {
  const screenshots = project.screenshots || [];
  if (!screenshots.length) return "";
  return `
    <section class="project-detail-shots" aria-label="Captures d'écran">
      <p>Captures d'écran</p>
      <div>
        ${screenshots
          .map((shot) => `
            <figure>
              <img src="${escapeHtml(shot)}" alt="${escapeHtml(project.name)} capture d'écran" loading="lazy" decoding="async">
            </figure>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}
