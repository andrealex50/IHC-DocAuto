document.addEventListener("DOMContentLoaded", function() {
    // Initialize notification badges
    updateNotificationBadges();
    
    const params = new URLSearchParams(window.location.search);
    const searchType = params.get('searchType');
    const header = document.getElementById('searchResultsHeader');
    
    // inicializar o contador de whislist do popup cart
    updateWishlistCounter();

    if (searchType === 'plate') {
        const plate = params.get('plate');
        header.innerHTML = `<h2>Searching for parts for license plate: ${plate}</h2>`;
    } else if (searchType === 'model') {
        const brand = params.get('brand');
        const model = params.get('model');
        const year = params.get('year');
        header.innerHTML = `<h2>Searching for parts for: ${brand} ${model} (${year})</h2>`;
    } else if (searchType === 'part') {
        const category = params.get('category');
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        header.innerHTML = `<h2>Searching for ${categoryName} parts</h2>`;
        
        // Automatically show the selected category
        hideAllPartsSections();
        showCategoryItems(category);
    } else if (searchType === 'parts') {
        header.innerHTML = `<h2>All Parts</h2>`;
    } else if (searchType === 'brand') {
        const brand = params.get('brand');
        const vehicleType = params.get('type');
        header.innerHTML = `<h2>Searching for parts for ${brand} ${vehicleType}s</h2>`;
    } 

    // Define all items data
    const partsData = {
        filters: [
            {
                name: "CARTHINGS A478 - Air Filter",
                description: "207mm, 131mm round, filter cartridge with integrated grid",
                price: "5,30 €",
                priceValue: 5.30,
                inStock: true,
                brand: "CARTHINGS",
                image: "assets/filter1.png"
            },
            {
                name: "BOSCH F026400043 - Oil Filter",
                description: "Spin-on type, 3/4-16 UNF thread, 80mm height",
                price: "8,90 €",
                priceValue: 8.90,
                inStock: true,
                brand: "BOSCH",
                image: "assets/filter2.png"
            },
            {
                name: "MAHLE KL145 - Cabin Filter",
                description: "Activated carbon, 245x195x25mm",
                price: "12,50 €",
                priceValue: 12.50,
                inStock: true,
                brand: "MAHLE",
                image: "assets/filter3.png"
            }
        ],
        exhaust: [
            {
                name: "MagnaFlow Performance Exhaust",
                description: "Stainless steel, 2.5\" diameter, improves airflow",
                price: "349,99 €",
                priceValue: 349.99,
                inStock: true,
                brand: "MagnaFlow",
                image: "assets/exhaust1.png"
            },
            {
                name: "Borla Cat-Back System",
                description: "Aluminized steel, aggressive tone, bolt-on installation",
                price: "599,99 €",
                priceValue: 599.99,
                inStock: true,
                brand: "Borla",
                image: "assets/exhaust2.png"
            },
            {
                name: "Flowmaster Super 40",
                description: "Chambered design, deep tone, 409S stainless steel",
                price: "279,99 €",
                priceValue: 279.99,
                inStock: false,
                brand: "Flowmaster",
                image: "assets/exhaust3.png"
            }
        ],
        tyres: [
            {
                name: "Michelin Pilot Sport 4",
                description: "235/45R18 98Y XL, summer performance tyres",
                price: "129,99 €",
                priceValue: 129.99,
                inStock: true,
                brand: "Michelin",
                image: "assets/tyre1.png"
            },
            {
                name: "Pirelli P Zero Nero",
                description: "225/40R18 92Y, all-season ultra high performance",
                price: "109,99 €",
                priceValue: 109.99,
                inStock: true,
                brand: "Pirelli",
                image: "assets/tyre2.png"
            },
            {
                name: "Continental WinterContact TS 860",
                description: "205/55R16 94H XL, winter tyres with sipe technology",
                price: "89,99 €",
                priceValue: 89.99,
                inStock: true,
                brand: "Continental",
                image: "assets/tyre3.png"
            }
        ],
        breaks: [
            {
                name: "Brembo Brake Pads",
                description: "Front axle, ceramic compound, low dust",
                price: "89,99 €",
                priceValue: 89.99,
                inStock: true,
                brand: "Brembo",
                image: "assets/brake1.png"
            },
            {
                name: "EBC Slotted Rotors",
                description: "Pair, front, zinc plated, improves heat dissipation",
                price: "159,99 €",
                priceValue: 159.99,
                inStock: true,
                brand: "EBC",
                image: "assets/brake2.png"
            },
            {
                name: "Brembo GT 4-Piston Caliper Kit",
                description: "Front performance caliper kit, 4-piston fixed design, includes mounting hardware, compatible with 330-355mm discs",
                price: "499,99 €",
                priceValue: 499.99,
                inStock: true,
                brand: "Brembo",
                image: "assets/brake3.png"
            }
        ],
        suspension: [
            {
                name: "Bilstein B8 Shock Absorbers",
                description: "Front pair, sport tuning, monotube design",
                price: "299,99 €",
                priceValue: 299.99,
                inStock: true,
                brand: "Bilstein",
                image: "assets/suspension1.png"
            },
            {
                name: "Eibach Pro-Kit Springs",
                description: "Lowering springs, 30mm drop, progressive rate",
                price: "229,99 €",
                priceValue: 229.99,
                inStock: true,
                brand: "Eibach",
                image: "assets/suspension2.png"
            },
            {
                name: "KYB Excel-G Struts",
                description: "Complete assembly, OEM replacement",
                price: "179,99 €",
                priceValue: 179.99,
                inStock: true,
                brand: "KYB",
                image: "assets/suspension3.png"
            }
        ]
    };

    // Add click handler for all part items
    document.querySelectorAll('.part-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const partName = this.querySelector('p').textContent;
            
            // Hide all parts sections first
            hideAllPartsSections();
            
            // Map part names to data categories
            const categoryMap = {
                'Filters': 'filters',
                'Exhaust': 'exhaust',
                'Tyres': 'tyres',
                'Breaks': 'breaks',
                'Suspension': 'suspension'
            };
            
            const category = categoryMap[partName];
            if (category) {
                showCategoryItems(category);
            }
        });
    });

    function hideAllPartsSections() {
        // Hide all category sections
        const categories = ['filters', 'exhaust', 'tyres', 'breaks', 'suspension'];
        categories.forEach(category => {
            const section = document.getElementById(`${category}Items`);
            if (section) {
                section.style.display = 'none';
            }
        });
    }

    function showCategoryItems(category) {
        // Create or show the items container for this category
        let container = document.getElementById(`${category}Items`);
        if (!container) {
            container = document.createElement('div');
            container.id = `${category}Items`;
            container.className = 'filter-items';

            const params = new URLSearchParams(window.location.search);
            const searchType = params.get('searchType');
            
            // Only show "For your vehicle:" if searchType is model or plate
            const forYourVehicleText = (searchType === 'model' || searchType === 'plate') ? 
            '<p>For your vehicle:</p>' : '';
            
            let brandFiltersHTML = '';
            if (category === 'filters') {
                brandFiltersHTML = `
                <div class="filter-group">
                    <h5>Brand</h5>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="brand1" name="brand" value="CARTHINGS">
                        <label for="brand1">CARTHINGS</label>
                    </div>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="brand2" name="brand" value="BOSCH">
                        <label for="brand2">BOSCH</label>
                    </div>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="brand3" name="brand" value="MAHLE">
                        <label for="brand3">MAHLE</label>
                    </div>
                </div>`;
            } else if (category === 'exhaust') {
                brandFiltersHTML = `
                <div class="filter-group">
                    <h5>Brand</h5>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="exhaustBrand1" name="brand" value="MagnaFlow">
                        <label for="exhaustBrand1">MagnaFlow</label>
                    </div>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="exhaustBrand2" name="brand" value="Borla">
                        <label for="exhaustBrand2">Borla</label>
                    </div>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="exhaustBrand3" name="brand" value="Flowmaster">
                        <label for="exhaustBrand3">Flowmaster</label>
                    </div>
                </div>`;
            } else if (category === 'tyres') {
                brandFiltersHTML = `
                <div class="filter-group">
                    <h5>Brand</h5>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="tyresBrand1" name="brand" value="Michelin">
                        <label for="tyresBrand1">Michelin</label>
                    </div>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="tyresBrand2" name="brand" value="Pirelli">
                        <label for="tyresBrand2">Pirelli</label>
                    </div>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="tyresBrand3" name="brand" value="Continental">
                        <label for="tyresBrand3">Continental</label>
                    </div>
                </div>`;
            } else if (category === 'breaks') {
                brandFiltersHTML = `
                <div class="filter-group">
                    <h5>Brand</h5>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="breaksBrand1" name="brand" value="Brembo">
                        <label for="breaksBrand1">Brembo</label>
                    </div>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="breaksBrand2" name="brand" value="EBC">
                        <label for="breaksBrand2">EBC</label>
                    </div>
                </div>`;
            } else if (category === 'suspension') {
                brandFiltersHTML = `
                <div class="filter-group">
                    <h5>Brand</h5>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="suspensionBrand1" name="brand" value="Bilstein">
                        <label for="suspensionBrand1">Bilstein</label>
                    </div>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="suspensionBrand2" name="brand" value="Eibach">
                        <label for="suspensionBrand2">Eibach</label>
                    </div>
                    <div class="filter-checkbox">
                        <input type="checkbox" id="suspensionBrand3" name="brand" value="KYB">
                        <label for="suspensionBrand3">KYB</label>
                    </div>
                </div>`;
            }
            
            container.innerHTML = `
                <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                ${forYourVehicleText}
                <div class="filter-container">
                    <div class="filter-sidebar">
                        <h4>Filter By</h4>
                        <div class="filter-group">
                            <h5>Price</h5>
                            <select class="filter-select">
                                <option value="">All Prices</option>
                                <option value="0-10">Under 10€</option>
                                <option value="10-20">10€ - 20€</option>
                                <option value="20-50">20€ - 50€</option>
                                <option value="50+">Over 50€</option>
                            </select>
                        </div>
                        ${brandFiltersHTML}
                        <div class="filter-group">
                            <h5>Availability</h5>
                            <div class="filter-checkbox">
                                <input type="checkbox" id="inStock" name="availability" value="inStock" unchecked>
                                <label for="inStock">In Stock Only</label>
                            </div>
                        </div>
                        <button class="apply-filters">Apply Filters</button>
                    </div>
                    <div class="filter-results">
                        <div class="filter-list" id="${category}List"></div>
                    </div>
                </div>
            `;
            
            document.querySelector('.content').appendChild(container);
            
            // Add event listener for the apply filters button
            container.querySelector('.apply-filters').addEventListener('click', function() {
                applyCategoryFilters(category);
            });
        }
        
        container.style.display = 'block';
        displayItems(partsData[category], `${category}List`);
    }

    function applyCategoryFilters(category) {
        const container = document.getElementById(`${category}Items`);
        const priceFilter = container.querySelector('.filter-select').value;
        const inStockOnly = container.querySelector('#inStock').checked;
        
        let brandFilters = [];
        const brandCheckboxes = container.querySelectorAll('.filter-checkbox input[name="brand"]:checked');
        if (brandCheckboxes.length > 0) {
            brandFilters = Array.from(brandCheckboxes).map(cb => cb.value);
        }
        
        const filteredItems = partsData[category].filter(item => {
            // Price filter
            if (priceFilter) {
                const priceRange = priceFilter.split('-');
                const itemPrice = item.priceValue;
                
                if (priceRange[1] === '+') {
                    if (itemPrice < parseFloat(priceRange[0])) return false;
                } else if (priceRange.length === 2) {
                    if (itemPrice < parseFloat(priceRange[0]) || itemPrice > parseFloat(priceRange[1])) return false;
                }
            }
            
            if (brandFilters.length > 0 && !brandFilters.includes(item.brand)) {
                return false;
            }
            
            // Stock availability filter
            if (inStockOnly && !item.inStock) {
                return false;
            }
            
            return true;
        });
        
        displayItems(filteredItems, `${category}List`);
    }

    function displayItems(items, targetId) {
        const listElement = document.getElementById(targetId);
        
        if (items.length === 0) {
            listElement.innerHTML = '<p class="no-results">No items available</p>';
            return;
        }
        realInStock = false;
        listElement.innerHTML = items.map(item => {
            // Check if item is in wishlist
            const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
            const isInWishlist = wishlistItems.some(wishlistItem => wishlistItem.name === item.name);
            realInStock = item.inStock;

            return `
                <div class="filter-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="filter-content">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        ${item.inStock ? '<p class="in-stock">In stock</p>' : '<p class="out-of-stock">Out of stock</p>'}
                    </div>
                    <div class="price-section">
                        <div class="wishlist-heart-container">
                            <svg class="wishlist-heart ${isInWishlist ? 'active' : ''}" 
                                data-name="${item.name}" 
                                data-price="${item.priceValue}" 
                                data-image="${item.image}"
                                data-description="${item.description}"
                                data-inStock="${item.inStock}"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span class="price">${item.price}</span>
                        </div>
                        <button class="add-to-cart" ${!item.inStock ? 'disabled' : ''} data-name="${item.name}" data-price="${item.priceValue}" data-image="${item.image}">Add to Cart</button>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add click handlers for Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.getAttribute('data-name');
                const itemPrice = parseFloat(this.getAttribute('data-price'));
                const itemImage = this.getAttribute('data-image');
                addToCart(itemName, itemPrice, itemImage);
            });
        });
        
        // Add click handlers for wishlist hearts
        document.querySelectorAll('.wishlist-heart').forEach(heart => {
            // No evento de clique do coração, dentro da função displayItems:
            heart.addEventListener('click', function() {
                const itemName = this.getAttribute('data-name');
                const itemPrice = parseFloat(this.getAttribute('data-price'));
                const itemImage = this.getAttribute('data-image');
                const itemDescription = this.getAttribute('data-description');
                const itemInStock = realInStock;

                toggleWishlistItem(itemName, itemPrice, itemImage, itemDescription, itemInStock, this);
            });
        });
    }
    
    function toggleWishlistItem(itemName, itemPrice, itemImage, itemDescription, itemInStock, heartElement) {
        let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        const itemIndex = wishlistItems.findIndex(item => item.name === itemName);
        
        if (itemIndex === -1) {
            // Adicionar ao wishlist - garantindo que inStock seja booleano
            wishlistItems.push({
                name: itemName,
                price: itemPrice,
                image: itemImage,
                description: itemDescription,
                inStock: itemInStock === true || itemInStock === 'true' // Corrige a comparação
            });
            heartElement.classList.add('active');
            
            // Mostrar notificação
            showWishlistNotification(`${itemName} added to wishlist`);
        } else {
            // Remover do wishlist
            wishlistItems.splice(itemIndex, 1);
            heartElement.classList.remove('active');
        }
        
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        updateNotificationBadges();
        updateWishlistCounter();
    }
    
    function showWishlistNotification(message) {
        let toast = document.getElementById('wishlist-notification-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'wishlist-notification-toast';
            toast.className = 'notification-toast';
            document.body.appendChild(toast);
        }
        
        toast.innerHTML = `
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="message">${message}</span>
        `;
        
        setTimeout(() => {
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }, 10);
    }

    function addToCart(itemName, itemPrice, itemImage) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Check if item already exists in cart
        const existingItem = cartItems.find(item => item.name === itemName);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                name: itemName,
                price: itemPrice,
                image: itemImage,
                quantity: 1
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update cart UI
        updateNotificationBadges();
        updateCartPopup();
        
        // Create or update notification toast
        let toast = document.getElementById('cart-notification-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-notification-toast';
            toast.className = 'notification-toast';
            toast.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="message">${itemName} has been added to your cart!</span>
            `;
            document.body.appendChild(toast);
        } else {
            toast.querySelector('.message').textContent = `${itemName} has been added to your cart!`;
        }
        
        // Show the toast
        setTimeout(() => {
            toast.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }, 10);
    }

    // Setup cart popup functionality
    setupCart();
});

function setupCart() {
    const cartIconContainer = document.getElementById('cart-icon-container');
    if (!cartIconContainer) return;

    const cartPopup = cartIconContainer.querySelector('.cart-popup');
    const cartTotalElement = document.getElementById('cart-total');
    const cartPopupContent = document.getElementById('cartPopupContent');

    //////////////////////////////////////////////////////////

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

    updateWishlistCounter();

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
    // Garage
    const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
    const garageBadge = document.querySelector('.notification-badge-garage');
    if (garageBadge) {
        garageBadge.textContent = vehicles.length;
    }

    // Appointments
    const appointments = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    const appointBadge = document.querySelector('.notification-badge-appoint');
    if (appointBadge) {
        appointBadge.textContent = appointments.length;
    }

    // Cart
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartBadge = document.querySelector('.notification-badge-cart');
    if (cartBadge) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = totalItems;
    }

    // Wishlist
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const wishlistBadge = document.querySelector('.notification-badge-wishlist');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlistItems.length;
    }
}


function updateWishlistCounter() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const wishlistBadge = document.querySelector('.notification-badge-wishlist');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlistItems.length;
    }
}