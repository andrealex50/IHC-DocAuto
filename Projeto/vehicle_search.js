document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const searchType = params.get('searchType');
    const header = document.getElementById('searchResultsHeader');
    
    if (searchType === 'plate') {
        const plate = params.get('plate');
        header.innerHTML = `<h2>Searching for parts for license plate: ${plate}</h2>`;
    } else if (searchType === 'model') {
        const brand = params.get('brand');
        const model = params.get('model');
        const year = params.get('year');
        header.innerHTML = `<h2>Searching for parts for: ${brand} ${model} (${year})</h2>`;
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
            
            // Build the filter sidebar HTML
            // Inside the showCategoryItems function, replace the brandFiltersHTML section with:

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
                <p>For your vehicle:</p>
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
        
        listElement.innerHTML = items.map(item => `
            <div class="filter-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="filter-content">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    ${item.inStock ? '<p class="in-stock">In stock</p>' : '<p class="out-of-stock">Out of stock</p>'}
                </div>
                <div class="price-section">
                    <span class="price">${item.price}</span>
                    <button class="add-to-cart" ${!item.inStock ? 'disabled' : ''}>Add to Cart</button>
                </div>
            </div>
        `).join('');
        
        // Add click handlers for Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.closest('.filter-item').querySelector('h4').textContent;
                addToCart(itemName);
            });
        });
    }

    function addToCart(itemName) {
        // Find the item in any category
        let item = null;
        for (const category in partsData) {
            item = partsData[category].find(i => i.name === itemName);
            if (item) break;
        }
        
        if (!item) return;
        
        // Update cart counter
        const cartBadge = document.querySelector('.notification-badge-cart');
        const currentCount = parseInt(cartBadge.textContent) || 0;
        cartBadge.textContent = currentCount + 1;
        
        // Update cart total
        const cartTotal = document.querySelector('#cart-total');
        const currentTotal = parseFloat(cartTotal.textContent.replace('€', '').trim()) || 0;
        const itemPrice = item.priceValue;
        const newTotal = (currentTotal + itemPrice).toFixed(2);
        cartTotal.textContent = `${newTotal}€`;
        
        alert(`${itemName} has been added to your cart!`);
    }
});