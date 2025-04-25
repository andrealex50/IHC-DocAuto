/**
 * Initializes the page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    
    // Address elements
    const addressText = document.getElementById('address-text');
    const nifText = document.getElementById('nif-text');
    const phoneText = document.getElementById('phone-text');
    const editButton = document.getElementById('edit-button');
    const removeButton = document.getElementById('remove-button');
    
    // State
    let isEditing = false;
    
    // Initialize
    setupEventListeners();
    setupCart();
    loadAddressData();
    updateNotificationBadges();
    loadUserProfile();
    
    /**
     * Sets up event listeners
     */
    function setupEventListeners() {
        // Sidebar toggle
        sidebarToggle.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Address management
        editButton.addEventListener('click', toggleEditMode);
        removeButton.addEventListener('click', removeAddressData);
        
        window.addEventListener('resize', handleResize);
    }
    
    /**
     * Sets up cart functionality
     */
    function setupCart() {
        const cartIconContainer = document.getElementById('cart-icon-container');
        if (!cartIconContainer) return;

        const cartPopup = cartIconContainer.querySelector('.cart-popup');

        // Initial cart update
        updateCartPopup();

        // Mobile behavior
        function toggleCartPopup(event) {
            if (window.matchMedia("(max-width: 768px)").matches) {
                event.stopPropagation();
                cartPopup.classList.toggle('show');
            }
        }

        cartIconContainer.addEventListener('click', toggleCartPopup);

        // Close popup when clicking outside on mobile
        document.addEventListener('click', (event) => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                if (!cartIconContainer.contains(event.target)) {
                    cartPopup.classList.remove('show');
                }
            }
        });

        // Prevent popup from closing when clicking inside it
        cartPopup.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        // Close popup completely on resize
        window.addEventListener('resize', () => {
            cartPopup.classList.remove('show');
        });

        // Event delegation for cart buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('quantity-btn')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                const delta = parseInt(e.target.getAttribute('data-delta'));
                changeQuantity(index, delta);
            }
            
            if (e.target.classList.contains('remove-btn')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                removeFromCart(index);
            }
        });
    }

    /**
     * Toggles the sidebar
     */
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
        sidebarOverlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    }
    
    /**
     * Closes the sidebar
     */
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
        sidebarOverlay.style.display = 'none';
    }
    
    /**
     * Handles window resize events
     */
    function handleResize() {
        if (window.innerWidth > 992) {
            closeSidebar();
        }
    }
    
    /**
     * Loads address data from localStorage
     */
    function loadAddressData() {
        const savedAddress = localStorage.getItem('address');
        const savedNif = localStorage.getItem('nif');
        const savedPhone = localStorage.getItem('phone');
        
        addressText.textContent = savedAddress || 'Not specified';
        nifText.textContent = savedNif || 'Not specified';
        phoneText.textContent = savedPhone || 'Not specified';
    }
    
    /**
     * Toggles edit mode for address data
     */
    function toggleEditMode() {
        if (isEditing) {
            // Save changes
            const addressInput = addressText.querySelector('input');
            const nifInput = nifText.querySelector('input');
            const phoneInput = phoneText.querySelector('input');
            
            const newAddress = addressInput.value.trim();
            const newNif = nifInput.value.trim();
            const newPhone = phoneInput.value.trim();
            
            localStorage.setItem('address', newAddress);
            localStorage.setItem('nif', newNif);
            localStorage.setItem('phone', newPhone);
            
            // Update display
            addressText.innerHTML = newAddress || 'Not specified';
            nifText.innerHTML = newNif || 'Not specified';
            phoneText.innerHTML = newPhone || 'Not specified';
            
            editButton.textContent = 'Edit Address';
            removeButton.style.display = 'block';
        } else {
            // Enter edit mode
            const currentAddress = addressText.textContent;
            const currentNif = nifText.textContent;
            const currentPhone = phoneText.textContent;
            
            addressText.innerHTML = `<input type="text" value="${currentAddress !== 'Not specified' ? currentAddress : ''}">`;
            nifText.innerHTML = `<input type="text" value="${currentNif !== 'Not specified' ? currentNif : ''}">`;
            phoneText.innerHTML = `<input type="tel" value="${currentPhone !== 'Not specified' ? currentPhone : ''}">`;
            
            editButton.textContent = 'Save Changes';
            removeButton.style.display = 'none';
        }
        
        isEditing = !isEditing;
    }
    
    /**
     * Removes address data
     */
    function removeAddressData() {
        if (confirm('Are you sure you want to remove your address data?')) {
            localStorage.removeItem('address');
            localStorage.removeItem('nif');
            localStorage.removeItem('phone');
            loadAddressData();
            updateNotificationBadges();
        }
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

        // Wishlist badge
        const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        const wishlistBadge = document.querySelector('.notification-badge-wishlist');
        if (wishlistBadge) {
            wishlistBadge.textContent = wishlist.length;
            //wishlistBadge.style.display = wishlist.length > 0 ? 'inline-block' : 'none';
        }
    }

    /**
     * Updates the cart popup content and totals
     */
    function updateCartPopup() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
        // Update cart total in header
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) {
            cartTotalElement.textContent = `${cartTotal.toFixed(2)}€`;
        }
      
        // Update popup content
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
      
        // Update totals
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
            
            // Remove if quantity is 0 or less
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

// Event listeners for data updates
document.addEventListener('cartUpdated', updateNotificationBadges);
document.addEventListener('garageUpdated', updateNotificationBadges);
document.addEventListener('appointmentsUpdated', updateNotificationBadges);
document.addEventListener('wishlistUpdated', updateNotificationBadges);