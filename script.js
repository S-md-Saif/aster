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

  //  FIX: normalize image path here
  window.addToCart = function (name, price, image) {
    let fixedImage = image;

    // if image starts with ../Images/, fix it
    if (image && image.startsWith("../")) {
      fixedImage = image.replace("../", "");
    }

    cart.push({
      name,
      price,
      image: fixedImage || "Images/placeholder.png"
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


  //  SHOW USER NAME 
  const user = localStorage.getItem("user");
  const userArea = document.getElementById("user-area");

  if (user && userArea) {
    userArea.textContent = "Hi, " + user;
    userArea.style.fontWeight = "bold";
  }

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
