// Handle user authentication and logo redirection
document.addEventListener("DOMContentLoaded", function() {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    const authLink = document.getElementById('auth-link');
    const authText = document.getElementById('auth-text');
    const authIcon = document.getElementById('auth-icon-img');
    const logoBox = document.querySelector('.logo-box');

    if (currentUser) {
        authText.textContent = "Profile";
        authLink.href = "profile.html";
        authIcon.src = "assets/profile.svg";
        authIcon.alt = "Profile";
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

    // Initialize the vehicle type dropdown
    selectOption('car', 'assets/car.svg');
    updateNotificationBadges();
});

// Vehicle models database
const vehicleModels = {
    car: {
        'Ford': ['Focus', 'Fiesta', 'Mustang', 'Ranger', 'Explorer', 'Edge', 'Escape', 'Bronco', 'Transit', 'F-150', 'Fusion', 'Taurus', 'EcoSport', 'Ka', 'Puma'],
        'Toyota': ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Land Cruiser', 'Prius', 'Yaris', 'Auris', 'Aygo', 'C-HR', 'Highlander', 'Tacoma', '4Runner', 'Supra', 'GT86'],
        'Volkswagen': ['Golf', 'Polo', 'Passat', 'Tiguan', 'Touareg', 'Arteon', 'Jetta', 'Virtus', 'T-Cross', 'Taos', 'Amarok', 'ID.3', 'ID.4', 'ID.6', 'Up!'],
        'BMW': ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5', 'Series 7', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i8'],
        'Mercedes-Benz': ['Classe A', 'Classe B', 'Classe C', 'Classe E', 'Classe S', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'AMG GT', 'EQC', 'CLA', 'CLS'],
        'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8', 'e-tron'],
        'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Scenic', 'Talisman', 'Zoe', 'Twizy', 'Kangoo', 'Master', 'Trafic', 'Alaskan', 'Kwid', 'Sandero', 'Duster'],
        'Peugeot': ['208', '308', '508', '2008', '3008', '5008', 'Rifter', 'Partner', 'Expert', 'Boxer', '108', 'e-208', 'e-2008', '3008 GT', '508 PSE'],
        'Hyundai': ['i10', 'i20', 'i30', 'Elantra', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Venue', 'Creta', 'Nexo', 'IONIQ 5', 'IONIQ 6', 'Staria', 'Bayon'],
        'Kia': ['Picanto', 'Rio', 'Ceed', 'Stinger', 'Soul', 'Niro', 'Sportage', 'Sorento', 'Telluride', 'Carnival', 'EV6', 'Stonic', 'XCeed', 'Seltos', 'EV9'],
        'Honda': ['Civic', 'Accord', 'Jazz', 'HR-V', 'CR-V', 'Pilot', 'City', 'BR-V', 'WR-V', 'e:NS1', 'e:NP1', 'Legend', 'Odyssey', 'CR-Z', 'Insight'],
        'Nissan': ['Micra', 'Leaf', 'Juke', 'Qashqai', 'X-Trail', 'Ariya', 'Navara', 'Patrol', 'GT-R', '370Z', 'Note', 'Almera', 'Sentra', 'Versa', 'Kicks'],
        'Volvo': ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90', 'C40', 'V90 Cross Country', 'S90 Recharge', 'XC90 Recharge', 'EX30', 'EX90', 'C30', 'S40'],
        'Mazda': ['2', '3', '6', 'CX-3', 'CX-30', 'CX-5', 'CX-9', 'MX-5', 'BT-50', 'CX-50', 'CX-60', 'CX-70', 'CX-80', 'CX-90', 'MX-30'],
        'Subaru': ['Impreza', 'Legacy', 'Outback', 'Forester', 'XV', 'BRZ', 'WRX', 'Solterra', 'Ascent', 'Crosstrek', 'Baja', 'Tribeca', 'Levorg', 'WRX STI', 'SVX'],
        'Lexus': ['IS', 'ES', 'LS', 'UX', 'NX', 'RX', 'GX', 'LX', 'RC', 'LC', 'LFA', 'RZ', 'NX Hybrid', 'RX Hybrid', 'UX Electric'],
        'Jeep': ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Gladiator', 'Commander', 'Wagoneer', 'Grand Wagoneer', 'Cherokee Trailhawk', 'Gladiator Mojave', 'Wrangler Rubicon', 'Grand Cherokee L', 'Commander PHEV'],
        'Tesla': ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Roadster', 'Semi', 'Model S Plaid', 'Model X Plaid', 'Model 3 Performance', 'Model Y Long Range'],
        'Porsche': ['911', 'Taycan', 'Panamera', 'Macan', 'Cayenne', 'Boxster', 'Cayman', '918 Spyder', 'Carrera GT', 'Macan Electric', 'Taycan Cross Turismo'],
        'Jaguar': ['XE', 'XF', 'XJ', 'E-Pace', 'F-Pace', 'I-Pace', 'F-Type', 'XK', 'XE Project 8', 'F-Type SVR', 'F-Pace SVR', 'XJR575', 'XE SV', 'XFR-S']
    },
    motorcycle: {
        'Honda': ['CBR1000RR', 'CB650R', 'CB500F', 'CRF1100L Africa Twin', 'Rebel 500', 'Gold Wing', 'Forza 750', 'X-ADV', 'CBR500R', 'CB125F', 'CRF300L', 'NC750X', 'CB300R', 'CRF250L', 'SH150i'],
        'Yamaha': ['YZF-R1', 'MT-07', 'MT-09', 'Ténéré 700', 'XSR900', 'NMAX', 'YZF-R6', 'MT-03', 'XMAX', 'Bolt', 'MT-10', 'WR250R', 'XSR700', 'Tracer 9', 'TRX850'],
        'Kawasaki': ['Ninja 650', 'Z900', 'Versys 650', 'Ninja H2', 'Z650', 'Vulcan S', 'Ninja 400', 'Z400', 'KLR650', 'Concours 14', 'Ninja ZX-6R', 'Versys 1000', 'W800', 'Z900RS', 'KLX230'],
        'Suzuki': ['GSX-R1000', 'GSX-S1000', 'V-Strom 650', 'Hayabusa', 'SV650', 'Burgman 400', 'DR-Z400', 'Boulevard M109R', 'GSX-R750', 'DL650', 'GSX-S750', 'V-Strom 1050', 'GSX-R600', 'GSX250R', 'Address 110']
    },
    truck: {
        'Volvo Trucks': ['FH', 'FM', 'FMX', 'FE', 'FL', 'VNR', 'VNX', 'VHD', 'VNL', 'VM'],
        'Scania': ['R-series', 'S-series', 'P-series', 'G-series', 'L-series', 'XPI', 'V8', 'NTG'],
        'Mercedes-Benz Trucks': ['Actros', 'Arocs', 'Atego', 'Econic', 'Unimog', 'Zetros', 'Sprinter Van', 'Vario', 'Axor'],
        'MAN': ['TGX', 'TGS', 'TGM', 'TGL', 'F2000', 'TGA', 'TGE', 'CLA'],
        'Iveco': ['Stralis', 'Eurocargo', 'S-Way', 'Daily', 'Trakker', 'T-Way', 'Powerstar'],
        'DAF': ['XF', 'CF', 'LF', 'XG', 'XG+', '95XF'],
        'Renault Trucks': ['T', 'C', 'K', 'D', 'Master Red Edition', 'Maxity'],
        'International': ['LT Series', 'RH Series', 'HV Series', 'MV Series', 'HX Series', 'ProStar', 'LoneStar'],
        'Freightliner': ['Cascadia', 'Coronado', 'Columbia', 'M2 106', '114SD', '122SD'],
        'Kenworth': ['T680', 'T880', 'W990', 'W900', 'T370', 'T270', 'C500'],
        'Peterbilt': ['579', '389', '567', '520', '537', '548'],
        'Mack': ['Anthem', 'Pinnacle', 'Granite', 'LR', 'MD Series']
    }
};

// DOM elements
const licenseInput = document.getElementById("license-plate");
const searchButtonPlate = document.querySelector(".search-button-plate");
const brandSelect = document.getElementById('car-brand');
const modelSelect = document.getElementById('car-model');
const yearSelect = document.getElementById('car-year');
const searchButtonModel = document.querySelector(".search-button-model");
const licensePlateSection = document.querySelector(".search-plate");
const modelSearchSection = document.getElementById("model-search-section");
const cartIconContainer = document.getElementById('cart-icon-container');
const cartPopupContent = document.getElementById('cartPopupContent');
const cartTotalElement = document.getElementById('cart-total');

// Initialize the page
function initializePage() {
    // License plate input formatting
    licenseInput.addEventListener("input", formatLicensePlate);
    
    // Brand, model, year select interactions
    brandSelect.addEventListener('change', handleBrandChange);
    modelSelect.addEventListener('change', handleModelChange);
    yearSelect.addEventListener('change', updateSearchButtonState);
    
    // Set initial states
    updateLicensePlateButtonState();
    updateStepIndicators();
    updateSearchButtonState();
    
    // Initialize cart
    if (!localStorage.getItem('cartItems')) {
        localStorage.setItem('cartItems', JSON.stringify([]));
    }
    updateCartPopup();
}

// Format license plate input
function formatLicensePlate(e) {
    let value = e.target.value.replace(/-/g, "");
    value = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    if (value.length > 2) value = value.slice(0, 2) + "-" + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5);
    if (value.length > 8) value = value.slice(0, 8);

    e.target.value = value;
    updateLicensePlateButtonState();
}

// Update license plate search button state
function updateLicensePlateButtonState() {
    const isComplete = licenseInput.value.length === 8;
    searchButtonPlate.disabled = !isComplete;
    searchButtonPlate.style.backgroundColor = isComplete ? "#003aab" : "#a0c4ff";
    searchButtonPlate.style.cursor = isComplete ? "pointer" : "not-allowed";
}

// Handle brand selection change
function handleBrandChange() {
    const selectedBrand = this.value;
    modelSelect.innerHTML = '<option value="">Selecione um modelo</option>';
    yearSelect.innerHTML = '<option value="">Selecione uma modificação</option>';
    
    if (selectedBrand && currentType) {
        populateModels(currentType, selectedBrand);
        modelSelect.disabled = false;
    } else {
        modelSelect.disabled = true;
        yearSelect.disabled = true;
    }
    
    updateStepIndicators();
    updateSearchButtonState();
}

// Handle model selection change
function handleModelChange() {
    yearSelect.innerHTML = '<option value="">Selecione uma modificação</option>';
    
    if (this.value) {
        populateYears();
        yearSelect.disabled = false;
    } else {
        yearSelect.disabled = true;
    }
    
    updateStepIndicators();
    updateSearchButtonState();
}

// Populate brand dropdown
function populateBrands(type) {
    brandSelect.innerHTML = '<option value="">Selecione uma marca</option>';
    
    if (vehicleModels[type]) {
        Object.keys(vehicleModels[type]).forEach(brand => {
            const option = document.createElement("option");
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    }
}

// Populate model dropdown
function populateModels(type, brand) {
    modelSelect.innerHTML = '<option value="">Selecione um modelo</option>';
    
    if (type && brand && vehicleModels[type] && vehicleModels[type][brand]) {
        vehicleModels[type][brand].forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
}

// Populate year dropdown (simplified for example)
function populateYears() {
    yearSelect.innerHTML = '<option value="">Selecione uma modificação</option>';
    const years = ["2023", "2022", "2021", "2020"];
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
}

// Update step indicators
function updateStepIndicators() {
    const steps = document.querySelectorAll('.step-number');
    
    // Primeiro step sempre verde (para selecionar marca)
    steps[0].style.backgroundColor = '#4caf50';
    
    // Segundo step verde apenas se marca selecionada
    steps[1].style.backgroundColor = brandSelect.value ? '#4caf50' : '#ccc';
    
    // Terceiro step verde apenas se modelo selecionado
    steps[2].style.backgroundColor = modelSelect.value ? '#4caf50' : '#ccc';
}
// Update model search button state
function updateSearchButtonState() {
    const isComplete = brandSelect.value && modelSelect.value && yearSelect.value;
    searchButtonModel.disabled = !isComplete;
    searchButtonModel.style.backgroundColor = isComplete ? "#003aab" : "#a0c4ff";
    searchButtonModel.style.cursor = isComplete ? "pointer" : "not-allowed";
}

// Update search layout based on vehicle type
function updateSearchLayout() {
    const promoSlider = document.querySelector('.promo-slider');
    const promoContent = document.querySelectorAll('.promo-content');

    // Reset form fields
    licenseInput.value = "";
    brandSelect.value = "";
    modelSelect.value = "";
    yearSelect.value = "";
    modelSelect.disabled = true;
    yearSelect.disabled = true;

    if (currentType === "motorcycle" || currentType === "truck") {
        licensePlateSection.style.display = "none";
        document.querySelector(".search-subtitle").textContent = 
            `Selecionar o modelo da ${currentType === "motorcycle" ? "moto" : "camião"} para procurar peças`;
        document.getElementById("car-brand").options[0].text = 
            `Selecione uma marca de ${currentType === "motorcycle" ? "moto" : "camião"}`;
        document.getElementById("car-model").options[0].text = 
            `Selecione um modelo de ${currentType === "motorcycle" ? "moto" : "camião"}`;
        modelSearchSection.style.width = "100%";
        promoContent.forEach(content => {
            content.style.transform = "translateY(-20px)";
        });
        promoSlider.style.height = "280px";
    } else {
        licensePlateSection.style.display = "flex";
        document.querySelector(".search-subtitle").textContent = 
            "Selecionar o modelo do carro para procurar peças para automóveis";
        document.getElementById("car-brand").options[0].text = "Selecione uma marca";
        document.getElementById("car-model").options[0].text = "Selecione um modelo";
        modelSearchSection.style.width = "";
        promoContent.forEach(content => {
            content.style.transform = "translateY(0)";
        });
        promoSlider.style.height = "410px";
    }

    // Populate brands for the selected type
    populateBrands(currentType);
    updateStepIndicators();
    updateSearchButtonState();
}

// Custom dropdown functionality
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-options');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function selectOption(value, iconSrc) {
    currentType = value;
    document.getElementById('vehicleType').value = value;
    document.getElementById('selected-icon').src = iconSrc;
    document.getElementById('selected-text').textContent = value.charAt(0).toUpperCase() + value.slice(1);
    document.getElementById('dropdown-options').style.display = 'none';
    
    updateDropdownOptions(value);
    updateSearchLayout();
}

function updateDropdownOptions(selectedType) {
    const dropdownOptions = document.getElementById('dropdown-options');
    dropdownOptions.innerHTML = '';
    
    const availableTypes = {
        'car': [
            {value: 'motorcycle', icon: 'assets/motorcycle.svg', label: 'Motorcycle'},
            {value: 'truck', icon: 'assets/truck.svg', label: 'Truck'}
        ],
        'motorcycle': [
            {value: 'car', icon: 'assets/car.svg', label: 'Car'},
            {value: 'truck', icon: 'assets/truck.svg', label: 'Truck'}
        ],
        'truck': [
            {value: 'car', icon: 'assets/car.svg', label: 'Car'},
            {value: 'motorcycle', icon: 'assets/motorcycle.svg', label: 'Motorcycle'}
        ]
    };
    
    availableTypes[selectedType].forEach(type => {
        const option = document.createElement('div');
        option.className = 'option';
        option.onclick = () => selectOption(type.value, type.icon);
        option.innerHTML = `
            <img src="${type.icon}" alt="${type.label}" class="vehicle-icon">
            <span>${type.label}</span>
        `;
        dropdownOptions.appendChild(option);
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.custom-dropdown');
    if (!dropdown.contains(e.target)) {
        document.getElementById('dropdown-options').style.display = 'none';
    }
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.promo-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    const slideInterval = 4000;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[n].classList.add('active');
        dots[n].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    setInterval(nextSlide, slideInterval);
    showSlide(currentSlide);
});

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

// Update cart popup
function updateCartPopup() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update cart total in header
    cartTotalElement.textContent = `${cartTotal.toFixed(2)}€`;
    
    // Update popup content
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

// Listen for updates
document.addEventListener('cartUpdated', updateNotificationBadges);
document.addEventListener('garageUpdated', updateNotificationBadges);
document.addEventListener('appointmentsUpdated', updateNotificationBadges);
document.addEventListener('cartUpdated', function() {
    updateNotificationBadges();
    updateCartPopup();
});

// Initialize the page
initializePage();


// Cart icon hover functionality
const cartIcon = document.getElementById('cart-icon-container');
const cartPopup = cartIconContainer.querySelector('.cart-popup');

let hideTimeout;

cartIconContainer.addEventListener('mouseenter', () => {
  clearTimeout(hideTimeout);
  cartPopup.style.display = 'block';
});

cartIconContainer.addEventListener('mouseleave', (e) => {
  hideTimeout = setTimeout(() => {
    if (!cartPopup.contains(e.relatedTarget)) {
      cartPopup.style.display = 'none';
    }
  }, 200);
});

cartPopup.addEventListener('mouseenter', () => {
  clearTimeout(hideTimeout);
  cartPopup.style.display = 'block';
});

cartPopup.addEventListener('mouseleave', (e) => {
  hideTimeout = setTimeout(() => {
    if (!cartIconContainer.contains(e.relatedTarget)) {
      cartPopup.style.display = 'none';
    }
  }, 200);
});


// change quantity products
function changeQuantity(index, delta) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems[index].quantity += delta;
  
    // Remover se quantidade for 0 ou menos
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
  


