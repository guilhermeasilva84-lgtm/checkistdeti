/* Toast, atalhos de teclado e inicialização (sem login: o app abre direto) */
function openApp() {
  const app = document.getElementById('app');
  app.style.display = 'grid';
  if (window.MotionFX) MotionFX.enterApp();
  requestAnimationFrame(() => app.classList.add('visible'));

  // Rascunho em andamento
  try {
    const raw = localStorage.getItem('checklist-draft');
    if (raw) {
      const draft = JSON.parse(raw);
      const d = new Date(draft.savedAt);
      const diffH = (Date.now() - d.getTime()) / 3600000;
      if (diffH < 24 && draft.loja) {
        const banner = document.getElementById('resumeBanner');
        const textEl = document.getElementById('resumeText');
        const time   = d.toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'});
        textEl.textContent = `Checklist em andamento: ${draft.loja} · ${time}`;
        banner.classList.add('show');
      }
    }
  } catch(e) {}
}

/* TOAST */
function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const P = (d) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const icons = {
    success: P('<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>'),
    error: P('<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>'),
    info: P('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')
  };
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span class="toast-text">${msg}</span>`;

  container.insertBefore(toast, container.firstChild);
  setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 3600);
}


const emailAttachmentInput = document.getElementById('emailAttachments');
if (emailAttachmentInput) {
  emailAttachmentInput.addEventListener('change', function(e) {
    handleEmailAttachmentSelection(e.target.files);
    e.target.value = '';
  });
}

const emailOpenBtn = document.getElementById('openEmailModalBtn');
if (emailOpenBtn) {
  emailOpenBtn.addEventListener('click', openEmailModal);
}
const emailSendBtn = document.getElementById('emailSendBtn');
if (emailSendBtn) {
  emailSendBtn.addEventListener('click', sendEmailReport);
}
const emailPreviewBtn = document.getElementById('emailPreviewBtn');
if (emailPreviewBtn) {
  emailPreviewBtn.addEventListener('click', previewEmailPdf);
}

/* BACKDROP CLICK TO CLOSE */
document.querySelectorAll('.modal-backdrop').forEach(el => {
  el.addEventListener('click', function(e) {
    if (e.target === this) closeModal(this.id);
  });
});

/* KEYBOARD */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (window.Palette && Palette.isOpen()) return; // a paleta trata o próprio Esc
    document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
    if (State.ui.searchOpen) toggleSearch();
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (window.Palette) Palette.toggle(); else toggleSearch();
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault(); doSave();
  }
});

/* BOOT */
(function boot() {
  // Set today's date
  const dateEl = document.getElementById('fData');
  if (dateEl) dateEl.value = new Date().toISOString().split('T')[0];


  // URL do fluxo é fixa (DEFAULT_URL) — não há mais override por dispositivo

  // Build UI
  if (window.SplashFX) SplashFX.step(24, 'Preparando o checklist…');
  restorePrintersDraft();
  buildUI();
  if (window.SplashFX) SplashFX.step(52, 'Carregando impressoras…');
  Promise.resolve(loadPrintersCatalog()).catch(function(){}).then(function(){
    if (window.SplashFX) SplashFX.step(76, 'Verificando sessão…');
  });

  function finishBoot() {
    if (window.SplashFX && !finishBoot._go) { finishBoot._go = true; SplashFX.done(finishBoot); return; }
    document.getElementById('splash').classList.add('hidden');
    openApp();
  }
  finishBoot();
})();
