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
  form.addEventListener('submit', async (event) => {
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

    const button = form.querySelector('button[type="submit"]');
    const original = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending...';
    try{
      const body = new URLSearchParams(new FormData(form)).toString();
      const response = await fetch(form.getAttribute('action') || '/', {
        method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body
      });
      if(!response.ok) throw new Error('Form server did not confirm the request.');
      statusBox.textContent = 'Request received. Abel Tree Farm will follow up with availability and next steps.';
      statusBox.classList.add('show');
      form.reset();
    }catch(err){
      errorBox.textContent = 'The form did not confirm. Please call or text (561) 798-2087 so the request is not missed.';
    }finally{
      button.disabled = false;
      button.textContent = original;
    }
  });
}

const year = document.getElementById('year');
if(year) year.textContent = new Date().getFullYear();
