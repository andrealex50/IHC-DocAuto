/**
 * Initializes the page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Main elements
    const elements = {
        wishlistContainer: document.getElementById('wishlist-container'),
        emptyWishlist: document.getElementById('empty-wishlist'),
        browseProductsBtn: document.getElementById('browse-products-btn'),
        sidebar: document.querySelector('.sidebar'),
        sidebarToggle: document.querySelector('.sidebar-toggle'),
        sidebarOverlay: document.querySelector('.sidebar-overlay'),
        searchBtn: document.querySelector('.search-btn'),
        searchInput: document.querySelector('.search-input'),
        typeFilter: document.getElementById('type')
    };

    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize
    setupCart();
    updateCartPopup();
    initEventListeners();
    loadWishlist();
    updateNotificationBadges();
    setupResponsiveLayout();
    loadUserProfile();

    // Listen for wishlist updates
    document.addEventListener('wishlistUpdated', loadWishlist);

    /**
     * Sets up cart functionality
     */
    function setupCart() {
        const cartIconContainer = document.getElementById('cart-icon-container');
        if (!cartIconContainer) return;

        const cartPopup = cartIconContainer.querySelector('.cart-popup');
        
        // Atualização inicial
        updateCartPopup();

        // Comportamento mobile
        function toggleCartPopup(event) {
            if (window.matchMedia("(max-width: 768px)").matches) {
                event.stopPropagation();
                cartPopup.classList.toggle('show');
            }
        }

        cartIconContainer.addEventListener('click', toggleCartPopup);

        // Fechar popup ao clicar fora (mobile)
        document.addEventListener('click', (event) => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                if (!cartIconContainer.contains(event.target)) {
                    cartPopup.classList.remove('show');
                }
            }
        });

        // Prevenir fechar ao clicar dentro
        cartPopup.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        // Resetar popup no resize
        window.addEventListener('resize', () => {
            cartPopup.classList.remove('show');
        });
    }

    

    /**
     * Initializes event listeners
     */
    function initEventListeners() {
        // Browse products button
        if (elements.browseProductsBtn) {
            elements.browseProductsBtn.addEventListener('click', () => {
                window.location.href = 'products.html';
            });
        }

        // Sidebar toggle
        if (elements.sidebarToggle) {
            elements.sidebarToggle.addEventListener('click', toggleSidebar);
            elements.sidebarOverlay.addEventListener('click', closeSidebar);
            
            const menuItems = document.querySelectorAll('.sidebar .menu-item');
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth <= 992) closeSidebar();
                });
            });
        }

        // Search functionality
        if (elements.searchBtn) {
            elements.searchBtn.addEventListener('click', searchWishlist);
        }
    }

    /**
     * Loads and displays wishlist items
     */
    function loadWishlist() {
        const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        
        if (wishlist.length > 0) {
            elements.wishlistContainer.style.display = 'grid';
            elements.emptyWishlist.style.display = 'none';
            
            elements.wishlistContainer.innerHTML = '';
            wishlist.forEach((item, index) => {
                const card = createWishlistItemCard(item, index);
                elements.wishlistContainer.appendChild(card);
            });
        } else {
            elements.wishlistContainer.style.display = 'none';
            elements.emptyWishlist.style.display = 'flex';
        }

        updateNotificationBadges();
    }

    /**
     * Creates a wishlist item card
     */
    function createWishlistItemCard(item, index) {
        const card = document.createElement('div');
        card.className = 'wishlist-card';
        card.innerHTML = `
            <div class="wishlist-header">
                <h3 class="wishlist-title">${item.name}</h3>
                <button class="wishlist-remove-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#e53935">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>
            <div class="wishlist-content">
                <img src="${item.image}" alt="${item.name}" class="wishlist-image">
                <div class="wishlist-details">
                    <div class="wishlist-info">
                        <div class="detail-item">
                            <span class="detail-label">Price</span>
                            <span class="detail-value price-value">${item.price} €</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Stock</span>
                            <span class="detail-value stock-value ${item.inStock ? '' : 'out-of-stock'}">
                                ${item.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>
                    <p class="wishlist-description">${item.description}</p>
                    <div class="wishlist-actions">
                        <button class="view-product-btn">View Product Details</button>
                        <button class="add-to-cart-btn" ${!item.inStock ? 'disabled' : ''}>Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        card.querySelector('.wishlist-remove-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromWishlist(index);
        });
        
        card.querySelector('.view-product-btn').addEventListener('click', () => {
            viewProductDetails(item.id);
        });
    
        card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            addToCart(item);
        });
        
        return card;
    }

    /**
     * Removes item from wishlist
     */
    function removeFromWishlist(index) {
        const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        wishlist.splice(index, 1);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
        document.dispatchEvent(new CustomEvent('wishlistUpdated'));
    }

    /**
     * Adds item to cart
     */
    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Check if product already in cart
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                ...product,
                quantity: 1
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        document.dispatchEvent(new CustomEvent('cartUpdated'));
        updateNotificationBadges();
        updateCartPopup();
    }

    /**
     * Redirects to product details page
     */
    function viewProductDetails(productId) {
        window.location.href = `product-details.html?id=${productId}`;
    }

    /**
     * Searches wishlist items
     */
    function searchWishlist() {
        const searchTerm = elements.searchInput.value.toLowerCase();
        const typeFilter = elements.typeFilter.value;
        
        const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        const filteredItems = wishlist.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                                 item.code.toLowerCase().includes(searchTerm);
            const matchesType = typeFilter === 'all' || item.type === typeFilter;
            return matchesSearch && matchesType;
        });
        
        // Display filtered items
        if (filteredItems.length > 0) {
            elements.wishlistContainer.innerHTML = '';
            filteredItems.forEach((item, index) => {
                const originalIndex = wishlist.findIndex(wItem => wItem.id === item.id);
                const card = createWishlistItemCard(item, originalIndex);
                elements.wishlistContainer.appendChild(card);
            });
            elements.wishlistContainer.style.display = 'grid';
            elements.emptyWishlist.style.display = 'none';
        } else {
            elements.wishlistContainer.style.display = 'none';
            elements.emptyWishlist.style.display = 'flex';
        }
    }

    /**
     * Toggles sidebar visibility
     */
    function toggleSidebar(e) {
        e.stopPropagation();
        elements.sidebar.classList.toggle('active');
        elements.sidebarToggle.classList.toggle('active');
        elements.sidebarOverlay.style.display = elements.sidebar.classList.contains('active') ? 'block' : 'none';
    }

    /**
     * Closes sidebar
     */
    function closeSidebar() {
        elements.sidebar.classList.remove('active');
        elements.sidebarToggle.classList.remove('active');
        elements.sidebarOverlay.style.display = 'none';
    }

    /**
     * Sets up responsive layout
     */
    function setupResponsiveLayout() {
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                closeSidebar();
            }
        });
    }

    /**
     * Updates all notification badges
     */
    function updateNotificationBadges() {
        // Cart badge
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartBadge = document.querySelector('.notification-badge-cart');
        if (cartBadge) {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartBadge.textContent = totalItems;
            //cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // Wishlist badge
        const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        const wishlistBadge = document.querySelector('.notification-badge-wishlist');
        if (wishlistBadge) {
            wishlistBadge.textContent = wishlist.length;
            //wishlistBadge.style.display = wishlist.length > 0 ? 'inline-block' : 'none';
        }

        // Appointments badge
        const appointments = JSON.parse(localStorage.getItem('calendarEvents')) || [];
        const appointBadge = document.querySelector('.notification-badge-appoint');
        if (appointBadge) {
            appointBadge.textContent = appointments.length;
            //appointBadge.style.display = appointments.length > 0 ? 'inline-block' : 'none';
        }

        // Garage badge
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        const garageBadge = document.querySelector('.notification-badge-garage');
        if (garageBadge) {
            garageBadge.textContent = vehicles.length;
            //garageBadge.style.display = vehicles.length > 0 ? 'inline-block' : 'none';
        }
    }

    /**
     * Updates the cart popup content and totals
     */
    function updateCartPopup() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Atualizar total no cabeçalho
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) {
            cartTotalElement.textContent = `${cartTotal.toFixed(2)}€`;
        }
        
        // Atualizar conteúdo do popup
        const cartPopupContent = document.getElementById('cartPopupContent');
        if (cartPopupContent) {
            if (cartItems.length === 0) {
                cartPopupContent.innerHTML = '<div class="empty-cart-message">Cart empty</div>';
            } else {
                cartPopupContent.innerHTML = cartItems.map((item, index) => `
                    <div class="cart-item">
                        <img src="${item.image || 'assets/default-part.png'}" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">${item.price.toFixed(2)}€</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn" data-index="${index}" data-delta="-1">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn" data-index="${index}" data-delta="1">+</button>
                            </div>
                        </div>
                        <button class="remove-btn" data-index="${index}">✖</button>
                    </div>
                `).join('');
            }
        }
        
        // Atualizar totais
        const totalPriceElement = document.querySelector('.total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `${cartTotal.toFixed(2)}€`;
        }
        
        // Configurar event listeners para os novos botões
        setupCartEventListeners();
    }

    function setupCartEventListeners() {
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const delta = parseInt(this.getAttribute('data-delta'));
                changeQuantity(index, delta);
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }


    /**
     * Changes the quantity of a cart item
     */
    function changeQuantity(index, delta) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems[index]) {
            cartItems[index].quantity += delta;
            
            // Remove se quantidade for 0 ou menos
            if (cartItems[index].quantity <= 0) {
                cartItems.splice(index, 1);
            }
            
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartPopup();
            updateNotificationBadges();
        }
    }

    /**
     * Removes an item from the cart
     */
    function removeFromCart(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems[index]) {
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartPopup();
            updateNotificationBadges();
        }
    }

    /**
     * Loads user profile data
     */
    function loadUserProfile() {
        const authText = document.getElementById('auth-text');
        const authIcon = document.getElementById('header-profile-img');
        const authIconBig = document.getElementById('profile-avatar');
        const emailValue = document.getElementById('email-value');

        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (currentUser) {
            authText.textContent = currentUser.name || "user1234";
            emailValue.textContent = currentUser.email;
            authIcon.src = currentUser.avatar || "assets/profile.svg";
            authIconBig.src = currentUser.avatar || "assets/profile.svg";
            authIcon.alt = currentUser.name || "user1234";
        } else {
            authText.textContent = "Sign In";
            authIcon.src = "assets/profile.svg"; 
            authIcon.alt = "Sign In";
        }
    }
});

// Global function to add items to wishlist
function addToWishlist(product) {
    const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    
    // Check if product is already in wishlist
    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
        document.dispatchEvent(new CustomEvent('wishlistUpdated'));
    }
}

// Event listeners for data updates
document.addEventListener('cartUpdated', () => {
    updateNotificationBadges();
    updateCartPopup();
});
document.addEventListener('cartUpdated', updateNotificationBadges);
document.addEventListener('garageUpdated', updateNotificationBadges);
document.addEventListener('appointmentsUpdated', updateNotificationBadges);
document.addEventListener('wishlistUpdated', updateNotificationBadges);