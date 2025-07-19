// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentSlide = 0;
let selectedDelivery = 'standard';
let currentProduct = null;
let modalQuantity = 1;
let selectedColor = null;

// For All Products load more
let currentAllProductsOffset = 0;
const ALL_PRODUCTS_LOAD_COUNT = 9;
let allProductsFilter = null;

  // Animate needle: gentle poking motion
  document.getElementById('needle-group').animate([
    { transform: 'rotate(-8deg)' },
    { transform: 'rotate(-18deg) translateY(12px)' },
    { transform: 'rotate(-8deg)' }
  ], {
    duration: 1200,
    iterations: Infinity
  });

  // Animate yarn balls: gentle bounce
  document.getElementById('yarn-left').animate([
    { transform: 'translateY(0)' },
    { transform: 'translateY(-7px)' },
    { transform: 'translateY(0)' }
  ], {
    duration: 1200,
    iterations: Infinity
  });
  document.getElementById('yarn-right').animate([
    { transform: 'translateY(0)' },
    { transform: 'translateY(-5px)' },
    { transform: 'translateY(0)' }
  ], {
    duration: 1100,
    iterations: Infinity
  });

  // Animate yarn tail: wiggle
  document.getElementById('yarn-tail').animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-8px)' },
    { transform: 'translateX(0)' }
  ], {
    duration: 1200,
    iterations: Infinity
  });
  document.getElementById('yarn-tail-right').animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(10px)' },
    { transform: 'translateX(0)' }
  ], {
    duration: 1200,
    iterations: Infinity
  });

  // Smooth closing animation (opacity + scale down)
  setTimeout(function () {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    preloader.style.transform = 'scale(0.95)';
    setTimeout(function () {
      preloader.style.display = 'none';
    }, 800); // matches transition duration
  }, 2000);


// Product data with enhanced details and categories
const productData = {
    'C001': {
        name: 'Rabbit With Heart Keychain',
        mrp: 289, // <--- Add this line for original MRP
        price: 249, // Offer price
        images: [
            'images/C001.webP',
            'images/C001.1.jpg',
        ],
        colors: ['pink', 'blue', 'white'],
        description: '',
        category: 'keychains'
    },
    'C002': {
        name: 'Strawberry Cow Keychain',
        mrp: 289,
        price: 249,
        images: [
            'images/C002.webp',
            'images/C002.2.jpg',
            'images/C002.1.webp',
        ],
        colors: ['pink', 'purple', 'yellow', 'white'],
        description: '',
        category: 'keychains'
    },
    'C003': {
        name: 'Miffy keychain',
        mrp:235,
        price: 199,
        images: [
            'images/C003.webp',
            'images/C003.1.jpg',
        ],
        colors: ['pink', 'blue', 'purple'],
        description: '',
        category: 'keychains'
    },
    // 'C004': {
    //     name: 'Cute Cat Plushie',
    //     price: 329,
    //     images: [
    //         'images/C004.webp',
    //         'images/C004.1.webp',
    //     ],
    //     colors: ['pink', 'white', 'blue', 'purple'],
    //     description: 'Soft and cuddly cat plushie made with premium materials. Perfect for hugging, decoration, or as a comfort companion.',
    //     category: 'cute-decor'
    // },
    'C005': {
        name: 'Cherry keychain',
        mrp: 155,
        price: 129,
        images: [
            'images/C005.webp',
            
        ],
        colors: ['yellow', 'pink', 'blue', 'green'],
        description: '',
        category: 'keychains'
    },
    'C006': {
        name: 'Rabbit lipbalm pouch (pink)',
        mrp: 213,
        price: 175,
        images: [
            'images/C006.webp',
            'images/C006.1.webp',
            'images/C006.2.webp',
            'images/C006.3.webp'
        ],
        colors: ['pink', 'blue', 'purple', 'green'],
        description: '',
        category: 'pouches'
    },
    'C007': {
        name: 'Mashroom lipbalm pouch (red)',
        mrp: 199,
        price: 159,
        images: [
            'images/C007.webp',
            'images/C007.1.webp'
        ],
        colors: ['white', 'pink'],
        description: 'Soft bunny plushie for cuddles and decor.',
        category: 'pouches'
    },
    'C008': {
        name: 'White flower clip',
        mrp: 199,
        price: 165,
        images: [
            'images/C008.webp'
        ],
        colors: ['pink', 'yellow'],
        description: '',
        category: 'accessories'
    },
    'C009': {
        name: ' Daisy Hair Clip (Small)',
        mrp: 65,
        price: 49,
        images: [
            'images/C009.webp',
            'images/C009.1.webp',
            'images/C009.2.webp'
        ],
        colors: ['blue', 'pink'],
        description: '',
        category: 'accessories'
    },
    'C010': {
        name: 'Daisy Hair Clip ',
        mrp: 179,
        price: 149,
        images: [
            'images/C010.webp',
            'images/C010.1.webp',
        ],
        colors: ['blue', 'pink'],
        description: '',
        category: 'accessories'
    },
    'C011': {
        name: 'Sunflower Hair Clip',
        mrp: 179,
        price: 149,
        images: [
            'images/C011.webp',
            'images/C011.1.webp',
            'images/C011.2.webp'
        ],
        colors: ['blue', 'pink'],
        description: '',
        category: 'accessories'
    },
    'C012': {
        name: 'Bow Hair Clip(small)',
        mrp:115,
        price: 95,
        images: [
            'images/C012.webp',
            'images/C012.1.webp'
        ],
        colors: ['blue', 'pink'],
        description: '',
        category: 'accessories'
    },
    // 'C013': {
    //     name: ' Hair Clip',
    //     price: 99,
    //     images: [
    //         'images/C013.webp'
    //     ],
    //     colors: ['blue', 'pink'],
    //     description: '',
    //     category: 'accessories'
    // },
    // 'C014': {
    //     name: ' Hair Clip',
    //     price: 99,
    //     images: [
    //         'images/C014.webp',
    //         'images/C014.1.webp',
    //         'images/C014.2.webp'
    //     ],
    //     colors: ['blue', 'pink'],
    //     description:  ' ',
    //     category: 'accessories'
    // },
    'C015': {
        name: ' Chochet Daisy Bag (Medium)',
        mrp: 499,
        price: 445,
        images: [
            'images/C015.webp',
            'images/C015.1.webp'
        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'pouches'
    },
    // 'C016': {
    //     name: ' Hair Clip',
    //     price: 99,
    //     images: [
    //         'images/C016.webp',
    //         'images/C016.1.webp',
    //         'images/C016.2.webp'
    //     ],
    //     colors: ['blue', 'pink'],
    //     description:  ' ',
    //     category: 'accessories'
    // },
    'C017': {
        name: ' Pink 2 hearts clip',
        mrp:70,
        price: 59,
        images: [
            'images/C017.webp',

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'accessories'
    },
    'C018': {
        name: ' Scrunchie ',
        mrp: 199,
        price: 169,
        images: [
            'images/C018.webp',
            'images/C018.1.webp',

        ],
        colors: ['blue', 'pink'],
        description:  'Custom Color available ',
        category: 'accessories'
    },
    'C019': {
        name: ' strawberry keychain with daisy',
        mrp: 169,
        price: 139,
        images: [
            'images/C019.jpg',
            'images/C019.1.jpg'

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'keychains'
    },
    'C020': {
        name: ' Bow keychain(Small)',
        mrp: 150,
        price: 99,
        images: [
            'images/C020.jpg',
            'images/C020.1.jpg',

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'keychains'
    },
    'C021': {
        name: ' Cherry Hair Clip (Small)',
        mrp: 155,
        price: 129,
        images: [
            'images/C021.webp'
            

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'accessories'
    },
    'C022': {
        name: ' Bow Hair Clip (Medium)',
        mrp: 175,
        price: 149,
        images: [
            'images/C022.jpg',
            

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'accessories'
    },
    'C023': {
        name: ' Bow Key Chain (Medium)',
        mrp: 175,
        price: 149,
        images: [
            'images/C023.jpg',
            

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'keychains'
    },
    'C024': {
        name: ' Tulip Key Chain ',
        mrp: 169,
        price: 149,
        images: [
            'images/C024.1.jpg',
            'images/C024.jpg',
            

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'keychains'
    },
    'C025': {
        name: ' Octopus Key Chain',
        mrp: 199,
        price: 179,
        images: [
            'images/C025.jpg',
            'images/C025.1.jpg',
            

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'keychains'
    },
    'C026': {
        name: ' Flower Claw Clip (Big)',
        mrp: 165,
        price: 145,
        images: [
            'images/C026.jpg',
            

        ],
        colors: ['blue', 'pink'],
        description:  ' Color customization available ',
        category: 'accessories'
    },
    'C027': {
        name: ' Flower Claw Clip (Small) ',
        mrp: 155,
        price: 129,
        images: [
            'images/C027.jpg',
            'images/C027.1.jpg',
            

        ],
        colors: ['blue', 'pink'],
        description:  ' Color customization available ',
        category: 'accessories'
    },
    'C028': {
        name: ' Penguin Keychain',
        mrp: 235,
        price: 199,
        images: [
            'images/C028.2.webp',
            'images/C028.jpg',
            'images/C028.1.jpg',
            
            

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'keychains'
    },
    'C029': {
        name: ' Kitty Small Plushie',
        mrp: 329,
        price: 289,
        images: [
            'images/C029.jpg',
            'images/C029.1.jpg',
            'images/C029.2.jpg',
            
            

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'keychains'
    },
    'C030': {
        name: ' Daisy Lip Balm Pouch',
        mrp: 189,
        price: 169,
        images: [
            'images/C030.jpg',
            'images/C030.1.jpg',
            
            

        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'pouches'
    },
    'C031': {
        name: ' Chick Keychain',
        mrp: 135,
        price: 199,
        images: [
            'images/C031.jpg',


        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'keychains'
    },
    'C032': {
        name: ' Bee Keychain',
        mrp: 213,
        price: 189,
        images: [
            'images/C032.jpg',
            
        ],
        colors: ['blue', 'pink'],
        description:  ' ',
        category: 'keychains'
    },
};

// DOM elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartFooter = document.getElementById('cartFooter');
const proceedToCartBtn = document.getElementById('proceedToCartBtn');
const mainContent = document.getElementById('mainContent');
const cartPage = document.getElementById('cartPage');
const cartPageItems = document.getElementById('cartPageItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const deliveryFee = document.getElementById('deliveryFee');
const cartPageTotal = document.getElementById('cartPageTotal');
const finalCheckoutBtn = document.getElementById('finalCheckoutBtn');
const cartInfoBar = document.getElementById('cartInfoBar');
const productModal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalMainImage = document.getElementById('modalMainImage');
const modalThumbnails = document.getElementById('modalThumbnails');
const modalProductName = document.getElementById('modalProductName');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalColorOptions = document.getElementById('modalColorOptions');
const modalQuantityElem = document.getElementById('modalQuantity');
const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

// --- Banner Slider Functionality ---
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.dot');

function initializeBanner() {
    setInterval(nextSlide, 5000);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                goToSlide(index);
            }
        });
    });
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}
function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}
function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// --- Improved Mobile Dropdown/Hamburger Menu Logic ---
function initializeNavigation() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            }
        });
    }
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
            document.querySelectorAll('.dropdown-icon').forEach(ic => ic.classList.remove('active'));
        });
    });

    document.querySelectorAll('.dropdown').forEach(drop => {
        const dropdownMenu = drop.querySelector('.dropdown-menu');
        const dropdownIcon = drop.querySelector('.dropdown-icon');

        // Only this arrow triggers dropdown open/close
        dropdownIcon.addEventListener('click', function (e) {
            e.stopPropagation(); // Stop from bubbling up
            const isOpen = dropdownMenu.classList.contains('open');

            // Close all others
            document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
            document.querySelectorAll('.dropdown-icon').forEach(ic => ic.classList.remove('active'));

            if (!isOpen) {
                dropdownMenu.classList.add('open');
                dropdownIcon.classList.add('active');
            }
        });

        // Close dropdown when any link inside is clicked
        dropdownMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                dropdownMenu.classList.remove('open');
                dropdownIcon.classList.remove('active');
            });
        });
    });


    document.addEventListener('click', function (e) {
        if (window.innerWidth < 900) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
                document.querySelectorAll('.dropdown-icon').forEach(ic => ic.classList.remove('active'));
            }
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 900) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
            document.querySelectorAll('.dropdown-icon').forEach(ic => ic.classList.remove('active'));
        }
    });

    // Add this function near the other navigation helpers
    function showMainContentAndScrollTo(selector) {
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('cartPage').style.display = 'none';
        document.getElementById('categoryPages').style.display = 'none';

        setTimeout(() => {
            const target = document.querySelector(selector);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 10);
    }

    // In initializeNavigation(), update the link handler:
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const selector = this.getAttribute('href');
            showMainContentAndScrollTo(selector);
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// --- Cart Functionality ---
function initializeCart() {
    if (cartBtn) cartBtn.addEventListener('click', openCartSidebar);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartSidebar);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);
    if (proceedToCartBtn) proceedToCartBtn.addEventListener('click', openCartPage);
    if (finalCheckoutBtn) finalCheckoutBtn.addEventListener('click', handleFinalCheckout);
    let backBtn = document.querySelector('.back-btn');
    if (backBtn) backBtn.addEventListener('click', goBackToHome);
}

function openCartSidebar() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    cartSidebar.focus();
}
function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
}
function openCartPage() {
    closeCartSidebar();
    hideMainContentAndSaveScroll();
    cartPage.style.display = 'block';
    updateCartPageDisplay();
    window.scrollTo(0, 0);
}

// --- Accessibility helpers ---
function trapFocus(modal) {
    const focusableSelectors = [
        'button:not([disabled])',
        '[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ];
    const focusableEls = modal.querySelectorAll(focusableSelectors.join(','));
    if (!focusableEls.length) return;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        }
    });
}
function setModalAccessibility(modal) {
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1');
}

// --- Product Card Event Delegation, Loader, and Accessibility ---

function productCardHtml(id, product) {
    // Check if MRP is present and different from offer price
    const priceHtml = product.mrp && product.mrp > product.price
        ? `<span class="mrp">₹${product.mrp}</span> <span class="offer-price">₹${product.price}</span>`
        : `<span class="offer-price">₹${product.price}</span>`;

    return `
    <div class="product-card" data-id="${id}" tabindex="0" aria-label="Open quick view for ${product.name}">
        <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
            <div class="product-overlay" data-action="quick-view" data-id="${id}" aria-label="Quick view ${product.name}">
                <span class="overlay-text"><i class="fas fa-eye"></i> Quick View</span>
            </div>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="price">${priceHtml}</p>
            <button class="add-to-cart-btn" data-action="add-to-cart" data-id="${id}" tabindex="0" aria-label="Add ${product.name} to cart">
                <i class="fas fa-shopping-cart"></i>
                Add to Cart
            </button>
        </div>
    </div>
    `;
}



function initializeProductGridDelegation() {
    document.body.addEventListener('click', function (e) {
        // Quick View
        if (e.target.closest('[data-action="quick-view"]')) {
            const btn = e.target.closest('[data-action="quick-view"]');
            const id = btn.getAttribute('data-id');
            openProductModal(id);
            return;
        }
        // Add to Cart from grid
        if (e.target.closest('[data-action="add-to-cart"]')) {
            const btn = e.target.closest('[data-action="add-to-cart"]');
            const id = btn.getAttribute('data-id');
            openProductModal(id, true);
            return;
        }
        // Category card
        if (e.target.closest('.category-card')) {
            const card = e.target.closest('.category-card');
            const cat = card.getAttribute('data-category');
            if (cat) openCategoryPage(cat);
            return;
        }
        // Price card
        if (e.target.closest('.price-card')) {
            const btn = e.target.closest('.price-card').querySelector('button');
            if (btn && btn.getAttribute('onclick')) {
                eval(btn.getAttribute('onclick'));
            }
        }
    });
    document.body.addEventListener('keydown', function (e) {
        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.classList.contains('product-card')) {
            const id = document.activeElement.getAttribute('data-id');
            openProductModal(id);
        }
    });
}

// --- Modal logic with accessibility & focus trap ---
function openProductModal(productId, directToCart = false) {
    currentProduct = productData[productId];
    if (!currentProduct) return;
    modalQuantity = 1;
    selectedColor = currentProduct.colors[0];
    populateProductModal();
    productModal.classList.add('open');
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setModalAccessibility(productModal);
    trapFocus(productModal);
    setTimeout(() => {
        productModal.focus();
    }, 10);

    // // If direct add-to-cart, add immediately and close
    // if (directToCart) {
    //     addToCartFromModal();
    //     closeProductModal();
    //     showMessage('Product added to cart!', 'success');
    // }
}

function closeProductModal() {
    productModal.classList.remove('open');
    modalOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
    currentProduct = null;
    selectedColor = null;
    modalQuantity = 1;
}
function populateProductModal() {
    if (!currentProduct) return;
    modalProductName.textContent = currentProduct.name;

    // Show MRP if exists and different from price, else just price
    if (currentProduct.mrp && currentProduct.mrp > currentProduct.price) {
        modalProductPrice.innerHTML = `
            <span class="mrp">₹${currentProduct.mrp}</span>
            <span class="offer-price">₹${currentProduct.price}</span>
        `;
    } else {
        modalProductPrice.innerHTML = `
            <span class="offer-price">₹${currentProduct.price}</span>
        `;
    }

    modalProductDescription.textContent = currentProduct.description;
    modalMainImage.src = currentProduct.images[0];
    modalMainImage.alt = currentProduct.name;
    modalQuantityElem.textContent = modalQuantity;

    // Thumbnails
    modalThumbnails.innerHTML = '';
    currentProduct.images.forEach((img, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumbnail${index === 0 ? ' active' : ''}`;
        thumb.tabIndex = 0;
        thumb.setAttribute('aria-label', `Show image ${index + 1}`);
        const imgtag = document.createElement('img');
        imgtag.src = img;
        imgtag.alt = currentProduct.name;
        thumb.appendChild(imgtag);
        thumb.addEventListener('click', () => changeMainImage(img, index));
        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                changeMainImage(img, index);
            }
        });
        modalThumbnails.appendChild(thumb);
    });

    // Color swatches
    modalColorOptions.innerHTML = '';
    currentProduct.colors.forEach((color) => {
        const swatch = document.createElement('div');
        swatch.className = `color-swatch ${color} ${color === selectedColor ? 'active' : ''}`;
        swatch.tabIndex = 0;
        swatch.setAttribute('aria-label', `Select color ${color}`);
        swatch.title = color;
        swatch.addEventListener('click', () => selectColor(color));
        swatch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') selectColor(color);
        });
        modalColorOptions.appendChild(swatch);
    });

    modalAddToCartBtn.onclick = () => addToCartFromModal();
    modalAddToCartBtn.tabIndex = 0;
    modalAddToCartBtn.setAttribute('aria-label', `Add ${currentProduct.name} to cart`);
}

function changeMainImage(imageSrc, index) {
    modalMainImage.src = imageSrc;
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}
function selectColor(color) {
    selectedColor = color;
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.classList.toggle('active', swatch.classList.contains(color));
    });
}
function changeModalQuantity(change) {
    modalQuantity = Math.max(1, modalQuantity + change);
    modalQuantityElem.textContent = modalQuantity;
}
function addToCartFromModal() {
    if (!currentProduct || !selectedColor) return;
    const productId = Object.keys(productData).find(key => productData[key] === currentProduct);
    addToCart(productId, currentProduct.name, currentProduct.price, currentProduct.images[0], selectedColor, modalQuantity);
    closeProductModal();
    showMessage('Product added to cart!', 'success');
}
function addToCart(id, name, price, image = 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=60', color = 'pink', quantity = 1) {
    const itemId = `${id}-${color}`;
    const existingItem = cart.find(item => item.id === itemId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: itemId,
            originalId: id,
            name: name,
            price: parseFloat(price),
            quantity: quantity,
            image: image,
            color: color
        });
    }
    updateCartDisplay();
    updateCartPageDisplay();
    saveCart();
    showAddToCartAnimation();
}
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
    updateCartPageDisplay();
    saveCart();
}
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartDisplay();
            updateCartPageDisplay();
            saveCart();
        }
    }
}
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p>Add some cute items to get started!</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-details">Color: ${item.color}</div>
                    <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                        <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        cartFooter.style.display = 'block';

        // ---- New logic for minimum cart value ----
        // Remove previous warning if exists
        let minValEl = document.getElementById('minCartValueWarn');
        if (minValEl) minValEl.remove();

        // Get the proceed button
        if (proceedToCartBtn) {
            if (totalPrice < 199) {
                proceedToCartBtn.disabled = true;
                proceedToCartBtn.classList.add("disabled-proceed");
                // Insert warning message above the button
                const warnEl = document.createElement("div");
                warnEl.id = "minCartValueWarn";
                warnEl.textContent = "Minimum cart value is Rs 199";
                warnEl.className = "min-cart-value-warn";
                // Insert before the button in cartFooter
                cartFooter.insertBefore(warnEl, proceedToCartBtn);
            } else {
                proceedToCartBtn.disabled = false;
                proceedToCartBtn.classList.remove("disabled-proceed");
                let prevWarn = document.getElementById('minCartValueWarn');
                if (prevWarn) prevWarn.remove();
            }
        }
    }
}
function updateCartPageDisplay() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = selectedDelivery === 'fast' ? 99 : 60;
    const total = subtotal + delivery;
    updateCartInfoBar(subtotal);
    if (cart.length === 0) {
        cartPageItems.innerHTML = `
            <div class="empty-cart-page">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any cute items yet!</p>
                <button class="continue-shopping-btn" onclick="goBackToHome()">
                    <i class="fas fa-arrow-left"></i>
                    Continue Shopping
                </button>
            </div>
        `;
    } else {
        cartPageItems.innerHTML = cart.map(item => `
            <div class="cart-page-item">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="cart-page-item-info">
                    <h3>${item.name}</h3>
                    <div class="cart-page-item-details">Color: ${item.color} | ID: ${item.originalId}</div>
                    <div class="cart-page-item-price">₹${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-page-quantity-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <button class="cart-page-remove-btn" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `).join('');
    }
    if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    if (deliveryFee) deliveryFee.textContent = `₹${delivery.toFixed(2)}`;
    if (cartPageTotal) cartPageTotal.textContent = `₹${total.toFixed(2)}`;
}
function initializeDeliveryOptions() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            selectedDelivery = e.target.value;
            updateCartPageDisplay();
        });
    });
}

// --- Insta Message with pop up message toast ---
function handleFinalCheckout() {
    if (cart.length === 0) {
        showMessage('Your cart is empty! Add some items first.', 'error');
        return;
    }
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = selectedDelivery === 'fast' ? 50 : 0;
    const total = subtotal + delivery;
    const itemsList = cart.map(item =>
        `${item.originalId}(${item.quantity})(${item.color})`
    ).join(', ');
    const deliveryText = selectedDelivery === 'fast' ? 'Fast (3–5 Days)' : 'Standard (5-10 Days)';
    const message = `HI Blushy Cheeks, I want to buy: [${itemsList}]\n\nDelivery: ${deliveryText}\nTotal: ₹${total.toFixed(2)}`;
    const encodedMessage = encodeURIComponent(message);

    // Your WhatsApp number in international format, without '+'
    const whatsappNumber = "918794387293";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    navigator.clipboard.writeText(message)
        .then(() => {
            showToast('📋Redirecting to WhatsApp ');
            setTimeout(() => {
                // Set flag to clear cart on return
                localStorage.setItem('clearCartOnReturn', 'yes');
                window.open(whatsappURL, '_blank');
            }, 3500);
        })
        .catch(() => {
            showToast('Clipboard permission denied. Please copy this message and send to us:\n\n' + message);
        });
}

document.getElementById("finalCheckoutBtn").addEventListener("click", handleFinalCheckout);

function showToast(message) {
    const toast = document.getElementById("copyToast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 4000);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function showAddToCartAnimation() {
    const cartIcon = cartBtn.querySelector('i');
    cartIcon.style.transform = 'scale(1.3)';
    cartIcon.style.color = '#ff6b6b';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
        cartIcon.style.color = 'white';
    }, 300);
}
function showMessage(text, type = 'success') {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);
    setTimeout(() => message.classList.add('show'), 100);
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => document.body.removeChild(message), 300);
    }, 3000);
}

// --- Search Functionality ---
// function initializeSearch() {
//     if (searchInput) {
//         searchInput.addEventListener('input', (e) => {
//             const query = e.target.value.toLowerCase();
//             filterProducts(query);
//         });
//     }
// }

// function initializeSearch() {...}
function filterProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productId = card.dataset.id.toLowerCase();
        if (productName.includes(query) || productId.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = query ? 'none' : 'block';
        }
    });
}

// --- Scroll Effects ---
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.product-card, .category-card, .price-card').forEach(el => {
        observer.observe(el);
    });
}

// --- Modal/Sidebar Keyboard/Escape handling ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closeCartSidebar();
    }
});
if (modalOverlay) {
    modalOverlay.addEventListener('click', closeProductModal);
}
if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
}
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        saveCart();
    }
});
window.addEventListener('beforeunload', () => {
    saveCart();
});

// --- Price Options with All Collection Card ---
function populatePriceOptions() {
    const priceOptions = document.querySelector('.price-options');
    if (!priceOptions) return;
    priceOptions.innerHTML = `
        <div class="price-card">
            <div class="price-icon"><i class="fas fa-coins"></i></div>
            <h3>Under ₹150</h3>
            <p>Budget-friendly finds</p>
            <button class="price-btn" onclick="filterAllProductsByPrice('under-150')">Shop Now</button>
        </div>
        <div class="price-card">
            <div class="price-icon"><i class="fas fa-money-bill-wave"></i></div>
            <h3>₹150 - ₹400</h3>
            <p>Perfect price range</p>
            <button class="price-btn" onclick="filterAllProductsByPrice('150-400')">Shop Now</button>
        </div>
        <div class="price-card">
            <div class="price-icon"><i class="fas fa-crown"></i></div>
            <h3>Above ₹400</h3>
            <p>Premium collection</p>
            <button class="price-btn" onclick="filterAllProductsByPrice('above-400')">Shop Now</button>
        </div>
        <div class="price-card">
            <div class="price-icon"><i class="fas fa-money-bill-wave"></i></div>
            <h3>Collection</h3>
            <p>watch out our all collection</p>
            <button class="btn" onclick="showAllCollection()">Show all</button>
        </div>
    `;
}

// --- All Products Load More Functionality ---
function showAllCollection(doScroll = true) {
    currentAllProductsOffset = 0;
    allProductsFilter = null;
    renderAllProductsWithViewMore();
    if (doScroll) {
        document.getElementById('all-products').scrollIntoView({ behavior: 'smooth' });
    }
}

function renderAllProductsWithViewMore() {
    const grid = document.getElementById('allProductsGrid');
    const viewMoreWrapper = document.getElementById('viewMoreWrapper');
    if (!grid || !viewMoreWrapper) return;
    let prods = Object.entries(productData);
    if (allProductsFilter) prods = prods.filter(([id, p]) => allProductsFilter(p));
    let shown = prods.slice(0, 9);
    let remaining = prods.slice(9);
    grid.innerHTML = shown.map(([id, p]) => productCardHtml(id, p)).join('');
    if (remaining.length > 0) {
        viewMoreWrapper.innerHTML = `<button class="view-more-btn" id="viewMoreBtn" onclick="viewMoreAllProducts()">View More Products</button>`;
    } else {
        viewMoreWrapper.innerHTML = '';
    }
}

function viewMoreAllProducts() {
    const grid = document.getElementById('allProductsGrid');
    const viewMoreWrapper = document.getElementById('viewMoreWrapper');
    if (!grid || !viewMoreWrapper) return;
    let prods = Object.entries(productData);
    if (allProductsFilter) prods = prods.filter(([id, p]) => allProductsFilter(p));
    grid.innerHTML = prods.map(([id, p]) => productCardHtml(id, p)).join('');
    viewMoreWrapper.innerHTML = '';
}

function filterAllProductsByPrice(range) {
    if (range === 'under-150') {
        allProductsFilter = p => p.price < 150;
    } else if (range === '150-400') {
        allProductsFilter = p => p.price >= 150 && p.price <= 400;
    } else if (range === 'above-400') {
        allProductsFilter = p => p.price > 400;
    } else {
        allProductsFilter = null;
    }
    renderAllProductsWithViewMore();
    document.getElementById('all-products').scrollIntoView({ behavior: 'smooth' });
}

// --- Category Page Single Nav & Cute Back Button ---
const categoryMap = {
    'bouquet': 'Bouquet',
    'keychains': 'Keychains',
    'pouches': 'Pouches & Bags',
    'book-mark': 'Book Mark',
    'phone-charm': 'Phone Charm',
    'accessories': 'Hair Accessories'
};

let lastScrollY = 0;
function goBackToHome() {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('categoryPages').style.display = 'none';
    window.scrollTo(0, lastScrollY || 0);
}
function hideMainContentAndSaveScroll() {
    lastScrollY = window.scrollY;
    document.getElementById('mainContent').style.display = 'none';
}

function openCategoryPage(categoryKey) {
    const catName = categoryMap[categoryKey];
    if (!catName) return;
    hideMainContentAndSaveScroll();
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('categoryPages').style.display = 'block';
    let html = `
    <div class="category-page-bg">
      <div class="container">
        <div class="category-page-header">
            <button class="cute-back-btn" onclick="goBackToHome()">
                <i class="fas fa-arrow-left"></i> Back to Home
            </button>
            <span class="category-page-title">${catName}</span>
        </div>
        <div class="products-grid" id="categoryProductsGrid">
            ${Object.entries(productData)
            .filter(([id, p]) => p.category === categoryKey)
            .map(([id, p]) => productCardHtml(id, p)).join('')
        }
        </div>
      </div>
    </div>
    `;
    document.getElementById('categoryPages').innerHTML = html;

    // Scroll to the top of the category page
    setTimeout(() => {
        document.getElementById('categoryPages').scrollIntoView({behavior: 'smooth', block: 'start'});
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, 10);
}

// --- Cart Info Bar with cute dark pink theme ---
// Updated: Always shows how much required for Free Gift and Free Shipping

function updateCartInfoBar(subtotal) {
    const bar = document.getElementById('cartInfoBar');
    if (!bar) return;
    const freeGiftAt = 499;
    const freeShippingAt = 799;
    const rsToGift = Math.max(0, freeGiftAt - subtotal);
    const rsToShipping = Math.max(0, freeShippingAt - subtotal);
    let progress = Math.min(subtotal / freeShippingAt, 1);
    let barWidth = Math.floor(progress * 100);

    let infoHtml = `
        <div class="cart-info-progress-bar">
            <div class="cart-info-progress" style="width:${barWidth}%;"></div>
        </div>
        <div class="cart-info-progress-labels">
            <span></span>
            <span>₹${subtotal.toFixed(2)}</span>
            <span>₹${freeShippingAt}</span>
        </div>
    `;

    // Always show how much required for both Free Gift and Free Shipping
    let giftText = rsToGift > 0
        ? `Add items worth <span class="highlight-text">₹${rsToGift.toFixed(2)}</span> for a <span class="free-link" onclick="filterAllProductsByPrice('150-400')">FREE Gift</span>`
        : `<span class="free-link">FREE Gift</span> Unlocked!`;

    let shippingText = rsToShipping > 0
        ? `Add items worth <span class="highlight-text">₹${rsToShipping.toFixed(2)}</span> for <span class="free-link" onclick="filterAllProductsByPrice('above-799')">FREE Delivery</span>`
        : `<span class="free-link">FREE Delivery</span> Unlocked!`;

    infoHtml += `<div>
        ${giftText} and ${shippingText}.
        <span class="view-products-link" onclick="document.getElementById('all-products').scrollIntoView({behavior:'smooth'});"></span>
    </div>`;

    bar.innerHTML = infoHtml;
}

// --- Populate New Arrivals (First 6 products) ---
function populateNewArrivals() {
    const grid = document.getElementById('newArrivalsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    Object.entries(productData).slice(0, 6).forEach(([id, product]) => {
        grid.innerHTML += productCardHtml(id, product);
    });
}

// --- DOMContentLoaded: INIT ALL ---
document.addEventListener('DOMContentLoaded', function () {
    initializeBanner();
    initializeNavigation();
    initializeCart();
    initializeDeliveryOptions();
    addScrollEffects();
    populateNewArrivals();
    populatePriceOptions();
    showAllCollection(false);
    updateCartDisplay();
    initializeProductGridDelegation();
});

// --- Expose global functions for inline HTML handlers ---
window.openCategoryPage = openCategoryPage;
window.filterAllProductsByPrice = filterAllProductsByPrice;
window.openProductModal = openProductModal;
window.changeMainImage = changeMainImage;
window.selectColor = selectColor;
window.changeModalQuantity = changeModalQuantity;
window.goBackToHome = goBackToHome;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.showAllCollection = showAllCollection;
window.viewMoreAllProducts = viewMoreAllProducts;



window.addEventListener('focus', function () {
    if (localStorage.getItem('clearCartOnReturn') === 'yes') {
        cart = [];
        updateCartDisplay();
        updateCartPageDisplay();
        saveCart();
        localStorage.removeItem('clearCartOnReturn');
        showToast('Your cart has been cleared. Thank you for shopping!');
    }
});