window.RC_STUDY_MODAL={"emoji": "\ud83d\udcad", "title": "Lembre de Mim", "stack": "Ren'Py Web", "accent": "#db2777"};
/*! rc-study-modal v1 \u2014 Study Project FAB + modal (framework-agnostic).
 * Config: window.RC_STUDY_MODAL = { title, titlePt, emoji, stack, designAuthor, designAuthorUrl, designUrl, accent, avatar }
 * Persists in localStorage "rc-study-modal": { analyticsEnabled (default true), hasSeenModal, lastVisit }.
 * API: window.rcStudyModal.open(), .isAnalyticsEnabled(); event "rc-study-modal:analytics" (detail: boolean).
 */
(function () {
  if (typeof window === "undefined" || window.rcStudyModal) return;
  var KEY = "rc-study-modal";
  var PORTFOLIO = "https://ricardo-camilo-dev-frontend-web.netlify.app";
  var LINKEDIN = "https://www.linkedin.com/in/ricardo-camilo-programador-frontend-web-developer";
  var c = window.RC_STUDY_MODAL || {};
  var accent = c.accent || "#16a34a";
  var lang = (document.documentElement.lang || navigator.language || "en").toLowerCase();
  var pt = lang.indexOf("pt") === 0;
  var T = pt
    ? { pre: "Projeto de Estudo", welcome: "Bem-vindo ao meu projeto de estudo! \ud83d\ude80", desc: "Esta \u00e9 uma demonstra\u00e7\u00e3o das minhas habilidades de desenvolvimento frontend, com foco em tecnologias web modernas e boas pr\u00e1ticas.", portfolio: "Conhe\u00e7a meu portf\u00f3lio", linkedin: "Conecte-se no LinkedIn", analytics: "Permitir ferramentas de an\u00e1lise", credits: "Cr\u00e9ditos do design:", original: "Ver design original", open: "Abrir informa\u00e7\u00f5es do projeto", close: "Fechar" }
    : { pre: "Study Project", welcome: "Welcome to my study project! \ud83d\ude80", desc: "This is a demonstration of my frontend development skills, focusing on modern web technologies and best practices.", portfolio: "Check out my portfolio", linkedin: "Connect on LinkedIn", analytics: "Allow Analytics Tools", credits: "Design credits:", original: "View original design", open: "Open project info", close: "Close" };

  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) {}
    if (typeof s.analyticsEnabled !== "boolean") s.analyticsEnabled = true;
    if (s.lastVisit && Date.now() - new Date(s.lastVisit).getTime() > 3600000) s.hasSeenModal = false;
    return s;
  }
  var state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  state.lastVisit = new Date().toISOString(); save();

  function applyConsent(on) {
    try { if (window.gtag) window.gtag("consent", "update", { analytics_storage: on ? "granted" : "denied", ad_storage: on ? "granted" : "denied" }); } catch (e) {}
    try { if (window.clarity) window.clarity("consent", on); } catch (e) {}
    window.dispatchEvent(new CustomEvent("rc-study-modal:analytics", { detail: on }));
  }

  var css = ".rcsm-fab{position:fixed;left:16px;bottom:16px;z-index:2147483000;width:52px;height:52px;border-radius:50%;padding:0;border:3px solid #fff;box-shadow:0 4px 14px rgba(0,0,0,.3);cursor:pointer;overflow:hidden;background:#fff;transition:transform .2s}.rcsm-fab:hover,.rcsm-fab:focus-visible{transform:scale(1.1);outline:3px solid ACC}.rcsm-fab img{width:100%;height:100%;object-fit:cover}.rcsm-bg{position:fixed;inset:0;z-index:2147483001;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.rcsm-bg[hidden]{display:none}.rcsm{background:#fff;color:#1f2937;border-radius:16px;max-width:560px;width:100%;max-height:90vh;overflow:auto;padding:20px;box-shadow:0 20px 50px rgba(0,0,0,.35)}.rcsm h2{margin:0 32px 16px 0;font-size:18px;line-height:1.3}.rcsm-x{float:right;border:0;background:transparent;font-size:24px;cursor:pointer;color:#4b5563;line-height:1}.rcsm-w{background:linear-gradient(90deg,ACC,#2563eb);color:#fff;padding:14px;border-radius:10px;text-align:center;font-weight:600;font-size:17px}.rcsm-d{background:#f3f4f6;padding:14px;border-radius:10px;text-align:center;margin:14px 0;line-height:1.5}.rcsm a.rcsm-b{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:10px}.rcsm-p{background:#f3f4f6;color:#374151}.rcsm-l{background:#eff6ff;color:#1d4ed8}.rcsm-p img{width:26px;height:26px;border-radius:50%}.rcsm-t{display:flex;align-items:center;justify-content:space-between;background:#f3f4f6;padding:14px;border-radius:10px;margin-top:14px}.rcsm-s{position:relative;width:44px;height:24px;border-radius:999px;border:0;background:#d1d5db;cursor:pointer}.rcsm-s[aria-checked=true]{background:ACC}.rcsm-s span{position:absolute;top:4px;left:4px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .2s}.rcsm-s[aria-checked=true] span{left:24px}.rcsm-c{border-top:1px solid #e5e7eb;margin-top:16px;padding-top:12px;text-align:center;font-size:13px;color:#6b7280}.rcsm-c a{color:ACC;font-weight:600}";
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }

  function mount() {
    var st = document.createElement("style"); st.textContent = css.split("ACC").join(accent); document.head.appendChild(st);
    var avatar = c.avatar || "/rc-avatar.webp";
    var name = (pt && c.titlePt) || c.title || document.title;
    var title = T.pre + " - " + (c.emoji ? c.emoji + " " : "") + name + (c.stack ? " - " + c.stack : "");
    var fab = document.createElement("button");
    fab.type = "button"; fab.className = "rcsm-fab"; fab.setAttribute("aria-label", T.open); fab.setAttribute("aria-haspopup", "dialog");
    fab.innerHTML = '<img src="' + esc(avatar) + '" alt="">';
    var bg = document.createElement("div"); bg.className = "rcsm-bg"; bg.hidden = true;
    var credits = c.designUrl || c.designAuthor
      ? '<div class="rcsm-c">' + (c.designAuthor ? T.credits + ' <a href="' + esc(c.designAuthorUrl || c.designUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(c.designAuthor) + "</a>" : "") + (c.designUrl ? '<div style="margin-top:4px"><a href="' + esc(c.designUrl) + '" target="_blank" rel="noopener noreferrer">' + T.original + "</a></div>" : "") + "</div>"
      : "";
    bg.innerHTML = '<div class="rcsm" role="dialog" aria-modal="true" aria-labelledby="rcsm-title" tabindex="-1"><button type="button" class="rcsm-x" aria-label="' + T.close + '">\u00d7</button><h2 id="rcsm-title">' + esc(title) + '</h2><div class="rcsm-w">' + T.welcome + '</div><div class="rcsm-d">' + T.desc + '</div><a class="rcsm-b rcsm-p" href="' + PORTFOLIO + '" target="_blank" rel="noopener noreferrer"><img src="' + esc(avatar) + '" alt="">' + T.portfolio + '</a><a class="rcsm-b rcsm-l" href="' + LINKEDIN + '" target="_blank" rel="noopener noreferrer">in&nbsp;' + T.linkedin + '</a><div class="rcsm-t"><span id="rcsm-al">' + T.analytics + '</span><button type="button" class="rcsm-s" role="switch" aria-labelledby="rcsm-al" aria-checked="' + state.analyticsEnabled + '"><span></span></button></div>' + credits + "</div>";
    document.body.appendChild(fab); document.body.appendChild(bg);
    var dlg = bg.firstChild, sw = bg.querySelector(".rcsm-s"), last = null;
    function open() { last = document.activeElement; bg.hidden = false; dlg.focus(); }
    function close() { bg.hidden = true; state.hasSeenModal = true; save(); (last && last.focus ? last : fab).focus(); }
    fab.onclick = open;
    bg.querySelector(".rcsm-x").onclick = close;
    bg.addEventListener("click", function (e) { if (e.target === bg) close(); });
    document.addEventListener("keydown", function (e) {
      if (bg.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        var f = dlg.querySelectorAll("button,a[href]"), a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
    sw.onclick = function () {
      state.analyticsEnabled = !state.analyticsEnabled; save();
      sw.setAttribute("aria-checked", String(state.analyticsEnabled));
      applyConsent(state.analyticsEnabled);
    };
    window.rcStudyModal.open = open;
    if (!state.hasSeenModal) setTimeout(open, 1000);
    if (!state.analyticsEnabled) applyConsent(false);
  }
  window.rcStudyModal = { open: function () {}, isAnalyticsEnabled: function () { return state.analyticsEnabled; } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
