// ===== Catálogo de perfumes =====
// Perfumes reales de marcas reconocidas (para negocio de reventa). Ajusta precios a tus costos reales.
const PRODUCTS = [
  {
    name: "Sauvage",
    brand: "Dior",
    category: "amaderado",
    categoryLabel: "Amaderado",
    price: 100,
    oldPrice: 125,
    desc: "Bergamota fresca y pimienta de entrada, corazón especiado de lavanda y un fondo amaderado de cedro y ambroxan. El clásico masculino más vendido del mundo.",
    badge: "Más vendido"
  },
  {
    name: "Bleu de Chanel",
    brand: "Chanel",
    category: "amaderado",
    categoryLabel: "Amaderado",
    price: 115,
    desc: "Cítricos y menta en salida, jengibre y jazmín en el corazón, cerrando con sándalo, cedro e incienso. Elegante, versátil y atemporal.",
  },
  {
    name: "Light Blue",
    brand: "Dolce & Gabbana",
    category: "citrico",
    categoryLabel: "Cítrico",
    price: 75,
    oldPrice: 95,
    desc: "Manzana verde y campanilla frescas, corazón floral de jazmín y rosa blanca, base amaderada suave. Ideal para el día y el clima cálido.",
  },
  {
    name: "Acqua di Giò",
    brand: "Giorgio Armani",
    category: "citrico",
    categoryLabel: "Cítrico",
    price: 85,
    desc: "Notas marinas y cítricas de bergamota y limón, con jazmín y romero en el corazón, cerrando en almizcle y ámbar. Fresco y acuático.",
  },
  {
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    category: "oriental",
    categoryLabel: "Oriental",
    price: 105,
    oldPrice: 130,
    desc: "Café negro y pera en salida, jazmín y flor de azahar en el corazón, fondo de vainilla y pachulí. Adictivo, oriental y gourmand.",
    badge: "Favorito"
  },
  {
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    category: "oriental",
    categoryLabel: "Oriental",
    price: 325,
    desc: "Azafrán y jazmín sobre una base ambarada de cedro y almizcle blanco. Una fragancia de nicho, luminosa y muy reconocible.",
    badge: "Nicho de lujo"
  },
  {
    name: "La Vie Est Belle",
    brand: "Lancôme",
    category: "floral",
    categoryLabel: "Floral",
    price: 110,
    oldPrice: 140,
    desc: "Grosella negra y pera en salida, iris y jazmín en el corazón, fondo dulce de haba tonka, vainilla y praliné. Floral gourmand femenino.",
  },
  {
    name: "Good Girl",
    brand: "Carolina Herrera",
    category: "floral",
    categoryLabel: "Floral",
    price: 120,
    desc: "Almendra y café en salida, tuberosa y jazmín sambac en el corazón, cerrando en cacao, vainilla y sándalo. Intenso y sofisticado.",
  },
];

const WHATSAPP_NUMBER = "00000000000"; // Reemplaza con tu número real, ej: 573001234567

const BRANDS = [
  "Dior", "Chanel", "Giorgio Armani", "Yves Saint Laurent", "Carolina Herrera",
  "Lancôme", "Dolce & Gabbana", "Maison Francis Kurkdjian", "Versace", "Paco Rabanne"
];

const bottleSVG = `
<svg class="bottle" viewBox="0 0 120 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="45" y="0" width="30" height="18" rx="3" fill="#c9a227"/>
  <rect x="50" y="18" width="20" height="14" fill="#8a6d1a"/>
  <path d="M35 32 h50 a8 8 0 0 1 8 8 v150 a10 10 0 0 1 -10 10 h-46 a10 10 0 0 1 -10 -10 v-150 a8 8 0 0 1 8 -8 z"
        fill="#1e1e1e" stroke="#c9a227" stroke-width="2"/>
</svg>`;

function formatPrice(value) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
}

function discountPercent(price, oldPrice) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function renderProducts(filter = "todos") {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  const filtered = filter === "todos"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  filtered.forEach((product, i) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.animationDelay = `${i * 0.06}s`;

    const message = encodeURIComponent(`Hola, me interesa el perfume "${product.name}" de ${product.brand} (${formatPrice(product.price)}).`);

    const badges = [];
    if (product.oldPrice) {
      badges.push(`<span class="product-card__badge product-card__badge--discount">-${discountPercent(product.price, product.oldPrice)}%</span>`);
    }
    if (product.badge) {
      badges.push(`<span class="product-card__badge">${product.badge}</span>`);
    }

    card.innerHTML = `
      <div class="product-card__image">
        <div class="product-card__badges">${badges.join("")}</div>
        ${bottleSVG}
      </div>
      <div class="product-card__body">
        <span class="product-card__category">${product.categoryLabel}</span>
        <h3 class="product-card__name">${product.name}</h3>
        <span class="product-card__brand">${product.brand}</span>
        <p class="product-card__desc">${product.desc}</p>
        <div class="product-card__footer">
          <div class="product-card__price-wrap">
            ${product.oldPrice ? `<span class="product-card__price-old">${formatPrice(product.oldPrice)}</span>` : ""}
            <span class="product-card__price">${formatPrice(product.price)}</span>
          </div>
          <a class="product-card__buy" target="_blank" rel="noopener"
             href="https://wa.me/${WHATSAPP_NUMBER}?text=${message}">
             Comprar
          </a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function setActiveFilter(filter) {
  document.querySelectorAll(".filter-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.filter === filter);
  });
  renderProducts(filter);
}

// ===== Filtros de catálogo =====
document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  setActiveFilter(btn.dataset.filter);
});

// ===== Tarjetas de colección -> filtran el catálogo =====
document.querySelectorAll(".category-card[data-filter-target]").forEach(card => {
  card.addEventListener("click", () => {
    setActiveFilter(card.dataset.filterTarget);
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
  });
});

// ===== Marquee de marcas (loop infinito) =====
function buildMarquee() {
  const track = document.getElementById("marqueeTrack");
  const items = [...BRANDS, ...BRANDS].map(b => `<span class="marquee__item">${b}</span>`).join("");
  track.innerHTML = items;
}

// ===== Menú móvil =====
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  navToggle.classList.toggle("open");
});

document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.classList.remove("open");
  });
});

// ===== Header: fondo sólido al hacer scroll =====
const header = document.getElementById("header");
function onScrollHeader() {
  header.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", onScrollHeader, { passive: true });

// ===== Scroll reveal con IntersectionObserver =====
function initScrollReveal() {
  const targets = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  targets.forEach(t => observer.observe(t));
}

// ===== Contadores animados =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.countTo);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const isK = el.dataset.format === "k";
  const duration = 1400;
  const start = performance.now();

  function formatValue(v) {
    if (isK) {
      return v >= 1000 ? `${(v / 1000).toFixed(1).replace(/\.0$/, "")}K` : Math.round(v);
    }
    return Math.round(v);
  }

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${prefix}${formatValue(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ===== Newsletter (solo interfaz, sin backend) =====
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMsg = document.getElementById("newsletterMsg");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail").value.trim();
  if (!email) return;

  newsletterMsg.textContent = "¡Gracias! Te avisaremos por correo con tu código de -10%.";
  newsletterMsg.classList.add("show");
  newsletterForm.reset();

  setTimeout(() => newsletterMsg.classList.remove("show"), 5000);
});

// ===== Init =====
buildMarquee();
renderProducts();
initScrollReveal();
initCounters();
onScrollHeader();
