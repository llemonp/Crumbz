const allPages = ['home','order','how','sweets','contact'];

const navIds = {
  order: 'nl-order',
  how: 'nl-how',
  sweets: 'nl-sweets',
  contact: 'nl-contact'
};

function goPage(page) {
  // hide all pages safely
  allPages.forEach(p => {
    const el = document.getElementById('pg-' + p);
    if (el) el.classList.remove('act');
  });

  // show selected page
  const target = document.getElementById('pg-' + page);
  if (target) target.classList.add('act');

  // update nav active state safely
  Object.values(navIds).forEach(id => {
    const nav = document.getElementById(id);
    if (nav) nav.classList.remove('act');
  });

  if (navIds[page]) {
    const nav = document.getElementById(navIds[page]);
    if (nav) nav.classList.add('act');
  }

  // logo visibility
  const logo = document.getElementById('clogo');
  if (logo) {
    if (page === 'home') logo.classList.remove('vis');
    else logo.classList.add('vis');
  }

  window.scrollTo(0, 0);
}

function showCat(cat, el) {
  document.querySelectorAll('.cat-list li').forEach(l => l.classList.remove('act'));
  el.classList.add('act');

  document.querySelectorAll('.prod').forEach(p => p.classList.remove('act'));

  const target = document.getElementById('cat-' + cat);
  if (target) target.classList.add('act');
}

let cart = [];

function addCart(name, price) {
  cart.push({ name, price });
  updateCart();
  openCart();
}

function updateCart() {
  const badge = document.getElementById('cbadge');
  const list = document.getElementById('cart-list');
  const total = document.getElementById('cart-total-val');

  if (!badge || !list || !total) return;

  badge.textContent = cart.length;
  badge.classList.toggle('show', cart.length > 0);

  if (cart.length === 0) {
    list.innerHTML = '<p class="cart-empty-msg">Your cart is empty.</p>';
  } else {
    list.innerHTML = cart.map((item, i) => `
      <div class="cart-i">
        <span>${item.name}</span>
        <span>$${item.price}</span>
        <button class="cart-rm" onclick="rmCart(${i})">×</button>
      </div>
    `).join('');
  }

  total.textContent = '$' + cart.reduce((s, i) => s + i.price, 0);
}

function rmCart(i) {
  cart.splice(i, 1);
  updateCart();
}

function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
}

function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
}

function checkout() {
  if (!cart.length) return;
  alert("Thank you for your order! 🎂");
  cart = [];
  updateCart();
  closeCart();
}

function sendMsg() {
  alert("Message sent! 🍰");
  document.querySelectorAll('#pg-contact input, #pg-contact textarea')
    .forEach(i => i.value = '');
}

// init
goPage('home');
updateCart();