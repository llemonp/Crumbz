// ===== PAGE NAV =====
const allPages = ['home','order','how','sweets','contact','cart'];
const navIds = { order:'nl-order', how:'nl-how', sweets:'nl-sweets', contact:'nl-contact' };

function goPage(id) {
  allPages.forEach(p => document.getElementById('pg-'+p).classList.remove('act'));
  document.getElementById('pg-'+id).classList.add('act');
  Object.values(navIds).forEach(n => document.getElementById(n).classList.remove('act'));
  if (navIds[id]) document.getElementById(navIds[id]).classList.add('act');
  const logo = document.getElementById('clogo');
  id === 'home' ? logo.classList.remove('vis') : logo.classList.add('vis');
  if (id === 'cart') renderCart();
  window.scrollTo(0, 0);

}

window.goPage = goPage;

// ===== SIDEBAR CATEGORIES =====
function showCat(cat, el) {
  document.querySelectorAll('.cat-list li').forEach(l => l.classList.remove('act'));
  el.classList.add('act');
  document.querySelectorAll('.prod-section').forEach(s => s.classList.remove('act'));
  document.getElementById('ps-'+cat).classList.add('act');
  closeDetail();
}

// ===== PRODUCT DETAIL =====
const products = {
  custom6:  { title: '$30 Plain 6"',  price: 30, img: 'images/cake.jpg' },
  custom8:  { title: '$42 Plain 8"',  price: 42, img: 'images/cake2.jpg' },
  custom12: { title: '$50 Plain 12"', price: 50, img: 'images/cake3.jpg' },
};

let currentProduct = null;
let qty = 1;
let selections = { bc: '', fill: '', b1: '', b2: '' };

function openDetail(key) {
  currentProduct = key;
  qty = 1;
  selections = { bc: '', fill: '', b1: '', b2: '' };
  document.getElementById('qty-n').textContent = '1';
  document.getElementById('detail-price-title').textContent = products[key].title;
  ['sel-bc','sel-fill','sel-b1','sel-b2'].forEach(id => {
    const el = document.getElementById(id);
    el.textContent = 'Select';
    el.classList.remove('chosen');
  });
  const img = document.querySelector('.cake-bg img');
  if (img) img.src = products[key].img;
  clearAll(true);
  document.getElementById('grid-custom').style.display = 'none';
  document.getElementById('detail-view').classList.add('act');
}

function closeDetail() {
  document.getElementById('detail-view').classList.remove('act');
  document.getElementById('grid-custom').style.display = '';
  currentProduct = null;
}

function pick(field, value) {
  const ids = { bc:'sel-bc', fill:'sel-fill', b1:'sel-b1', b2:'sel-b2' };
  const btn = document.getElementById(ids[field]);
  btn.textContent = value;
  btn.classList.add('chosen');
  selections[field] = value;
}

function chgQty(d) {
  qty = Math.max(1, qty + d);
  document.getElementById('qty-n').textContent = qty;
}

// ===== CANVAS + DRAWING =====
let canvas, ctx, tool = 'pen', penColor = '#fff5f0', brushSize = 5;
let drawing = false, lastX = 0, lastY = 0;
let strokes = [];
let currentStroke = [];
let dragEmoji = null;

function initCanvas() {
  canvas = document.getElementById('draw-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', doDraw);
  canvas.addEventListener('mouseup', endDraw);
  canvas.addEventListener('mouseleave', endDraw);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', doDraw, { passive: false });
  canvas.addEventListener('touchend', endDraw);
}

function getPos(e) {
  const r = canvas.getBoundingClientRect();
  const src = e.touches ? e.touches[0] : e;
  return [src.clientX - r.left, src.clientY - r.top];
}

function startDraw(e) {
  e.preventDefault();
  drawing = true;
  const [x, y] = getPos(e);
  lastX = x; lastY = y;
  currentStroke = [{ x, y, color: penColor, size: brushSize, tool }];
}

function doDraw(e) {
  e.preventDefault();
  if (!drawing) return;
  const [x, y] = getPos(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  if (tool === 'erase') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = brushSize * 4;
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = penColor;
  }
  ctx.stroke();
  currentStroke.push({ x, y });
  lastX = x; lastY = y;
}

function endDraw() {
  if (!drawing) return;
  drawing = false;
  ctx.globalCompositeOperation = 'source-over';
  if (currentStroke.length > 0) {
    strokes.push({ type: 'stroke', data: [...currentStroke] });
  }
  currentStroke = [];
}

function redrawStrokes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const entry of strokes) {
    if (entry.type !== 'stroke') continue;
    const s = entry.data;
    if (s.length === 0) continue;
    const s0 = s[0];
    ctx.beginPath();
    ctx.moveTo(s0.x, s0.y);
    for (let i = 1; i < s.length; i++) ctx.lineTo(s[i].x, s[i].y);
    if (s0.tool === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = s0.size * 4;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = s0.size;
      ctx.strokeStyle = s0.color;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }
}

function setTool(t) {
  tool = t;
  document.getElementById('btn-pen').classList.toggle('act', t === 'pen');
  document.getElementById('btn-erase').classList.toggle('act', t === 'erase');
  canvas.style.cursor = t === 'erase' ? 'cell' : 'crosshair';
}

function setColor(c, el) {
  penColor = c;
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('sel'));
  el.classList.add('sel');
  if (tool === 'erase') setTool('pen');
}

function setBrush(val) {
  brushSize = parseInt(val);
  document.getElementById('brush-sz-out').textContent = val;
}

// ===== UNIFIED UNDO (strokes + decor) =====
function undoLast() {
  if (strokes.length === 0) { showToast('Nothing to undo'); return; }
  const last = strokes.pop();
  if (last.type === 'decor') {
    last.el.remove();
    showToast('Decor removed');
  } else {
    redrawStrokes();
    showToast('Stroke undone');
  }
}

function clearAll(silent) {
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes = [];
  const container = document.getElementById('canvas-container');
  if (container) {
    container.querySelectorAll('.dropped-decor').forEach(el => el.remove());
  }
  if (!silent) showToast('Canvas cleared');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1600);
}

// ===== DRAG & DROP DECOR =====
function initDecorDrag() {
  document.querySelectorAll('.decor-chip').forEach(chip => {
    chip.addEventListener('dragstart', e => {
      dragEmoji = chip.dataset.decor;
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text/plain', dragEmoji);
    });
  });

  const container = document.getElementById('canvas-container');
  if (!container) return;

  container.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });

  container.addEventListener('drop', e => {
    e.preventDefault();
    if (!dragEmoji) return;
    const r = container.getBoundingClientRect();
    placeDecor(dragEmoji, e.clientX - r.left, e.clientY - r.top);
    dragEmoji = null;
  });
}

function placeDecor(emoji, x, y) {
  const container = document.getElementById('canvas-container');
  const el = document.createElement('div');
  el.className = 'dropped-decor';
  el.textContent = emoji;
  el.style.left = x + 'px';
  el.style.top = y + 'px';

  let dragging = false, ox = 0, oy = 0;

  el.addEventListener('mousedown', ev => {
    ev.preventDefault();
    dragging = true;
    ox = ev.clientX - parseInt(el.style.left);
    oy = ev.clientY - parseInt(el.style.top);
    el.style.cursor = 'grabbing';
    el.style.zIndex = 20;
  });

  el.addEventListener('dblclick', () => {
    const idx = strokes.findIndex(s => s.type === 'decor' && s.el === el);
    if (idx !== -1) strokes.splice(idx, 1);
    el.remove();
    showToast('Decor removed');
  });

  document.addEventListener('mousemove', ev => {
    if (!dragging) return;
    const r = container.getBoundingClientRect();
    let nx = ev.clientX - ox;
    let ny = ev.clientY - oy;
    nx = Math.max(0, Math.min(nx, container.offsetWidth));
    ny = Math.max(0, Math.min(ny, container.offsetHeight));
    el.style.left = nx + 'px';
    el.style.top = ny + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (dragging) { dragging = false; el.style.cursor = 'grab'; el.style.zIndex = 10; }
  });

  container.appendChild(el);
  strokes.push({ type: 'decor', el });
}

// ===== CART =====
let cartItem = null;

function addToCart() {
  if (!currentProduct) return;
  const p = products[currentProduct];
  cartItem = {
    title: p.title,
    price: p.price * qty,
    qty,
    img: p.img,
    bc: selections.bc || '—',
    fill: selections.fill || '—',
    b1: selections.b1 || '—',
    b2: selections.b2 || '—',
  };
  updateBadge();
  closeDetail();
  goPage('cart');
}

function updateBadge() {
  const badge = document.getElementById('cbadge');
  if (cartItem) { badge.textContent = '1'; badge.classList.add('on'); }
  else badge.classList.remove('on');
}

function renderCart() {
  const content = document.getElementById('cart-content');
  const btn = document.getElementById('checkout-btn');
  if (!cartItem) {
    content.innerHTML = '<p class="cart-empty-msg">Cart is empty..</p>';
    btn.style.display = 'none';
    return;
  }
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  content.innerHTML = `
    <div class="receipt-card">
      <button class="receipt-minus" onclick="showDeleteConfirm()">—</button>
      <p class="receipt-date">${dateStr}</p>
      <p class="receipt-addr">3334 Midway Dr<br/>San Diego, CA 92100</p>
      <img src="${cartItem.img}" alt="${cartItem.title}" class="receipt-img" onerror="this.style.display='none';"/>
      <div class="receipt-line main"><span>Custom ${cartItem.title.replace(/^\$\d+\s/,'')}</span><span>USD${cartItem.price.toFixed(2)}</span></div>
      <div class="receipt-line"><span>Frosting</span><span>${cartItem.bc}</span></div>
      <div class="receipt-line"><span>Filling</span><span>${cartItem.fill}</span></div>
      <div class="receipt-line"><span>Base 1</span><span>${cartItem.b1}</span></div>
      <div class="receipt-line"><span>Base 2</span><span>${cartItem.b2}</span></div>
      <hr class="receipt-divider"/>
      <div class="receipt-total"><span>Total:</span><span>$${cartItem.price.toFixed(2)}</span></div>
    </div>`;
  btn.style.display = 'block';
}

function showDeleteConfirm() { document.getElementById('delete-overlay').classList.add('open'); }
function cancelDelete() { document.getElementById('delete-overlay').classList.remove('open'); }
function confirmDelete() {
  cartItem = null;
  updateBadge();
  document.getElementById('delete-overlay').classList.remove('open');
  renderCart();
}

function sendMsg() {
  const inputs = document.querySelectorAll('#pg-contact input, #pg-contact textarea');
  document.getElementById('sent-overlay').classList.add('open');
  inputs.forEach(i => i.value = '');
  const radios = document.querySelectorAll('#pg-contact input[type="radio"]');
  radios.forEach(r => r.checked = false);
}

function closeSent() {
  document.getElementById('sent-overlay').classList.remove('open');
}

// ===== INIT =====
goPage('home');
updateBadge();
window.addEventListener('load', () => {
  initCanvas();
  initDecorDrag();
});

window.goPage = goPage;
window.showCat = showCat;
window.addToCart = addToCart;
window.openDetail = openDetail;