let currentType = '';
let currentEditType = '';

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

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const elements = {
        addVehicleBtn: document.getElementById('add-vehicle-btn'),
        addFirstVehicleBtn: document.getElementById('add-first-vehicle-btn'),
        vehiclesContainer: document.getElementById('vehicles-container'),
        emptyGarage: document.getElementById('empty-garage'),
        vehiclePopup: document.getElementById('add-modal'),
        editVehicleModal: document.getElementById('edit-vehicle-modal'),
        closePopup: document.querySelector('.close-modal'),
        closeEditPopup: document.querySelector('.close-edit-modal'),
        vehicleForm: document.getElementById('vehicle-form'),
        editVehicleForm: document.getElementById('edit-vehicle-form'),
        plateInput: document.getElementById('plate'),
        vehicleType: document.getElementById('vehicle-type'),
        brandSelect: document.getElementById('brand'),
        modelSelect: document.getElementById('model'),
        yearInput: document.getElementById('year'),
        sidebar: document.querySelector('.sidebar'),
        sidebarToggle: document.querySelector('.sidebar-toggle'),
        sidebarOverlay: document.querySelector('.sidebar-overlay'),
        headerIcon: document.querySelector('.header-icon'),
        cartIconContainer: document.getElementById('cart-icon-container')
    };

    // Constantes
    const VIN_LENGTH = 17;

    // Verificar se o usuário está logado
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Inicialização
    initEventListeners();
    loadGarage();
    setupResponsiveLayout();
    setupCart();
    updateCartPopup();
    loadUserProfile();
    updateNotificationBadges();

    // Ouvintes para atualizações
    document.addEventListener('garageUpdated', loadGarage);
    document.addEventListener('garageUpdated', updateNotificationBadges);
    document.addEventListener('cartUpdated', updateNotificationBadges);
    document.addEventListener('cartUpdated', updateCartPopup);
    document.addEventListener('wishlistUpdated', updateNotificationBadges);
    document.addEventListener('appointmentsUpdated', updateNotificationBadges);

    /**
     * Inicializa todos os event listeners
     */
    function initEventListeners() {
        // Botões de adicionar veículo
        if (elements.addVehicleBtn) elements.addVehicleBtn.addEventListener('click', showAddModal);
        if (elements.addFirstVehicleBtn) elements.addFirstVehicleBtn.addEventListener('click', showAddModal);

        // Fechar popups
        if (elements.closePopup) elements.closePopup.addEventListener('click', () => elements.vehiclePopup.style.display = 'none');
        if (elements.closeEditPopup) elements.closeEditPopup.addEventListener('click', () => elements.editVehicleModal.style.display = 'none');

        // Formatar placa em maiúsculas
        if (elements.plateInput) elements.plateInput.addEventListener('input', () => {
            elements.plateInput.value = elements.plateInput.value.toUpperCase();
        });

        // Formulários
        if (elements.vehicleForm) elements.vehicleForm.addEventListener('submit', handleVehicleSubmit);
        if (elements.editVehicleForm) elements.editVehicleForm.addEventListener('submit', handleEditSubmit);

        // Sidebar
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

        // Event listeners para tipo, marca e modelo
        document.getElementById('vehicle-type').addEventListener('change', function() {
            currentType = this.value;
            const brandSelect = document.getElementById('brand');
            brandSelect.innerHTML = '<option value="">Select a brand</option>';
            brandSelect.disabled = !this.value;
            
            if (this.value) {
                const brands = Object.keys(vehicleModels[this.value]);
                brands.forEach(brand => {
                    brandSelect.innerHTML += `<option value="${brand}">${brand}</option>`;
                });
            }
            
            // Resetar modelo
            const modelSelect = document.getElementById('model');
            modelSelect.innerHTML = '<option value="">First select a brand</option>';
            modelSelect.disabled = true;
        });

        document.getElementById('brand').addEventListener('change', function() {
            const modelSelect = document.getElementById('model');
            modelSelect.innerHTML = '<option value="">Select a model</option>';
            modelSelect.disabled = !this.value;
            
            if (this.value && currentType) {
                vehicleModels[currentType][this.value].forEach(model => {
                    modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
                });
            }
        });

        document.getElementById('edit-vehicle-type').addEventListener('change', function() {
            currentEditType = this.value;
            const brandSelect = document.getElementById('edit-vehicle-brand');
            brandSelect.innerHTML = '<option value="">Select a brand</option>';
            brandSelect.disabled = !this.value;
            
            if (this.value) {
                const brands = Object.keys(vehicleModels[this.value]);
                brands.forEach(brand => {
                    brandSelect.innerHTML += `<option value="${brand}">${brand}</option>`;
                });
            }
            
            // Resetar modelo
            const modelSelect = document.getElementById('edit-vehicle-model');
            modelSelect.innerHTML = '<option value="">First select a brand</option>';
            modelSelect.disabled = true;
        });

        document.getElementById('edit-vehicle-brand').addEventListener('change', function() {
            const modelSelect = document.getElementById('edit-vehicle-model');
            modelSelect.innerHTML = '<option value="">Select a model</option>';
            modelSelect.disabled = !this.value;
            
            if (this.value && currentEditType) {
                vehicleModels[currentEditType][this.value].forEach(model => {
                    modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
                });
            }
        });

        // Formatar placa automaticamente
        document.getElementById('plate').addEventListener('input', function(e) {
            formatLicensePlate(e.target);
        });

        document.getElementById('edit-vehicle-plate').addEventListener('input', function(e) {
            formatLicensePlate(e.target);
        });
    }

    /**
     * Configura o carrinho de compras
     */
    function setupCart() {
        if (!elements.cartIconContainer) return;

        const cartPopup = elements.cartIconContainer.querySelector('.cart-popup');
        
        // Comportamento mobile
        function toggleCartPopup(event) {
            if (window.matchMedia("(max-width: 768px)").matches) {
                event.stopPropagation();
                cartPopup.classList.toggle('show');
            }
        }

        elements.cartIconContainer.addEventListener('click', toggleCartPopup);

        // Fechar popup ao clicar fora (mobile)
        document.addEventListener('click', (event) => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                if (!elements.cartIconContainer.contains(event.target)) {
                    cartPopup.classList.remove('show');
                }
            }
        });

        // Prevenir fechar ao clicar dentro
        cartPopup.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        // Resetar popup no resize
        window.addEventListener('resize', () => {
            cartPopup.classList.remove('show');
        });
    }

    /**
     * Atualiza o popup do carrinho
     */
    function updateCartPopup() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Atualizar total no cabeçalho
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) {
            cartTotalElement.textContent = `${cartTotal.toFixed(2)}€`;
        }
        
        // Atualizar conteúdo do popup
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
        
        // Atualizar totais
        const totalPriceElement = document.querySelector('.total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `${cartTotal.toFixed(2)}€`;
        }
        
        // Configurar event listeners para os novos botões
        setupCartEventListeners();
    }

    /**
     * Configura os event listeners do carrinho
     */
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
     * Altera a quantidade de um item no carrinho
     */
    function changeQuantity(index, delta) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems[index]) {
            cartItems[index].quantity += delta;
            
            // Remove se quantidade for 0 ou menos
            if (cartItems[index].quantity <= 0) {
                cartItems.splice(index, 1);
            }
            
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            document.dispatchEvent(new CustomEvent('cartUpdated'));
        }
    }

    /**
     * Remove um item do carrinho
     */
    function removeFromCart(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems[index]) {
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            document.dispatchEvent(new CustomEvent('cartUpdated'));
        }
    }

    /**
     * Carrega os dados do perfil do usuário
     */
    function loadUserProfile() {
        const authText = document.getElementById('auth-text');
        const authIcon = document.getElementById('header-profile-img');
        const authIconBig = document.getElementById('profile-avatar');
        const emailValue = document.getElementById('email-value');

        if (currentUser) {
            authText.textContent = currentUser.name || "user1234";
            emailValue.textContent = currentUser.email;
            authIcon.src = currentUser.avatar || "assets/profile.svg";
            authIconBig.src = currentUser.avatar || "assets/profile.svg";
            authIcon.alt = currentUser.name || "user1234";
        } else {
            authText.textContent = "Sign In";
            authIcon.src = "assets/profile.svg"; 
            authIcon.alt = "Sign In";
        }
    }

    /**
     * Atualiza todos os badges de notificação
     */
    function updateNotificationBadges() {
        // Cart badge
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartBadge = document.querySelector('.notification-badge-cart');
        if (cartBadge) {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // Wishlist badge
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const wishlistBadge = document.querySelector('.notification-badge-wishlist');
        if (wishlistBadge) {
            wishlistBadge.textContent = wishlist.length;
            wishlistBadge.style.display = wishlist.length > 0 ? 'inline-block' : 'none';
        }

        // Appointments badge
        const appointments = JSON.parse(localStorage.getItem('calendarEvents')) || [];
        const appointBadge = document.querySelector('.notification-badge-appoint');
        if (appointBadge) {
            appointBadge.textContent = appointments.length;
            appointBadge.style.display = appointments.length > 0 ? 'inline-block' : 'none';
        }

        // Garage badge
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        const garageBadge = document.querySelector('.notification-badge-garage');
        if (garageBadge) {
            garageBadge.textContent = vehicles.length;
            garageBadge.style.display = vehicles.length > 0 ? 'inline-block' : 'none';
        }
    }

    /**
     * Manipula o envio do formulário de adição de veículo
     */
    function handleVehicleSubmit(event) {
        event.preventDefault();
        
        const plate = document.getElementById('plate').value.toUpperCase();
        const type = document.getElementById('vehicle-type').value;
        const brand = document.getElementById('brand').value;
        const model = document.getElementById('model').value;
        const year = document.getElementById('year').value;
        
        // Validação dos campos
        if (!plate || !type || !brand || !model || !year) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        if (checkPlateExistence(plate)) {
            alert('Já existe um veículo com esta matrícula!');
            return;
        }

        const vin = generateRandomVIN();
        const newVehicle = { plate, type, brand, model, year, vin };
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        vehicles.push(newVehicle);
        
        localStorage.setItem('garage', JSON.stringify(vehicles));
        document.dispatchEvent(new CustomEvent('garageUpdated'));
        
        document.getElementById('add-modal').style.display = 'none';
        document.getElementById('vehicle-form').reset();
    }

    /**
     * Manipula o envio do formulário de edição de veículo
     */
    function handleEditSubmit(event) {
        event.preventDefault();
        
        const index = document.getElementById('edit-vehicle-index').value;
        const plate = document.getElementById('edit-vehicle-plate').value.toUpperCase();
        const type = document.getElementById('edit-vehicle-type').value;
        const brand = document.getElementById('edit-vehicle-brand').value;
        const model = document.getElementById('edit-vehicle-model').value;
        const year = document.getElementById('edit-vehicle-year').value;
        
        // Validação dos campos
        if (!plate || !type || !brand || !model || !year) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        // Mantém o VIN existente
        const vin = vehicles[index]?.vin || generateRandomVIN();
        
        vehicles[index] = { plate, type, brand, model, year, vin };
        localStorage.setItem('garage', JSON.stringify(vehicles));
        document.dispatchEvent(new CustomEvent('garageUpdated'));
        document.getElementById('edit-vehicle-modal').style.display = 'none';
    }

    /**
     * Carrega a garagem do localStorage
     */
    function loadGarage() {
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        
        if (vehicles.length > 0) {
            elements.vehiclesContainer.style.display = 'grid';
            elements.emptyGarage.style.display = 'none';
            if (elements.addVehicleBtn) elements.addVehicleBtn.style.display = 'flex';
            
            elements.vehiclesContainer.innerHTML = '';
            vehicles.forEach((vehicle, index) => {
                const card = createVehicleCard(vehicle, index);
                elements.vehiclesContainer.appendChild(card);
            });
        } else {
            elements.vehiclesContainer.style.display = 'none';
            elements.emptyGarage.style.display = 'flex';
            if (elements.addVehicleBtn) elements.addVehicleBtn.style.display = 'none';
        }
    }

    /**
     * Cria um card de veículo
     */
    function createVehicleCard(vehicle, index) {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.innerHTML = `
            <div class="vehicle-header">
                <h3 class="vehicle-title">${vehicle.brand} ${vehicle.model}</h3>
                <div class="vehicle-actions">
                    <button class="action-btn edit-btn">Edit</button>
                    <button class="action-btn delete-btn">Delete</button>
                </div>
            </div>
            <div class="vehicle-details">
                <div class="detail-item">
                    <span class="detail-label">Type</span>
                    <span class="detail-value">${vehicle.type}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Plate</span>
                    <span class="detail-value">${vehicle.plate}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Year</span>
                    <span class="detail-value">${formatDate(vehicle.year)}</span>
                </div>
            </div>
            <button class="parts-btn">Compatible Parts</button>
        `;
        
        card.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            editVehicle(index);
        });
        
        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation(); 
            deleteVehicle(index);
        });
        
        return card;
    }

    /**
     * Mostra o modal de adição de veículo
     */
    function showAddModal() {
        if (elements.vehicleForm) elements.vehicleForm.reset();
        if (elements.vehiclePopup) elements.vehiclePopup.style.display = 'flex';
    }

    /**
     * Alterna a visibilidade da sidebar
     */
    function toggleSidebar(e) {
        e.stopPropagation();
        elements.sidebar.classList.toggle('active');
        elements.sidebarToggle.classList.toggle('active');
        elements.sidebarOverlay.style.display = elements.sidebar.classList.contains('active') ? 'block' : 'none';
    }

    /**
     * Fecha a sidebar
     */
    function closeSidebar() {
        elements.sidebar.classList.remove('active');
        elements.sidebarToggle.classList.remove('active');
        elements.sidebarOverlay.style.display = 'none';
    }

    /**
     * Configura o layout responsivo
     */
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

    /**
     * Gera um VIN aleatório
     */
    function generateRandomVIN() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let vin = '';
        for (let i = 0; i < VIN_LENGTH; i++) {
            vin += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return vin;
    }

    /**
     * Verifica se uma placa já existe na garagem
     */
    function checkPlateExistence(plate, currentIndex = -1) {
        // Verifica se o formato está correto (00-00-XX)
        const plateRegex = /^[0-9]{2}-[0-9]{2}-[A-Za-z]{2}$/;
        if (!plateRegex.test(plate)) {
            alert('Formato de matrícula inválido! Use 00-00-XX');
            return true; // Impede o envio
        }
        
        // Verifica se já existe
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        return vehicles.some((vehicle, index) => 
            index !== currentIndex && 
            vehicle.plate.toLowerCase() === plate.toLowerCase()
        );
    }

    /**
     * Formata uma data
     */
    function formatDate(dateString) {
        if (!dateString) return '';
        if (dateString.length === 8 && !dateString.includes('-')) {
            return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}`;
        }
        return dateString;
    }
});

/**
 * Formata uma placa de veículo automaticamente
 */
function formatLicensePlate(input) {
    let value = input.value.replace(/-/g, "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (value.length > 2) value = value.slice(0, 2) + "-" + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5);
    input.value = value.slice(0, 8);
}

/**
 * Edita um veículo
 */
window.editVehicle = function(index) {
    const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
    const vehicle = vehicles[index];
    
    document.getElementById('edit-vehicle-index').value = index;
    document.getElementById('edit-vehicle-plate').value = vehicle.plate;
    
    // Configura o tipo
    const typeSelect = document.getElementById('edit-vehicle-type');
    typeSelect.value = vehicle.type;
    
    // Dispara o evento change para carregar as marcas
    const typeEvent = new Event('change');
    typeSelect.dispatchEvent(typeEvent);
    
    // Configura a marca (com pequeno delay para garantir que as opções foram carregadas)
    setTimeout(() => {
        const brandSelect = document.getElementById('edit-vehicle-brand');
        brandSelect.value = vehicle.brand;
        
        // Dispara o evento change para carregar os modelos
        const brandEvent = new Event('change');
        brandSelect.dispatchEvent(brandEvent);
        
        // Configura o modelo
        setTimeout(() => {
            const modelSelect = document.getElementById('edit-vehicle-model');
            modelSelect.value = vehicle.model;
        }, 50);
    }, 50);
    
    document.getElementById('edit-vehicle-year').value = vehicle.year;
    document.getElementById('edit-vehicle-modal').style.display = 'flex';
};

/**
 * Remove um veículo
 */
window.deleteVehicle = function(index) {
    const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
    vehicles.splice(index, 1);
    localStorage.setItem('garage', JSON.stringify(vehicles));
    document.dispatchEvent(new CustomEvent('garageUpdated'));
};