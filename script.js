// Initialization after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      menu.classList.toggle("active");
    });

    // Close menu when clicking on a link
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        menu.classList.remove("active");
      });
    });

    // Toggle dropdown on mobile
    menu.querySelectorAll(".pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        if (window.innerWidth <= 600) {
          e.stopPropagation();
          pill.classList.toggle("active");
        }
      });
    });
  }

  // ===== CART =====
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    document.querySelectorAll("#cartCount").forEach(el => {
      el.textContent = cart.length;
    });
  }

  // normalize image path; handle different parameter orders
  window.addToCart = function (name, imageOrPrice, priceOrImage) {
    // Determine if second param is image or price
    let image = '';
    let price = 0;

    if (typeof imageOrPrice === 'string') {
      // Second param is image
      image = imageOrPrice;
      price = Number(priceOrImage) || 0;
    } else {
      // Second param is price
      price = Number(imageOrPrice) || 0;
      image = typeof priceOrImage === 'string' ? priceOrImage : '';
    }

    if (image && image.startsWith("../")) {
      image = image.replace("../", "");
    }

    cart.push({
      name,
      price,
      image: image || "Images/placeholder.png"
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast(name + " added to cart 🛒");
  };

  updateCartCount();


  //  SEARCH
  const searchInput = document.getElementById("searchInput");
  let _searchTimer = null;

  function doSearch() {
    if (!searchInput) return;
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
      const name = (card.dataset.name || "").toLowerCase();
      card.style.display = name.includes(value) ? "block" : "none";
    });
  }

  window.searchProducts = function () {
    clearTimeout(_searchTimer);
    _searchTimer = setTimeout(doSearch, 160);
  };


  //  SEARCH TOGGLE 
  window.toggleSearch = function () {
    if (!searchInput) return;
    searchInput.classList.toggle("active");
    searchInput.focus();
  };


  //  LOGIN 
  window.loginUser = function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("username");
    if (!nameInput || nameInput.value.trim() === "") {
      showToast("Enter name");
      return;
    }

    localStorage.setItem("user", nameInput.value.trim());
    window.location.href = "../index.html";
  };

  // lightweight non-blocking toast
  function showToast(message, timeout = 2200) {
    const t = document.createElement('div');
    t.className = 'ac-toast';
    t.textContent = message;
    Object.assign(t.style, {
      position: 'fixed',
      right: '18px',
      bottom: '18px',
      background: 'rgba(0,0,0,0.8)',
      color: '#fff',
      padding: '10px 14px',
      borderRadius: '10px',
      zIndex: 99999,
      fontSize: '14px',
      opacity: '0',
      transition: 'opacity 220ms ease'
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => t.style.opacity = '1');
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 260);
    }, timeout);
  }
  

});
