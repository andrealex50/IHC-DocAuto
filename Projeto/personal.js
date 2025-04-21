document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    updateNotificationBadges();
    setupCart();
    setupAvatarUpload();
    setupSidebarToggle();
});

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

function setupCart() {
    const cartIconContainer = document.getElementById('cart-icon-container');
    if (!cartIconContainer) return;

    const cartPopup = cartIconContainer.querySelector('.cart-popup');

    // Update cart popup
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
}

function setupAvatarUpload() {
    const avatarUpload = document.getElementById('avatar-upload');
    if (avatarUpload) {
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const avatarPreview = document.getElementById('profile-avatar-preview');
                    // Atualiza só o preview da área de edição
                    avatarPreview.src = event.target.result;
                    // Guarda no dataset
                    avatarUpload.dataset.preview = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}


function removeAvatar() {
    const defaultAvatar = 'assets/profile.svg';
    const avatarPreview = document.getElementById('profile-avatar-preview');
    const avatarUpload = document.getElementById('avatar-upload');

    avatarPreview.src = defaultAvatar;

    // Limpa o dataset, mas NÃO atualiza nada no currentUser
    if (avatarUpload) {
        avatarUpload.dataset.preview = '';
    }
}


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

function savePersonalData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;

    currentUser.name = document.getElementById('username-edit').value;
    currentUser.password = document.getElementById('password-edit').value;
    currentUser.email = document.getElementById('email-edit').value;
    currentUser.phone = document.getElementById('phone-edit').value || 'Not provided';

    const avatarUpload = document.getElementById('avatar-upload');
    if (avatarUpload) {
        if (avatarUpload.dataset.preview) {
            currentUser.avatar = avatarUpload.dataset.preview;
        } else {
            currentUser.avatar = null;
        }
    }

    // Grava no sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Atualiza localStorage
    const users = JSON.parse(localStorage.getItem('logins')) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('logins', JSON.stringify(users));
    }

    loadUserData();
    cancelEdit();
    document.querySelector('.user-name').textContent = currentUser.name;
}


function toggleProfilePasswordVisibility() {
    const passwordDisplay = document.getElementById('password-value');
    const eyeOpen = document.getElementById('profileEyeOpen');
    const eyeClosed = document.getElementById('profileEyeClosed');
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (passwordDisplay.textContent === currentUser.password) {
        // If showing password, switch back to dots
        const passwordLength = currentUser.password ? currentUser.password.length : 8;
        passwordDisplay.textContent = '•'.repeat(passwordLength);
        eyeOpen.style.display = 'inline';
        eyeClosed.style.display = 'none';
    } else {
        // If showing dots, show real password
        passwordDisplay.textContent = currentUser.password || '';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'inline';
    }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

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

    // Cart
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartBadge = document.querySelector('.notification-badge-cart');
    if (cartBadge) {
        cartBadge.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartBadge.style.display = 'flex';
    }
    
    // Update cart popup and total
    updateCartPopup();
}

function updateCartPopup() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
    // Update cart total in header
    document.getElementById('cart-total').textContent = `${cartTotal.toFixed(2)}€`;
  
    // Update popup content
    const cartPopupContent = document.getElementById('cartPopupContent');
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
              <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${index})">✖</button>
        </div>
      `).join('');
    }
  
    // Update totals
    document.querySelector('.total-price').textContent = `${cartTotal.toFixed(2)}€`;
}

function changeQuantity(index, delta) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems[index].quantity += delta;
  
    // Remove if quantity is 0 or less
    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    document.dispatchEvent(new Event('cartUpdated'));
}

function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    document.dispatchEvent(new Event('cartUpdated'));
}

// Event listeners
document.addEventListener('cartUpdated', () => {
    updateNotificationBadges();
    updateCartPopup();
});
document.addEventListener('garageUpdated', updateNotificationBadges);
document.addEventListener('appointmentsUpdated', updateNotificationBadges);