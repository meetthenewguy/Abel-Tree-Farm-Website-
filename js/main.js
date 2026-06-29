document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
let lastFocus = null;

function closeMenu(){
  if(!nav || !toggle) return;
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded','false');
}
function openMenu(){
  if(!nav || !toggle) return;
  lastFocus = document.activeElement;
  nav.classList.add('is-open');
  toggle.setAttribute('aria-expanded','true');
}
if(toggle){
  toggle.addEventListener('click', () => nav.classList.contains('is-open') ? closeMenu() : openMenu());
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape' && nav.classList.contains('is-open')){
      closeMenu();
      if(lastFocus) lastFocus.focus();
    }
  });
}

const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('#inventoryGrid .inventory-card');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-pressed','false'); });
  chip.classList.add('is-active');
  chip.setAttribute('aria-pressed','true');
  const filter = chip.dataset.filter;
  cards.forEach(card => {
    const show = filter === 'all' || card.dataset.cat.split(' ').includes(filter);
    card.hidden = !show;
  });
}));

const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  revealEls.forEach(el => io.observe(el));
}else{
  revealEls.forEach(el => el.classList.add('is-visible'));
}

const form = document.getElementById('quoteForm');
const errorBox = document.getElementById('formError');
const statusBox = document.getElementById('formStatus');
if(form){
  form.removeAttribute('action');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorBox.textContent = '';
    statusBox.textContent = '';
    statusBox.classList.remove('show');

    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    const email = form.elements.email.value.trim();
    if(!name){ errorBox.textContent = 'Please add your name.'; form.elements.name.focus(); return; }
    if(!phone && !email){ errorBox.textContent = 'Add a phone number or email so the farm can respond.'; form.elements.phone.focus(); return; }
    if(!form.checkValidity()){ form.reportValidity(); return; }

    const fields = [
      ['Name', name],
      ['Phone', phone],
      ['Email', email],
      ['Project city', form.elements.projectCity.value.trim()],
      ['Buyer type', form.elements.customerType.value.trim()],
      ['Material needed', form.elements.species.value.trim()],
      ['Quantity / size', form.elements.quantity.value.trim()],
      ['Project notes', form.elements.message.value.trim()]
    ].filter(([, value]) => value);

    const body = [
      'Abel Tree Farm website request',
      '',
      ...fields.map(([label, value]) => `${label}: ${value}`),
      '',
      'Please confirm current availability and next steps.'
    ].join('\n');

    const subject = `Abel Tree Farm request from ${name}`;
    const mailto = `mailto:abeltreefarm@aol.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    statusBox.textContent = 'Your email app should open with the request details. Please send the email from there, or call/text (561) 798-2087 if it does not open.';
    statusBox.classList.add('show');
  });
}

const year = document.getElementById('year');
if(year) year.textContent = new Date().getFullYear();

if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistration().then(registration => {
      if(registration) registration.unregister();
    }).catch(() => {});
  });
}
