const allPages = ['home','order','how','sweets','contact'];
const navIds = {
  order:  'nl-order',
  how:    'nl-how',
  sweets: 'nl-sweets',
  contact:'nl-contact'
};

function goPage(page) {
  // hide all pages
  document.querySelectorAll('.pg').forEach(p => {
    p.classList.remove('act');
  });

  // show selected page
  const target = document.getElementById('pg-' + page);
  if (target) {
    target.classList.add('act');
  }
}

function goPage(id) {
  allPages.forEach(p => document.getElementById('pg-'+p).classList.remove('act'));
  document.getElementById('pg-'+id).classList.add('act');

  Object.values(navIds).forEach(n => document.getElementById(n).classList.remove('act'));
  if (navIds[id]) document.getElementById(navIds[id]).classList.add('act');

  const logo = document.getElementById('clogo');
  id === 'home' ? logo.classList.remove('vis') : logo.classList.add('vis');

  window.scrollTo(0, 0);
}

function showCat(cat, el) {
  document.querySelectorAll('.cat-list li').forEach(l => l.classList.remove('act'));
  el.classList.add('act');
  document.querySelectorAll('.prod').forEach(p => p.classList.remove('act'));
  document.getElementById('cat-'+cat).classList.add('act');
}

let cart = [];

function addCart(name, price) {
  cart.push({ name, price });
  updateCart();
  openCart();
}

function updateCart() {
  const badge = document.getElementById('cbadge');
  badge.textContent = cart.length;
  cart.length > 0 ? badge.classList.add('show') : badge.classList.remove('show');
  const list = document.getElementById('cart-list');
  if (cart.length === 0) {
    list.innerHTML = '<p class="cart-empty-msg">Your cart is empty.</p>';
  } else {
    list.innerHTML = cart.map((item, i) =>
      `<div class="cart-i">
        <span>${item.name}</span>
        <span>$${item.price}</span>
        <button class="cart-rm" onclick="rmCart(${i})">×</button>
      </div>`
    ).join('');
  }
  document.getElementById('cart-total-val').textContent = '$' + cart.reduce((s,i) => s+i.price, 0);
}

function rmCart(i) { cart.splice(i,1); updateCart(); }

function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

function checkout() {
  if (cart.length === 0) return;
  alert("Thank you for your order! We'll be in touch shortly. 🎂");
  cart = []; updateCart(); closeCart();
}

function sendMsg() {
  alert("Message sent! We'll get back to you soon. 🍰");
  document.querySelectorAll('#pg-contact input, #pg-contact textarea').forEach(i => i.value = '');
}

goPage('home');
updateCart();
