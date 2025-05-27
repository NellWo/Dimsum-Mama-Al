const menuItems = [
  {
    id: 1,
    name: "Siomay Ikan",
    price: 2000,
    desc: "Siomay isi ikan tenggiri",
    image: "img/siomay-ikan.jpg",
    category: "Dimsum",
  },
  {
    id: 2,
    name: "Dimsum Udang",
    price: 3000,
    desc: "Dimsum isi udang dan sayuran",
    image: "img/dimsum-udang.jpg",
    category: "Dimsum",
  },
  {
    id: 3,
    name: "Dimsum Jamur",
    price: 2000,
    desc: "Dimsum isi jamur dan sayuran",
    image: "img/dimsum-jamur.jpg",
    category: "Dimsum",
  },
  {
    id: 4,
    name: "Dimsum Sosis",
    price: 2000,
    desc: "Dimsum isi sosis ayam",
    image: "img/dimsum-sosis.jpg",
    category: "Dimsum",
  },
  {
    id: 5,
    name: "Bakpao Daging",
    price: 5000,
    desc: "Bakpao isi daging ayam",
    image: "img/bakpao.jpg",
    category: "Bakpao",
  },
  {
    id: 6,
    name: "Dimsum Original",
    price: 2000,
    desc: "Dimsum isi daging ayam dan sayuran",
    image: "img/dimsum-original.jpg",
    category: "Dimsum",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fungsi untuk mendapatkan tanggal dan waktu saat ini dalam format yang diinginkan
function getCurrentDateTime() {
  const now = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dayName = days[now.getDay()];
  const date = now.getDate();
  const month = now.toLocaleString("id-ID", { month: "long" });
  const year = now.getFullYear();
  const time = now.toLocaleTimeString("id-ID", { hour12: false });
  return `${dayName}, ${date} ${month} ${year} ${time}`;
}

// Inisialisasi Menu tanpa pengelompokan kategori
function initMenu() {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = "";

  menuItems.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";
    menuItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="menu-item-image" />
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <p>Rp ${item.price.toLocaleString()}</p>
          <button onclick="addToCart(${item.id})">Tambahkan</button>
      `;
    menuContainer.appendChild(menuItem);
  });
}

// Fungsi Keranjang
function addToCart(itemId) {
  const item = menuItems.find((i) => i.id === itemId);
  const existingItem = cart.find((i) => i.id === itemId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCartDisplay();
  localStorage.setItem("cart", JSON.stringify(cart));

  // Scroll ke bagian keranjang pesanan dengan animasi smooth
  const orderSection = document.querySelector(".order-section");
  if (orderSection) {
    orderSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Fungsi hapus item dari keranjang
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  updateCartDisplay();
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
  const orderSummary = document.getElementById("order-summary");
  const totalElement = document.getElementById("total");

  orderSummary.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const orderItem = document.createElement("div");
    orderItem.className = "order-item";
    orderItem.innerHTML = `
            <span>${item.name} (${item.quantity}x)</span>
            <span>Rp ${itemTotal.toLocaleString()}</span>
            <button class="remove-btn" onclick="removeFromCart(${
              item.id
            })">Hapus</button>
        `;
    orderSummary.appendChild(orderItem);
  });

  totalElement.textContent = total.toLocaleString();
}

function showOrderSummary() {
  if (cart.length === 0) {
    alert(
      "Keranjang pesanan harus ada isinya sebelum menyelesaikan pemesanan."
    );
    return;
  }

  // Save cart data to localStorage for the new page
  localStorage.setItem("finalOrderData", JSON.stringify(cart));

  // Tambahkan tanggal dan waktu saat ini ke localStorage
  localStorage.setItem("orderDateTime", getCurrentDateTime());

  // Redirect to the new order summary page
  window.location.href = "order-summary.html";

  // Jangan reset cart dan hapus data sebelum redirect
}

// Reset keranjang saat halaman utama dimuat
window.addEventListener("load", () => {
  cart = [];
  localStorage.removeItem("cart");
  updateCartDisplay();
});

// Inisialisasi
initMenu();
updateCartDisplay();
