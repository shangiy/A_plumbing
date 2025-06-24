window.onload = function() {
  // ---------- Desktop Search ----------
const searchIcon = document.getElementById("searchIcon");
const searchBoxContainer = document.getElementById("searchBoxContainer");
const searchInput = document.getElementById("searchInput");
const submitSearch = document.getElementById("submitSearch");

if (searchIcon && searchBoxContainer) {
  searchIcon.addEventListener("click", () => {
    searchBoxContainer.style.display = "flex";
    searchIcon.style.display = "none";
    searchInput.focus();
  });
}

if (submitSearch) {
  submitSearch.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) alert("Searching for: " + query);
  });
}

if (searchInput) {
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") submitSearch.click();
  });
}

// ---------- Mobile Search ----------
const searchIconMobile = document.getElementById("searchIconMobile");
const mobileSearchBox = document.getElementById("mobileSearchBoxContainer");
const mobileSearchInput = document.getElementById("mobileSearchInput");
const mobileSubmitSearch = document.getElementById("mobileSubmitSearch");

if (searchIconMobile && mobileSearchBox) {
  searchIconMobile.addEventListener("click", () => {
    mobileSearchBox.classList.add("mobile-active");
    searchIconMobile.classList.add("hidden");
    mobileSearchInput.focus();
  });
}

if (mobileSubmitSearch) {
  mobileSubmitSearch.addEventListener("click", () => {
    const query = mobileSearchInput.value.trim();
    if (query) alert("Mobile search: " + query);
  });
}

if (mobileSearchInput) {
  mobileSearchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") mobileSubmitSearch.click();
  });
}

// ---------- Mobile Menu Toggle ----------
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}


// ---------- Cart Logic ----------
const cartIconTriggers = document.querySelectorAll(".cart-trigger");
const cartPanel = document.getElementById("cart-panel");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCountEls = document.querySelectorAll("#cart-count");
const clearCartButton = document.getElementById("clearCartButton");
const emptyCartMessage = document.createElement('div');
emptyCartMessage.id = 'empty-cart-message';
emptyCartMessage.style.display = 'none';
emptyCartMessage.style.textAlign = 'center';
emptyCartMessage.style.padding = '20px';
emptyCartMessage.innerHTML = `
  <p>Your cart is empty</p>
  <a href="${URLS.index}" class="btn" style="background-color: #0083b0; color: white;"> Continue Shopping</a>
`;
cartItemsContainer.parentNode.insertBefore(emptyCartMessage, cartItemsContainer.nextSibling);

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load and update cart on page load
document.addEventListener("DOMContentLoaded", updateCartUI);

// Open Cart
cartIconTriggers.forEach(icon => {
  icon.addEventListener("click", () => {
    cartPanel.classList.add("open");
  });
});

// Close Cart (X button)
closeCartBtn.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

// Update Cart UI
function updateCartUI() {
  // Clear existing items
  cartItemsContainer.innerHTML = "";
  
  // Calculate total and count
  let total = 0;
  let itemCount = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} - Ksh ${item.price.toLocaleString()}</span>
      <span class="remove-btn" data-index="${index}">&times;</span>
    `;
    cartItemsContainer.appendChild(div);
    total += parseFloat(item.price);
    itemCount++;
  });

  // Update totals
  cartTotal.textContent = total.toLocaleString();
  cartCountEls.forEach(el => el.textContent = itemCount);

  // Add remove listeners
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      saveCart();
      updateCartUI();
    });
  });

  // Show/hide empty message
  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    cartItemsContainer.style.display = "none";
  } else {
    emptyCartMessage.style.display = "none";
    cartItemsContainer.style.display = "block";
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Clear Cart Function
clearCartButton.addEventListener("click", function() {
  // Reset cart array
  cart = [];
  
  // Update localStorage
  saveCart();
  
  // Update UI
  updateCartUI();
  
  // Show confirmation
  alert("Confirm, you want to clear cart items!");
});

// Add to Cart Function
function addToCart(name, price) {
  // Check if item already exists in cart
  const existingItem = cart?.find(item => item.name === name);
  
  if (existingItem) {
    // If item exists, increase quantity instead of adding duplicate
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // Add new item with quantity 1
    cart.push({ 
      name: name, 
      price: price,
      quantity: 1
    });
  }
  // Save and update
  saveCart();
  updateCartUI();
}
// Add this to your existing cart logic section

// Close cart when clicking outside
document.addEventListener('click', function(event) {
  const isClickInsideCart = cartPanel.contains(event.target);
  const isClickOnCartTrigger = Array.from(cartIconTriggers).some(trigger => 
    trigger.contains(event.target)
  );
  
  if (!isClickInsideCart && !isClickOnCartTrigger && cartPanel.classList.contains('open')) {
    cartPanel.classList.remove('open');
  }
});
// Initialize product buttons - only once!
function initializeProductButtons() {
  document.querySelectorAll('.product-item button').forEach(button => {
    // Remove any existing click handlers first
    button.removeEventListener('click', handleAddToCart);
    // Add new click handler
    button.addEventListener('click', handleAddToCart);
  });
}

function handleAddToCart() {
  const product = this.closest('.product-item');
  const name = product.querySelector('h3').textContent;
  const priceText = product.querySelector('.price').textContent;
  const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
  
  addToCart(name, price);
}

// Initialize only once when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  updateCartUI();
  initializeProductButtons();
});


// ---------- Carousel Scroll ----------
const track = document.getElementById('carouselTrack');
const leftBtn = document.getElementById('carouselLeft');
const rightBtn = document.getElementById('carouselRight');
const carouselContainer = document.querySelector('.carousel');
let scrollAmount = 0;

leftBtn.addEventListener('click', () => {
  scrollAmount -= track.clientWidth / 2;
  track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  scrollAmount += track.clientWidth / 2;
  track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
});

carouselContainer.addEventListener('mouseenter', () => {
  track.style.animationPlayState = 'paused';
});

carouselContainer.addEventListener('mouseleave', () => {
  track.style.animationPlayState = 'running';
});

// ---------- Rest of your existing code ----------
// [Keep all other existing functions unchanged]
const products = [
  "5000 Litres Tank",
  "1000 Litres Tank",
  "LED Bulb 12W",
  "Ceiling Light Round",
  "Shower Mixer",
  "PVC Pipe 2 Inch",
  "Wall Socket 13A",
  "Extension Cable 4 Way",
  // Add more products
];

const desktopSearchInput = document.getElementById('searchInput');
const suggestionsPanel = document.getElementById('suggestions');

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
}

function highlightAndScrollToProduct(productName) {
  const id = 'product-' + slugify(productName);
  const productEl = document.getElementById(id);
  if (productEl) {
    productEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    productEl.classList.add('highlight');
    setTimeout(() => productEl.classList.remove('highlight'), 2000);
  }
}

desktopSearchInput.addEventListener('input', function () {
  const input = this.value.trim().toLowerCase();
  suggestionsPanel.innerHTML = '';
  suggestionsPanel.style.display = 'none';

  if (input.length === 0) return;

  const filtered = products.filter(product =>
    product.toLowerCase().includes(input)
  );

  if (filtered.length > 0) {
    filtered.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item;
      div.classList.add('suggestion-item');
      div.addEventListener('click', () => {
        desktopSearchInput.value = item;
        suggestionsPanel.innerHTML = '';
        suggestionsPanel.style.display = 'none';
        highlightAndScrollToProduct(item);
      });
      suggestionsPanel.appendChild(div);
    });
    suggestionsPanel.style.display = 'block';
  } else {
    const div = document.createElement('div');
    div.textContent = 'Not available now';
    div.style.color = 'red';
    suggestionsPanel.appendChild(div);
    suggestionsPanel.style.display = 'block';
  }
});

// Hide suggestions when clicking outside
document.addEventListener('click', function (e) {
  if (!document.querySelector('.search-container').contains(e.target)) {
    suggestionsPanel.style.display = 'none';
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const featureItems = document.querySelectorAll(".feature-item");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  featureItems.forEach(item => {
    observer.observe(item);
  });
});

// ---------- Scroll to Top with Progress Ring ----------
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById('scrollToTop');
  const progressCircle = document.querySelector('.progress-ring__circle');

  if (!scrollBtn || !progressCircle) return;

  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = `${circumference}`;

  function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    progressCircle.style.strokeDashoffset = offset;
  }

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setProgress(scrollPercent);

    if (scrollTop > 200) {
  scrollBtn.classList.add('show');
} else {
  scrollBtn.classList.remove('show');
}

  }

  window.addEventListener('scroll', updateProgress);

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  updateProgress(); // Initial load
  
});

document.getElementById("openCheckoutBtn").addEventListener("click", () => {
  document.getElementById("checkoutOverlay").style.display = "flex";
});
const openCheckoutBtn = document.getElementById("openCheckoutBtn");
if (openCheckoutBtn) {
  openCheckoutBtn.addEventListener("click", () => {
    document.getElementById("checkoutOverlay").style.display = "flex";
  });
}

// Save message on typing
document.getElementById('waMessage').addEventListener('input', () => {
  localStorage.setItem('waChatMessage', document.getElementById('waMessage').value);
});


// Load saved message
waBtn.addEventListener('click', () => {
  waPopup.style.display = 'block';
  const savedMessage = localStorage.getItem('waChatMessage');
  document.getElementById('waMessage').value = savedMessage || "Hello 👋, I'd like to ask about...";
});

document.addEventListener("DOMContentLoaded", function () {
  const circles = document.querySelectorAll(".circle-container");

document.getElementById("proceedToCheckout").addEventListener("click", () => {
  const totalText = document.getElementById("cart-total").textContent.trim(); // e.g. "62,650.00"
  const amount = totalText.replace(/,/g, ""); // remove commas: "62650.00"
  localStorage.setItem("checkoutAmount", amount);
  window.location.href = "/checkout";
});


  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom >= 0
    );
  }

  function animateCircles() {
    circles.forEach((container) => {
      if (container.classList.contains("animated")) return; // Avoid re-animating

      if (isInViewport(container)) {
        const percent = container.getAttribute("data-percent");
        const circle = container.querySelector(".progress-ring__circle");
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        // Trigger animation
        setTimeout(() => {
          circle.style.transition = "stroke-dashoffset 2s ease";
          circle.style.strokeDashoffset =
            circumference - (percent / 100) * circumference;
        }, 100);

        container.classList.add("animated");
      }
    });
  }

  

// Display Cart Items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCartMessage.style.display = 'block';
        return;
    }
    
    cartItemsContainer.style.display = 'block';
    emptyCartMessage.style.display = 'none';
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">Ksh ${item.price.toLocaleString()}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">Ksh ${(item.price * item.quantity).toLocaleString()}</div>
            <button class="remove-item" data-id="${item.id}">×</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    // Add event listeners for quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const isPlus = this.classList.contains('plus');
            updateCartItem(id, isPlus);
        });
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            removeCartItem(id);
        });
    });
}

// Update Cart Item Quantity
function updateCartItem(id, isPlus) {
    const item = cart.find(item => item.id === id);
    if (item) {
        if (isPlus) {
            item.quantity += 1;
        } else {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                cart = cart.filter(item => item.id !== id);
            }
        }
        updateCart();
        saveCart();
    }
}

// Remove Cart Item
function removeCartItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    saveCart();
}

// Update Cart Counter
function updateCartCounter() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Update Cart Total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total.toLocaleString();
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Clear Cart Function
document.getElementById('clearCartButton').addEventListener('click', function() {
    cart = [];
    updateCart();
    saveCart();
    alert('Your cart has been cleared successfully!');
});

// Initialize Cart on Page Load
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
    
    // Add to cart buttons
    document.querySelectorAll('.product-item button').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product-item');
            const name = product.querySelector('h3').textContent;
            const priceText = product.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
            const id = product.id;
            
            addToCart(name, price, id);
        });
    });
});
})

}
