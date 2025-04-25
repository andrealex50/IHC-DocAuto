/**
 * Initializes the page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    setupCart();
    setupAvatarUpload();
    setupSidebarToggle();
    updateNotificationBadges(); // Initialize all badges
});

/**
 * Sets up sidebar toggle functionality
 */
function setupSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const menuItems = document.querySelectorAll('.sidebar .menu-item');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            sidebarToggle.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarToggle.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
                sidebarToggle.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        });
    });
}

/**
 * Sets up cart functionality including popup and event listeners
 */
function setupCart() {
    const cartIconContainer = document.getElementById('cart-icon-container');
    if (!cartIconContainer) return;

    const cartPopup = cartIconContainer.querySelector('.cart-popup');
    const cartTotalElement = document.getElementById('cart-total');
    const cartPopupContent = document.getElementById('cartPopupContent');

    // Initial cart update
    updateCartPopup();

    // Mobile behavior for cart popup
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
            console.log('Quantity button clicked');
            const index = parseInt(e.target.getAttribute('data-index'));
            const delta = parseInt(e.target.getAttribute('data-delta'));
            changeQuantity(index, delta);
        }
        
        if (e.target.classList.contains('remove-btn')) {
            console.log('Remove button clicked');
            const index = parseInt(e.target.getAttribute('data-index'));
            removeFromCart(index);
        }
    });
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
    }
}

/**
 * Updates all notification badges in the sidebar and header
 */
function updateNotificationBadges() {
    // Cart badge
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartBadge = document.querySelector('.notification-badge-cart');
    if (cartBadge) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = totalItems;
    }

    // Wishlist badge
    const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const wishlistBadge = document.querySelector('.notification-badge-wishlist');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
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
}

/**
 * Sets up avatar upload functionality
 */
function setupAvatarUpload() {
    const avatarUpload = document.getElementById('avatar-upload');
    if (avatarUpload) {
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const avatarPreview = document.getElementById('profile-avatar-preview');
                    avatarPreview.src = event.target.result;
                    avatarUpload.dataset.preview = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

/**
 * Removes the avatar and resets to default
 */
function removeAvatar() {
    const defaultAvatar = 'assets/profile.svg';
    const avatarPreview = document.getElementById('profile-avatar-preview');
    const avatarUpload = document.getElementById('avatar-upload');

    avatarPreview.src = defaultAvatar;
    if (avatarUpload) {
        avatarUpload.dataset.preview = '';
    }
}

/**
 * Loads user data from session storage
 */
function loadUserData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const usernameValue = document.getElementById('username-value');
    const passwordValue = document.getElementById('password-value');
    const emailValue = document.getElementById('email-value');
    const phoneValue = document.getElementById('phone-value');
    const avatarPreview = document.getElementById('profile-avatar-preview');
    const headerProfileImg = document.getElementById('header-profile-img');
    const sidebarAvatar = document.getElementById('profile-avatar');

    if (currentUser) {
        document.querySelector('.user-name').textContent = currentUser.name;
        document.querySelector('.user-email').textContent = currentUser.email;

        const avatarSrc = currentUser.avatar || 'assets/profile.svg';
        avatarPreview.src = avatarSrc;
        if (headerProfileImg) headerProfileImg.src = avatarSrc;
        if (sidebarAvatar) sidebarAvatar.src = avatarSrc;

        usernameValue.textContent = currentUser.name;
        
        // Password display
        const passwordLength = currentUser.password ? currentUser.password.length : 8;
        passwordValue.textContent = '•'.repeat(passwordLength);

        emailValue.textContent = currentUser.email;
        phoneValue.textContent = currentUser.phone || 'Not provided';
    } else {
        window.location.href = 'login.html';
    }
}

/**
 * Toggles edit mode for personal data
 */
function editPersonalData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    // Show edit inputs and hide display values
    document.getElementById('username-edit').value = currentUser.name;
    document.getElementById('password-edit').value = currentUser.password;
    document.getElementById('email-edit').value = currentUser.email;
    document.getElementById('phone-edit').value = currentUser.phone || '';

    document.querySelectorAll('.edit-input').forEach(input => {
        input.style.display = 'block';
    });

    document.querySelectorAll('.data-field p').forEach(p => {
        p.style.display = 'none';
    });
    
    // Show avatar controls
    document.querySelector('.avatar-upload-controls').style.display = 'flex';
    
    // Toggle buttons
    document.getElementById('edit-btn').style.display = 'none';
    document.querySelector('.edit-controls').style.display = 'flex';
}

/**
 * Cancels edit mode and resets to display values
 */
function cancelEdit() {
    // Hide edit inputs and show display values
    document.querySelectorAll('.edit-input').forEach(input => {
        input.style.display = 'none';
    });
    
    document.querySelectorAll('.data-field p').forEach(p => {
        p.style.display = 'block';
    });
    
    // Hide avatar controls
    document.querySelector('.avatar-upload-controls').style.display = 'none';
    
    // Reset password display
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const passwordLength = currentUser.password ? currentUser.password.length : 8;
    document.getElementById('password-value').textContent = '•'.repeat(passwordLength);
    document.getElementById('profileEyeOpen').style.display = 'inline';
    document.getElementById('profileEyeClosed').style.display = 'none';
    
    // Toggle buttons
    document.getElementById('edit-btn').style.display = 'block';
    document.querySelector('.edit-controls').style.display = 'none';
}

/**
 * Validates the personal data form
 */
function validateForm() {
    let isValid = true;
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.style.display = 'none');

    const inputs = [
        { id: 'username-edit', errorId: 'username-error' },
        { id: 'password-edit', errorId: 'password-error' },
        { id: 'email-edit', errorId: 'email-error', validateEmail: true },
        { id: 'phone-edit', errorId: 'phone-error' }
    ];

    inputs.forEach(input => {
        const field = document.getElementById(input.id);
        const errorField = document.getElementById(input.errorId);
    
        if (!field || !errorField) return;
    
        if (!field.value.trim()) {
            errorField.style.display = 'block';
            isValid = false;
        } else if (input.validateEmail && !isValidEmail(field.value.trim())) {
            errorField.textContent = 'Please enter a valid email address.';
            errorField.style.display = 'block';
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Validates email format
 */
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

/**
 * Saves personal data to session storage
 */
function savePersonalData() {
    if (!validateForm()) return;

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;

    const username = document.getElementById('username-edit').value;
    const password = document.getElementById('password-edit').value;
    const email = document.getElementById('email-edit').value;
    const phone = document.getElementById('phone-edit').value;
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('profile-avatar-preview');

    // Update user data
    currentUser.name = username;
    currentUser.password = password;
    currentUser.email = email;
    currentUser.phone = phone;

    // Save avatar if changed
    if (avatarUpload && avatarUpload.dataset.preview) {
        currentUser.avatar = avatarUpload.dataset.preview;
    } else {
        currentUser.avatar = avatarPreview.src;
    }

    // Save to session storage
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    location.reload(); // Refresh to show changes
}

/**
 * Logs out the current user
 */
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Event listeners for data updates
document.addEventListener('cartUpdated', updateNotificationBadges);
document.addEventListener('garageUpdated', updateNotificationBadges);
document.addEventListener('appointmentsUpdated', updateNotificationBadges);
document.addEventListener('wishlistUpdated', updateNotificationBadges);