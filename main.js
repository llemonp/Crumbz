// ===== PAGE NAVIGATION =====
const pages = {
  home: 'page-home',
  'order-online': 'page-order-online',
  'how-to-order': 'page-how-to-order',
  sweets: 'page-sweets',
  contact: 'page-contact',
};

// Nav link mappings
const navPageMap = {
  home: 'order-online',
  'how-to-order': 'how-to-order',
  sweets: 'sweets',
  contact: 'contact',
};

function showPage(pageKey) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show selected
  const target = document.getElementById(pages[pageKey]);
  if (target) target.classList.add('active');

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageKey || (pageKey === 'order-online' && link.dataset.page === 'home')) {
      link.classList.add('active');
    }
  });

  // Show/hide logo on non-home pages
  const logo = document.getElementById('logo-text');
  if (pageKey === 'home') {
    logo.classList.remove('visible');
  } else {
    logo.classList.add('visible');
  }

  window.scrollTo(0, 0);
}

// Nav link clicks
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    showPage(page === 'home' ? 'order-online' : page);
  });
});

// Get Started button
document.querySelector('.btn-get-started')?.addEventListener('click', () => {
  showPage('order-online');
});

// ===== SIDEBAR CATEGORY =====
document.querySelectorAll('.category-item').forEach(item => {
  item.addEventListener('click', () => {
    // Active state on sidebar
    document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Show matching product section
    const cat = item.dataset.category;
    document.querySelectorAll('.product-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById('cat-' + cat);
    if (section) section.classList.add('active');
  });
});

// ===== CART =====
let cart = [];

function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  countEl.textContent = cart.length;
  if (cart.length > 0) {
    countEl.classList.add('has-items');
  } else {
    countEl.classList.remove('has-items');
  }

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
  } else {
    itemsEl.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>$${item.price}</span>
        <button class="cart-item-remove" data-index="${i}" aria-label="Remove">×</button>
      </div>
    `).join('');

    // Remove buttons
    itemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        cart.splice(parseInt(btn.dataset.index), 1);
        updateCartUI();
      });
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalEl.textContent = '$' + total;
}

// Add to cart
document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    cart.push({ name: btn.dataset.name, price: parseInt(btn.dataset.price) });
    updateCartUI();
    openCart();
  });
});

function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

document.getElementById('cart-icon').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

// Checkout button
document.querySelector('.btn-checkout')?.addEventListener('click', () => {
  if (cart.length === 0) return;
  alert('Thank you for your order! We\'ll be in touch shortly. 🎂');
  cart = [];
  updateCartUI();
  closeCart();
});

// Send message button
document.querySelector('.btn-send')?.addEventListener('click', () => {
  const inputs = document.querySelectorAll('#page-contact input, #page-contact textarea');
  let hasContent = false;
  inputs.forEach(inp => { if (inp.value.trim()) hasContent = true; });
  if (!hasContent) {
    alert('Please fill in at least one field before sending.');
    return;
  }
  alert('Message sent! We\'ll get back to you soon. 🍰');
  inputs.forEach(inp => inp.value = '');
});

// ===== INIT =====
showPage('home');
updateCartUI();
