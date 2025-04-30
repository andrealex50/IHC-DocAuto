document.addEventListener("DOMContentLoaded", function() {
    // Load cart items and saved cards
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    let selectedCardIndex = null;
    
    // Initialize all functionality
    function initialize() {
        displayCartItems();
        loadPaymentMethod();
        setupEventListeners();
        setupPurchaseConfirmation();
    }

    // Display cart items in order summary
    function displayCartItems() {
        const cartItemsContainer = document.querySelector('.order-summary .cart-items');
        const subtotalElement = document.querySelector('.subtotal-price');
        const shippingElement = document.querySelector('.shipping-price');
        const totalElement = document.querySelector('.order-summary .total-price');
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            document.getElementById('completePurchaseBtn').style.display = 'none';
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

    // Get card icon based on type
    function getCardIcon(type) {
        const typeLower = type.toLowerCase();
        if (typeLower.includes('visa')) {
            return '<i class="fab fa-cc-visa"></i>';
        } else if (typeLower.includes('mastercard')) {
            return '<i class="fab fa-cc-mastercard"></i>';
        } else if (typeLower.includes('amex') || typeLower.includes('american express')) {
            return '<i class="fab fa-cc-amex"></i>';
        } else if (typeLower.includes('discover')) {
            return '<i class="fab fa-cc-discover"></i>';
        } else {
            return '<i class="far fa-credit-card"></i>';
        }
    }

    // Load payment method from localStorage
    function loadPaymentMethod() {
        const defaultCard = savedCards.find(card => card.isDefault) || savedCards[0];
        const paymentDetails = document.querySelector('.item-description');
        
        if (!defaultCard) {
            // No saved cards - show add payment method button
            paymentDetails.innerHTML = `
                <div class="no-payment-method">
                    <p>No payment method saved</p>
                    <button class="primary-btn" onclick="window.location.href='payment-methods.html'">
                        Add Payment Method
                    </button>
                </div>
            `;
            document.getElementById('completePurchaseBtn').disabled = true;
            return;
        }

        // Format the card display
        paymentDetails.innerHTML = `
            <strong>Cardholder:</strong> ${defaultCard.name}<br>
            <strong>Card Type:</strong> ${defaultCard.type}<br>
            <strong>Card Number:</strong> •••• •••• •••• ${defaultCard.last4}<br>
            <strong>Expiration:</strong> ${defaultCard.expiry}
        `;
    }

    // Show card selection modal
    function showCardModal() {
        const modal = document.getElementById('cardModal');
        const cardSelectionContainer = document.getElementById('cardSelectionContainer');
        
        // Clear previous selections
        selectedCardIndex = null;
        document.getElementById('confirmCardBtn').disabled = true;
        
        // Populate modal with saved cards
        if (savedCards.length === 0) {
            cardSelectionContainer.innerHTML = `
                <div class="empty-state">
                    <p>No saved payment methods</p>
                </div>
            `;
        } else {
            cardSelectionContainer.innerHTML = savedCards.map((card, index) => `
                <div class="modal-card" data-index="${index}">
                    <div class="modal-card-icon">
                        ${getCardIcon(card.type)}
                    </div>
                    <div class="modal-card-details">
                        <h3>${card.type} •••• ${card.last4}</h3>
                        <p>Expires ${card.expiry} ${card.isDefault ? '• Default' : ''}</p>
                    </div>
                </div>
            `).join('');
            
            // Add click handlers to cards
            document.querySelectorAll('.modal-card').forEach(card => {
                card.addEventListener('click', function() {
                    // Remove selected class from all cards
                    document.querySelectorAll('.modal-card').forEach(c => {
                        c.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked card
                    this.classList.add('selected');
                    selectedCardIndex = parseInt(this.getAttribute('data-index'));
                    document.getElementById('confirmCardBtn').disabled = false;
                });
            });
        }
        
        modal.style.display = 'block';
    }
    
    // Close card modal
    function closeCardModal() {
        document.getElementById('cardModal').style.display = 'none';
    }
    
    // Use selected card from modal
    function useSelectedCard() {
        if (selectedCardIndex !== null) {
            const selectedCard = savedCards[selectedCardIndex];
            
            // Update the displayed payment method
            document.querySelector('.item-description').innerHTML = `
                <strong>Cardholder:</strong> ${selectedCard.name}<br>
                <strong>Card Type:</strong> ${selectedCard.type}<br>
                <strong>Card Number:</strong> •••• •••• •••• ${selectedCard.last4}<br>
                <strong>Expiration:</strong> ${selectedCard.expiry}
            `;
            
            // Enable checkout button if it was disabled
            document.getElementById('completePurchaseBtn').disabled = false;
            
            closeCardModal();
        }
    }

    // Setup purchase confirmation flow
    function setupPurchaseConfirmation() {
        const checkoutButton = document.getElementById('completePurchaseBtn');
        const confirmModal = document.getElementById('confirmPurchaseModal');
        const cancelBtn = document.getElementById('cancelPurchaseBtn');
        const confirmBtn = document.getElementById('finalizePurchaseBtn');
        const miniTotal = document.querySelector('.order-summary-mini .total-price');

        if (checkoutButton) {
            checkoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update the mini summary in the confirmation modal
                const total = document.querySelector('.order-summary .total-price').textContent;
                miniTotal.textContent = total;
                
                // Show confirmation modal
                confirmModal.style.display = 'block';
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                confirmModal.style.display = 'none';
            });
        }

        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                confirmModal.style.display = 'none';
                processPurchase();
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === confirmModal) {
                confirmModal.style.display = 'none';
            }
        });
    }

    // Process the actual purchase
    function processPurchase() {
        if (savedCards.length === 0) {
            alert('Please add a payment method before completing your purchase');
            return;
        }

        // Get the selected card (or default if none selected)
        const paymentMethod = selectedCardIndex !== null ? 
            savedCards[selectedCardIndex] : 
            savedCards.find(card => card.isDefault) || savedCards[0];

        const order = {
            date: new Date().toISOString(),
            items: cartItems,
            total: document.querySelector('.order-summary .total-price').textContent,
            paymentMethod: paymentMethod
        };

        // Save order to history
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        orderHistory.push(order);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

        // Clear cart and redirect
        localStorage.removeItem('cartItems');
        window.location.href = 'home.html';
    }

    // Setup all event listeners
    function setupEventListeners() {
        // Edit button shows modal
        const editButton = document.querySelector('.edit-button');
        if (editButton) {
            editButton.addEventListener('click', showCardModal);
        }
        
        // Card modal controls
        document.querySelector('.close-modal').addEventListener('click', closeCardModal);
        document.getElementById('confirmCardBtn').addEventListener('click', useSelectedCard);
        document.getElementById('addNewCardBtn').addEventListener('click', function() {
            closeCardModal();
            window.location.href = 'payment-methods.html';
        });
        
        // Close card modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('cardModal');
            if (event.target === modal) {
                closeCardModal();
            }
        });
    }

    // Start the application
    initialize();
});