document.addEventListener("DOMContentLoaded", function() {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    const authLink = document.getElementById('auth-link');
    const authText = document.getElementById('auth-text');
    const authIcon = document.getElementById('auth-icon-img');
    const logoBox = document.querySelector('.logo-box');

    if (currentUser) {
        authText.textContent = "Profile";
        authLink.href = "profile.html";
        authIcon.src = "assets/profile.png";
        authIcon.alt = "Profile";
    } else {
        authText.textContent = "Sign In";
        authLink.href = "login.html";
        authIcon.src = "assets/profile.png"; 
        authIcon.alt = "Sign In";
    }

    logoBox.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'home.html';
    });

    updateStepIndicators();
});

const licenseInput = document.getElementById("license-plate");

licenseInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/-/g, ""); // Remove existing dashes
    value = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase(); // Allow only alphanumeric characters

    if (value.length > 2) value = value.slice(0, 2) + "-" + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5);
    if (value.length > 8) value = value.slice(0, 8); 

    e.target.value = value;
});

const searchButtonPlate = document.querySelector(".search-button-plate");

function updateLicensePlateButtonState() {
    if (licenseInput.value.length === 8) { // Ensure the license plate is fully filled
        searchButtonPlate.disabled = false;
        searchButtonPlate.style.backgroundColor = "#003aab"; // Original color
        searchButtonPlate.style.cursor = "pointer";
    } else {
        searchButtonPlate.disabled = true;
        searchButtonPlate.style.backgroundColor = "#a0c4ff"; // Light blue color
        searchButtonPlate.style.cursor = "not-allowed";
    }
}

// Add event listener to update the button state when the license plate field changes
licenseInput.addEventListener("input", updateLicensePlateButtonState);

// Ensure the button state is updated on page load
document.addEventListener("DOMContentLoaded", function () {
    updateLicensePlateButtonState();
});

const brandSelect = document.getElementById('car-brand');
const modelSelect = document.getElementById('car-model');
const yearSelect = document.getElementById('car-year');

// Initially disable model and year dropdowns
modelSelect.disabled = true;
yearSelect.disabled = true;

// Enable model dropdown when a brand is selected
brandSelect.addEventListener('change', function () {
    modelSelect.disabled = this.value === ''; // Enable model dropdown if brand is selected
    if (this.value === '') {
        modelSelect.value = ''; // Reset model dropdown
        yearSelect.disabled = true; // Disable year dropdown
        yearSelect.value = ''; // Reset year dropdown
    }
    updateStepIndicators(); // Update step indicators
});

// Enable year dropdown when a model is selected
modelSelect.addEventListener('change', function () {
    yearSelect.disabled = this.value === ''; // Enable year dropdown if model is selected
    if (this.value === '') {
        yearSelect.value = ''; // Reset year dropdown
    }
    updateStepIndicators(); // Update step indicators
});

function updateStepIndicators() {
    const steps = document.querySelectorAll('.step-number');
    steps[0].style.backgroundColor = '#4caf50'; // First step is always green
    steps[1].style.backgroundColor = brandSelect.value ? '#4caf50' : '#ccc'; // Update model step
    steps[2].style.backgroundColor = modelSelect.value ? '#4caf50' : '#ccc'; // Update year step
}

// Call updateStepIndicators on page load to ensure the first step is green
document.addEventListener("DOMContentLoaded", function () {
    updateStepIndicators();
});

const typeSelect = document.getElementById("type");
const licensePlateSection = document.querySelector(".search-plate");
const modelSearchSection = document.getElementById("model-search-section");
const searchButtonModel = document.querySelector(".search-button-model");

function updateSearchButtonState() {
    if (brandSelect.value && modelSelect.value && yearSelect.value) {
        searchButtonModel.disabled = false;
        searchButtonModel.style.backgroundColor = "#003aab"; // Original color
        searchButtonModel.style.cursor = "pointer";
    } else {
        searchButtonModel.disabled = true;
        searchButtonModel.style.backgroundColor = "#a0c4ff"; // Light blue color
        searchButtonModel.style.cursor = "not-allowed";
    }
}

// Add event listeners to update the button state when fields change
brandSelect.addEventListener("change", updateSearchButtonState);
modelSelect.addEventListener("change", updateSearchButtonState);
yearSelect.addEventListener("change", updateSearchButtonState);

// Ensure the button state is updated on page load
document.addEventListener("DOMContentLoaded", function () {
    updateSearchButtonState();
});

// Função para atualizar o layout
function updateSearchLayout() {
    const selectedType = typeSelect.value;
    const promoSlider = document.querySelector('.promo-slider');
    const promoContent = document.querySelectorAll('.promo-content');

    // Reset all fields
    licenseInput.value = "";
    brandSelect.value = "";
    modelSelect.value = "";
    yearSelect.value = "";
    modelSelect.disabled = true;
    yearSelect.disabled = true;

    // Reset step indicator colors
    const steps = document.querySelectorAll('.step-number');
    steps.forEach(step => {
        step.style.backgroundColor = '#ccc'; // Reset to default color
    });

    // Reset search button state
    updateSearchButtonState();

    if (selectedType === "motorcycle" || selectedType === "truck") {
        // Esconder pesquisa por matrícula
        licensePlateSection.style.display = "none";
        
        // Ajustar textos para moto/camião
        document.querySelector(".search-subtitle").textContent = 
            `Selecionar o modelo da ${selectedType === "motorcycle" ? "moto" : "camião"} para procurar peças`;
        
        // Atualizar placeholders
        document.getElementById("car-brand").options[0].text = 
            `Selecione uma marca de ${selectedType === "motorcycle" ? "moto" : "camião"}`;
        document.getElementById("car-model").options[0].text = 
            `Selecione um modelo de ${selectedType === "motorcycle" ? "moto" : "camião"}`;
        
        // Expandir seção de modelo
        modelSearchSection.style.width = "100%";

        // Move promo-content upwards
        promoContent.forEach(content => {
            content.style.transform = "translateY(-20px)";
        });

        // Reduce slider height
        promoSlider.style.height = "280px"; // Original height (410px) - 100px
    } else {
        // Mostrar pesquisa por matrícula
        licensePlateSection.style.display = "flex";
        
        // Restaurar textos originais
        document.querySelector(".search-subtitle").textContent = 
            "Selecionar o modelo do carro para procurar peças para automóveis";
        
        document.getElementById("car-brand").options[0].text = "Selecione uma marca";
        document.getElementById("car-model").options[0].text = "Selecione um modelo";
        
        // Restaurar largura original
        modelSearchSection.style.width = "";

        // Reset promo-content position
        promoContent.forEach(content => {
            content.style.transform = "translateY(0)";
        });

        // Restore slider height
        promoSlider.style.height = "410px"; // Original height
    }

    // Ensure the first step is green by default
    steps[0].style.backgroundColor = '#4caf50';
}

// Adicionar listener para mudanças no tipo de veículo
typeSelect.addEventListener("change", function () {
    updateSearchLayout();
    updateSearchButtonState();
});

// Chamar a função no carregamento
document.addEventListener("DOMContentLoaded", function() {
    updateSearchLayout();
});






// slide ao lado do search


document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.promo-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    const slideInterval = 4000; // 4 segundos
    
    // Função para mostrar slide
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Função para próximo slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Função para slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Adiciona clique nos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-rotacionar slides
    let slideTimer = setInterval(nextSlide, slideInterval);
    
    // Pausar quando mouse estiver sobre o slider
    const slider = document.querySelector('.promo-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideTimer = setInterval(nextSlide, slideInterval);
    });
    
    // Mostrar primeiro slide
    showSlide(0);
});
