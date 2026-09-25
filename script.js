const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

document.querySelector('[data-year]').textContent = new Date().getFullYear();

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Revise os campos destacados para continuar.';
    return;
  }
  status.textContent = 'Mensagem validada. A integração de envio será conectada ao canal de atendimento existente.';
});
