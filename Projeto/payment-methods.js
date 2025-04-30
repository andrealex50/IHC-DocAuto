document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const addPaymentBtn = document.getElementById('add-payment-btn');
    const addCardForm = document.getElementById('add-card-form');
    const cancelAddCard = document.getElementById('cancel-add-card');
    const saveCardBtn = document.getElementById('save-card-btn');
    const savedCardsContainer = document.getElementById('saved-cards-container');
    
    // Initialize
    setupEventListeners();
    loadSavedCards();
    setupCart();
    updateNotificationBadges();
    loadUserProfile();
    
    function setupEventListeners() {
        // Sidebar toggle
        sidebarToggle.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Payment methods
        addPaymentBtn.addEventListener('click', showAddCardForm);
        cancelAddCard.addEventListener('click', hideAddCardForm);
        saveCardBtn.addEventListener('click', saveCard);
        
        window.addEventListener('resize', handleResize);
    }
    
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
        sidebarOverlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    }
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
        sidebarOverlay.style.display = 'none';
    }
    
    function handleResize() {
        if (window.innerWidth > 992) {
            closeSidebar();
        }
    }
    
    function showAddCardForm() {
        addCardForm.style.display = 'block';
        addPaymentBtn.style.display = 'none';
    }
    
    function hideAddCardForm() {
        addCardForm.style.display = 'none';
        addPaymentBtn.style.display = 'block';
        // Clear form
        document.getElementById('card-form').reset();
    }
    
    function loadSavedCards() {
        const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
        
        if (savedCards.length === 0) {
            savedCardsContainer.innerHTML = `
                <div class="empty-state">
                    <img src="assets/credit-card.svg" alt="No cards">
                    <h3>No saved payment methods</h3>
                    <p>Add a payment method to make checkout faster</p>
                </div>
            `;
            return;
        }
        
        savedCardsContainer.innerHTML = savedCards.map((card, index) => `
            <div class="payment-card ${card.isDefault ? 'default' : ''}">
                <div class="card-info">
                    <div class="card-icon">
                        ${getCardIcon(card.type)}
                    </div>
                    <div class="card-details">
                        <h3>${card.type} •••• ${card.last4}</h3>
                        <p>Expires ${card.expiry} ${card.isDefault ? '• Default payment method' : ''}</p>
                    </div>
                </div>
                <div class="card-actions">
                    ${card.isDefault ? '<span class="default-badge">Default</span>' : 
                      `<button class="secondary-btn set-default-btn" data-index="${index}">Set as Default</button>`}
                    <button class="secondary-btn remove-card-btn" data-index="${index}">Remove</button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to new buttons
        document.querySelectorAll('.set-default-btn').forEach(btn => {
            btn.addEventListener('click', setAsDefault);
        });
        
        document.querySelectorAll('.remove-card-btn').forEach(btn => {
            btn.addEventListener('click', removeCard);
        });
    }
    
    function getCardIcon(type) {
        const icons = {
            'visa': '<img src="assets/visa.svg" alt="Visa" style="height:24px">',
            'mastercard': '<img src="assets/mastercard.svg" alt="Mastercard" style="height:24px">',
            'amex': '<img src="assets/amex.svg" alt="American Express" style="height:24px">',
            'discover': '<img src="assets/discover.svg" alt="Discover" style="height:24px">'
        };
        return icons[type.toLowerCase()] || '<i class="far fa-credit-card"></i>';
    }
    
    function saveCard() {
        const cardName = document.getElementById('card-name').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim().replace(/\s/g, '');
        const cardExpiry = document.getElementById('card-expiry').value.trim();
        const cardCvv = document.getElementById('card-cvv').value.trim();
        const saveCardChecked = document.getElementById('save-card').checked;
        
        // Simple validation
        if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
            alert('Please fill in all card details');
            return;
        }
        
        if (!/^\d{16}$/.test(cardNumber)) {
            alert('Please enter a valid 16-digit card number');
            return;
        }
        
        // Determine card type
        const cardType = detectCardType(cardNumber);
        
        // Create card object
        const newCard = {
            id: Date.now().toString(),
            name: cardName,
            type: cardType,
            last4: cardNumber.slice(-4),
            expiry: cardExpiry,
            isDefault: saveCardChecked
        };

        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }
    
        
        // Save to localStorage
        let savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
        
        // If this is set as default, remove default from others
        if (saveCardChecked) {
            savedCards.forEach(card => card.isDefault = false);
        }
        
        savedCards.push(newCard);
        localStorage.setItem('savedCards', JSON.stringify(savedCards));
        
        // Clear form and refresh display
        document.getElementById('card-name').value = '';
        document.getElementById('card-number').value = '';
        document.getElementById('card-expiry').value = '';
        document.getElementById('card-cvv').value = '';
        document.getElementById('save-card').checked = false;
        
        // Immediately update the UI
        loadSavedCards();
        hideAddCardForm();
        
        // Show success message
        showToast('Card saved successfully!');
    }
    
    function detectCardType(number) {
        const visa = /^4/;
        const mastercard = /^5[1-5]/;
        const amex = /^3[47]/;
        const discover = /^6(?:011|5)/;
        
        if (visa.test(number)) return 'Visa';
        if (mastercard.test(number)) return 'Mastercard';
        if (amex.test(number)) return 'American Express';
        if (discover.test(number)) return 'Discover';
        return 'Credit Card';
    }
    
    function setAsDefault(e) {
        const index = parseInt(e.target.getAttribute('data-index'));
        let savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
        
        // Set all cards to not default
        savedCards.forEach(card => card.isDefault = false);
        
        // Set selected card as default
        savedCards[index].isDefault = true;
        
        localStorage.setItem('savedCards', JSON.stringify(savedCards));
        loadSavedCards();
    }
    
    function removeCard(e) {
        const index = parseInt(e.target.getAttribute('data-index'));
        let savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
        
        if (confirm('Are you sure you want to remove this payment method?')) {
            savedCards.splice(index, 1);
            localStorage.setItem('savedCards', JSON.stringify(savedCards));
            loadSavedCards();
        }
    }
    
    /* Existing functions from address.js */
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
    }

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

    function removeFromCart(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems[index]) {
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartPopup();
            updateNotificationBadges();
        }
    }

    function updateNotificationBadges() {
        // Cart badge
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartBadge = document.querySelector('.notification-badge-cart');
        if (cartBadge) {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartBadge.textContent = totalItems;
        }

        // Appointments badge
        const appointments = JSON.parse(localStorage.getItem('calendarEvents')) || [];
        const appointBadge = document.querySelector('.notification-badge-appoint');
        if (appointBadge) {
            appointBadge.textContent = appointments.length;
        }

        // Garage badge
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        const garageBadge = document.querySelector('.notification-badge-garage');
        if (garageBadge) {
            garageBadge.textContent = vehicles.length;
        }

        // Wishlist badge
        const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        const wishlistBadge = document.querySelector('.notification-badge-wishlist');
        if (wishlistBadge) {
            wishlistBadge.textContent = wishlist.length;
        }
    }

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