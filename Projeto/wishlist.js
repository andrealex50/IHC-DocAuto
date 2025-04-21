document.addEventListener('DOMContentLoaded', function() {
    // Main elements
    const elements = {
        wishlistContainer: document.getElementById('wishlist-container'),
        emptyWishlist: document.getElementById('empty-wishlist'),
        browseProductsBtn: document.getElementById('browse-products-btn'),
        sidebar: document.querySelector('.sidebar'),
        sidebarToggle: document.querySelector('.sidebar-toggle'),
        sidebarOverlay: document.querySelector('.sidebar-overlay'),
        headerIcon: document.querySelector('.header-icon')
    };

    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize
    initEventListeners();
    loadWishlist();
    updateNotificationBadges();
    setupResponsiveLayout();

    // Listen for wishlist updates
    document.addEventListener('wishlistUpdated', loadWishlist);

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
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', searchWishlist);
        }
    }

    function loadWishlist() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
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
            <div class="wishlist-details">
                <div class="detail-item">
                    <span class="detail-label">Price</span>
                    <span class="detail-value">${item.price} €</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Code</span>
                    <span class="detail-value">${item.code}</span>
                </div>
                <div class="detail-item full-width">
                    <span class="detail-label">Description</span>
                    <span class="detail-value">${item.description}</span>
                </div>
            </div>
            <button class="view-product-btn">View Product Details</button>
        `;
        
        // Add event listeners
        card.querySelector('.wishlist-remove-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromWishlist(index);
        });
        
        card.querySelector('.view-product-btn').addEventListener('click', () => {
            viewProductDetails(item.id);
        });
        
        // Make the whole card clickable
        card.addEventListener('click', () => {
            viewProductDetails(item.id);
        });
        
        return card;
    }

    function removeFromWishlist(index) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        document.dispatchEvent(new CustomEvent('wishlistUpdated'));
    }

    function viewProductDetails(productId) {
        // Redirect to product details page with the product ID
        window.location.href = `product-details.html?id=${productId}`;
    }

    function searchWishlist() {
        const searchTerm = document.querySelector('.search-input').value.toLowerCase();
        const typeFilter = document.getElementById('type').value;
        
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
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

    function toggleSidebar(e) {
        e.stopPropagation();
        elements.sidebar.classList.toggle('active');
        elements.sidebarToggle.classList.toggle('active');
        elements.sidebarOverlay.style.display = elements.sidebar.classList.contains('active') ? 'block' : 'none';
    }

    function closeSidebar() {
        elements.sidebar.classList.remove('active');
        elements.sidebarToggle.classList.remove('active');
        elements.sidebarOverlay.style.display = 'none';
    }

    function setupResponsiveLayout() {
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                closeSidebar();
            }
            
            if (elements.headerIcon) {
                elements.headerIcon.style.display = window.innerWidth <= 992 ? 'block' : 'none';
            }
        });
    }

    function updateNotificationBadges() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const appointments = JSON.parse(localStorage.getItem('calendarEvents')) || [];
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        
        // Update wishlist badge
        const wishlistBadge = document.querySelector('.notification-badge-wishlist');
        if (wishlistBadge) {
            wishlistBadge.textContent = wishlist.length;
            wishlistBadge.style.display = wishlist.length > 0 ? 'inline-block' : 'none';
        }
        
        // Update appointments badge
        const appointBadge = document.querySelector('.notification-badge-appoint');
        if (appointBadge) {
            appointBadge.textContent = appointments.length;
            appointBadge.style.display = appointments.length > 0 ? 'inline-block' : 'none';
        }
        
        // Update garage badge
        const garageBadge = document.querySelector('.notification-badge-garage');
        if (garageBadge) {
            garageBadge.textContent = vehicles.length;
            garageBadge.style.display = vehicles.length > 0 ? 'inline-block' : 'none';
        }
    }
});

// Make this function available globally to add items to wishlist from other pages
function addToWishlist(product) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product is already in wishlist
    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        document.dispatchEvent(new CustomEvent('wishlistUpdated'));
    }
}