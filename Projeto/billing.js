document.addEventListener("DOMContentLoaded", function() {
    // Load cart items
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Load user data from localStorage (original implementation)
    const savedAddress = localStorage.getItem('address');
    const savedNif = localStorage.getItem('nif');
    const savedPhone = localStorage.getItem('phone');
    const savedEmail = localStorage.getItem('email');
    
    // Load current user from sessionStorage (new implementation)
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || {};

    // Display user information
    function displayUserInfo() {
        const userEmail = document.getElementById('user-email');
        const userAddress = document.getElementById('user-address');
        const userNif = document.getElementById('user-nif');
        const userPhone = document.getElementById('user-phone');

        // Use email from localStorage if available, otherwise from currentUser
        const email = savedEmail || currentUser.email || "Not specified";
        // Use name from currentUser if available
        const name = currentUser.name || "";
        
        // Combine both data sources with localStorage having priority
        const address = savedAddress || (currentUser.address || "Not specified");
        const nif = savedNif || (currentUser.nif || "Not specified");
        const phone = savedPhone || (currentUser.phone || "Not specified");

        userEmail.textContent = name ? `${name}, ${email}` : email;
        userAddress.textContent = address;
        userNif.textContent = nif;
        userPhone.textContent = phone;
    }

    // Display cart items in order summary
    function displayCartItems() {
        const cartItemsContainer = document.querySelector('.order-summary .cart-items');
        const subtotalElement = document.querySelector('.subtotal-price');
        const shippingElement = document.querySelector('.shipping-price');
        const totalElement = document.querySelector('.order-summary .total-price');
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            document.querySelector('.checkout-button1').style.display = 'none';
            return;
        }

        // Clear existing items
        cartItemsContainer.innerHTML = '';

        // Add each cart item
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image || 'assets/default-part.png'}" alt="${item.name}">
                </div>
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <div class="item-meta">
                        <span>Quantity: ${item.quantity}</span>
                    </div>
                </div>
                <div class="item-price">${(item.price * item.quantity).toFixed(2)}€</div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 2.99 : 0;
        const total = subtotal + shipping;

        // Update summary
        subtotalElement.textContent = `${subtotal.toFixed(2)}€`;
        shippingElement.textContent = `${shipping.toFixed(2)}€`;
        totalElement.textContent = `${total.toFixed(2)}€`;
    }

    // Initialize notification badges
    function updateNotificationBadges() {
        // Cart
        const cartBadge = document.querySelector('.notification-badge-cart');
        if (cartBadge) {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // Cart total
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) {
            const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotalElement.textContent = cartTotal.toFixed(2) + '€';
        }
    }

    // Initialize everything
    displayUserInfo();
    displayCartItems();
    updateNotificationBadges();

    // Set up event listener for edit button
    document.querySelector('.edit-button').addEventListener('click', function() {
        window.location.href = 'address.html';
    });
});