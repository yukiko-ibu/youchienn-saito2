const menu = document.querySelector('.menu');
const navigation = document.querySelector('#nav');
const mobile = window.matchMedia('(max-width: 760px)');

function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-collapsed', mobile.matches && !open);
}

function syncMenu() {
  menu.hidden = !mobile.matches;
  setMenu(false);
}

menu.addEventListener('click', () => {
  setMenu(menu.getAttribute('aria-expanded') !== 'true');
});
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !mobile.matches) return;
  setMenu(false);
  const section = document.querySelector(link.hash);
  section.setAttribute('tabindex', '-1');
  section.focus({ preventScroll: true });
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
mobile.addEventListener('change', syncMenu);
syncMenu();

const form = document.querySelector('#visit-form');
const checkButton = document.querySelector('#check-form');
const status = document.querySelector('#form-status');
const guardian = document.querySelector('#guardian');
const date = document.querySelector('#date');
const classroom = document.querySelector('#classroom');

function localDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function checkForm() {
  date.min = localDateString();
  guardian.setCustomValidity(guardian.value.trim() ? '' : 'お名前を入力してください。');
  if (!form.reportValidity()) return;

  const [year, month, day] = date.value.split('-').map(Number);
  status.hidden = false;
  status.textContent = `見学希望日：${year}年${month}月${day}日／希望クラス：${classroom.value}\n入力内容を確認しました。予約は送信されていません。`;
}

date.min = localDateString();
checkButton.disabled = false;
checkButton.addEventListener('click', checkForm);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  checkForm();
});
form.addEventListener('input', () => {
  guardian.setCustomValidity('');
  status.hidden = true;
  status.textContent = '';
});
