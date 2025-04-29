document.addEventListener("DOMContentLoaded", function() {
    // Initialize cart if it doesn't exist (using 'cartItems' to match parts page)
    if (!localStorage.getItem('cartItems')) {
        localStorage.setItem('cartItems', JSON.stringify([]));
    }

    // User authentication
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const authLink = document.getElementById('auth-link');
    const authText = document.getElementById('auth-text');
    const authIcon = document.getElementById('auth-icon-img');
    const logoBox = document.querySelector('.logo-box');

    if (currentUser) {
        authText.textContent = currentUser.name || "user1234";
        authLink.href = "personal.html";
        authIcon.src = currentUser.avatar || "assets/profile.svg";
        authIcon.alt = currentUser.name || "user1234";
    } else {
        authText.textContent = "Sign In";
        authLink.href = "login.html";
        authIcon.src = "assets/profile.svg"; 
        authIcon.alt = "Sign In";
    }

    logoBox.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'home.html';
    });

    // Initialize notification badges
    updateNotificationBadges();

    // Cart popup functionality
    const cartIconContainer = document.getElementById('cart-icon-container');
    const cartPopup = document.querySelector('.cart-popup');
    
    // Desktop hover behavior
    cartIconContainer.addEventListener('mouseenter', function() {
        if (window.innerWidth >= 769) {
            cartPopup.style.display = 'block';
        }
    });
    
    cartIconContainer.addEventListener('mouseleave', function() {
        if (window.innerWidth >= 769) {
            cartPopup.style.display = 'none';
        }
    });
    
    // Mobile click behavior
    cartIconContainer.addEventListener('click', function(e) {
        if (window.innerWidth < 769) {
            e.preventDefault();
            cartPopup.classList.toggle('show');
            
            if (cartPopup.classList.contains('show')) {
                const closePopup = function(e) {
                    if (!cartIconContainer.contains(e.target) && !cartPopup.contains(e.target)) {
                        cartPopup.classList.remove('show');
                        document.removeEventListener('click', closePopup);
                    }
                };
                setTimeout(() => document.addEventListener('click', closePopup), 10);
            }
        }
    });

    // Update cart display
    updateCartDisplay();

    // Event delegation for quantity and remove buttons
    document.addEventListener('click', function(e) {
        // Handle quantity buttons in main content
        if (e.target.closest('.quantity-btn')) {
            const btn = e.target.closest('.quantity-btn');
            const itemElement = btn.closest('.cart-item');
            if (!itemElement) return;
            
            const itemName = itemElement.querySelector('h2').textContent;
            const isPlus = btn.classList.contains('plus') || e.target.classList.contains('fa-plus');
            
            changeQuantityInCart(itemName, isPlus ? 1 : -1);
        }
        
        // Handle remove buttons in main content
        if (e.target.closest('.remove-btn')) {
            const itemElement = e.target.closest('.cart-item');
            if (!itemElement) return;
            
            const itemName = itemElement.querySelector('h2').textContent;
            removeFromCartByName(itemName);
        }

        // Handle quantity buttons in popup
        if (e.target.closest('.quantity-btn') && e.target.closest('.cart-popup-content .cart-item')) {
            const btn = e.target.closest('.quantity-btn');
            const itemElement = btn.closest('.cart-item');
            const itemName = itemElement.querySelector('.cart-item-title').textContent;
            const isPlus = btn.textContent === '+';
            
            changeQuantityInCart(itemName, isPlus ? 1 : -1);
        }
        
        // Handle remove buttons in popup
        if (e.target.classList.contains('remove-btn') && e.target.closest('.cart-popup-content .cart-item')) {
            const itemElement = e.target.closest('.cart-item');
            const itemName = itemElement.querySelector('.cart-item-title').textContent;
            
            removeFromCartByName(itemName);
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 769 && cartPopup) {
            cartPopup.style.display = 'none';
            cartPopup.classList.remove('show');
        }
    });
});

// Update cart display (both popup and main content)
function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Update cart badge and total in header
    const cartBadge = document.querySelector('.notification-badge-cart');
    const cartTotalElement = document.getElementById('cart-total');
    if (cartBadge) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems ? 'flex' : 'none';
    }
    if (cartTotalElement) {
        const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = cartTotal.toFixed(2) + '€';
    }
    
    // Update popup content
    updateCartPopup();
    
    // Update main cart content
    const mainCartItems = document.querySelector('.cart-items');
    if (mainCartItems) {
        if (cartItems.length === 0) {
            mainCartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            document.querySelector('.checkout-button1').style.display = 'none';
        } else {
            mainCartItems.innerHTML = cartItems.map(item => `
                <article class="cart-item">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <h2>${item.name}</h2>
                        <p class="item-description">${item.description || ''}</p>
                        <div class="item-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                            </div>
                            <button class="remove-btn"><i class="fas fa-trash-alt"></i> Remove</button>
                            </div>
                    </div>
                    <div class="item-price">
                        <span class="price">${(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                </article>
            `).join('');
            
            document.querySelector('.checkout-button1').style.display = 'block';
        }
    }
    
    // Update order summary
    updateOrderSummary(cartItems);
}

// Update cart popup
function updateCartPopup() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartPopupContent = document.getElementById('cartPopupContent');
  
    // Update popup content
    if (cartItems.length === 0) {
        cartPopupContent.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
    } else {
        cartPopupContent.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.image || 'assets/default-part.png'}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)}€</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn">+</button>
                    </div>
                </div>
                <button class="remove-btn">✖</button>
            </div>
        `).join('');
    }
  
    // Update totals in popup
    document.querySelector('.cart-popup .total-price').textContent = `${cartTotal.toFixed(2)}€`;
    document.querySelector('.delivery-price').textContent = cartItems.length > 0 ? '2.99€' : '0.00€';
}

// Update order summary
function updateOrderSummary(cartItems) {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 2.99 : 0;
    const total = subtotal + shipping;
    
    document.querySelector('.subtotal-price').textContent = subtotal.toFixed(2) + '€';
    document.querySelector('.shipping-price').textContent = shipping.toFixed(2) + '€';
    document.querySelector('.order-summary .total-price').textContent = total.toFixed(2) + '€';
    document.querySelector('.item-count').textContent = 
        cartItems.reduce((total, item) => total + item.quantity, 0) + 
        ' item' + (cartItems.reduce((total, item) => total + item.quantity, 0) !== 1 ? 's' : '');
}

// Cart manipulation functions
function changeQuantityInCart(itemName, delta) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += delta;
        
        // Remove if quantity is 0 or less
        if (cartItems[itemIndex].quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartDisplay();
    }
}

function removeFromCartByName(itemName) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.name !== itemName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

// Notification badges
function updateNotificationBadges() {
    // Garage
    const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
    const garageBadge = document.querySelector('.notification-badge-garage');
    if (garageBadge) {
        garageBadge.textContent = vehicles.length;
        garageBadge.style.display = vehicles.length > 0 ? 'flex' : 'none';
    }

    // Appointments
    const appointments = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    const appointBadge = document.querySelector('.notification-badge-appoint');
    if (appointBadge) {
        appointBadge.textContent = appointments.length;
        appointBadge.style.display = appointments.length > 0 ? 'flex' : 'none';
    }
}