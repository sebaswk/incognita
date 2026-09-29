const PHONE = "573226800756";
const UNIT_PRICE = 14000;

const qtyInput = document.getElementById("qty");
const totalEl = document.getElementById("total");
const buy = document.getElementById("buy");
const dockBuy = document.getElementById("dock-buy");
const minus = document.getElementById("qty-minus");
const plus = document.getElementById("qty-plus");

function formatCOP(value) {
  return `$${value.toLocaleString("es-CO")}`;
}

function getQty() {
  const qty = Math.min(20, Math.max(1, Number(qtyInput.value) || 1));
  qtyInput.value = String(qty);
  return qty;
}

function onionLabel() {
  const selected = document.querySelector('input[name="onion"]:checked');
  return selected?.value === "sin" ? "sin cebolla" : "con cebolla";
}

function buildMessage(qty) {
  const name = qty === 1 ? "Smash Brangus" : "Smash Brangus";
  return [
    `Hola, quiero pedir ${qty} ${name} (${onionLabel()}).`,
    `Total hamburguesas: ${formatCOP(qty * UNIT_PRICE)}.`,
    "El envío no está incluido.",
  ].join(" ");
}

function sync() {
  const qty = getQty();
  const total = formatCOP(qty * UNIT_PRICE);
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(buildMessage(qty))}`;

  totalEl.textContent = total;
  buy.href = href;
  dockBuy.href = href;
  dockBuy.textContent = `Pedir · ${total}`;
}

minus.addEventListener("click", () => {
  qtyInput.value = String(getQty() - 1);
  sync();
});

plus.addEventListener("click", () => {
  qtyInput.value = String(getQty() + 1);
  sync();
});

qtyInput.addEventListener("input", sync);
document.getElementById("order-form").addEventListener("change", sync);

sync();
