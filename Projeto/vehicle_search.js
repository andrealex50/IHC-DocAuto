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

    // Add click handler for filter items
    document.querySelectorAll('.part-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const partName = this.querySelector('p').textContent;
            
            if (partName === 'Filters') {
                showFilterItems();
            }
        });
    });

    function showFilterItems() {
        const filterItems = [
            {
                name: "CARTHINGS A478 - Air Filter",
                description: "207mm, 131mm round, filter cartridge with integrated grid",
                price: "5,30 €",
                inStock: true,
                image: "assets/filter1.png"
            },
            {
                name: "BOSCH F026400043 - Oil Filter",
                description: "Spin-on type, 3/4-16 UNF thread, 80mm height",
                price: "8,90 €",
                inStock: true,
                image: "assets/filter2.png"
            },
            {
                name: "MAHLE KL145 - Cabin Filter",
                description: "Activated carbon, 245x195x25mm",
                price: "12,50 €",
                inStock: true,
                image: "assets/filter3.png"
            }
        ];
    
        const filterList = document.getElementById('filterList');
        filterList.innerHTML = filterItems.map(filter => `
            <div class="filter-item">
                <img src="${filter.image}" alt="${filter.name}">
                <div class="filter-content">
                    <h4>${filter.name}</h4>
                    <p>${filter.description}</p>
                    <p class="in-stock">In stock</p>
                </div>
                <div class="price-section">
                    <span class="price">${filter.price}</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `).join('');
    
        document.getElementById('filterItems').style.display = 'block';
        
        // Add click handlers for Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                // FALTA FAZER ISTO PARA ADICIONAR AO CARRINHO
                alert('Added to cart!');
            });
        });
    }
});