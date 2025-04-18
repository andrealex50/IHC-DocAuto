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





// Handle license plate input formatting
const licenseInput = document.getElementById("license-plate");

licenseInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/-/g, "");
    value = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    if (value.length > 2) value = value.slice(0, 2) + "-" + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5);
    if (value.length > 8) value = value.slice(0, 8);

    e.target.value = value;
});



// Update license plate button state
const searchButtonPlate = document.querySelector(".search-button-plate");

function updateLicensePlateButtonState() {
    if (licenseInput.value.length === 8) {
        searchButtonPlate.disabled = false;
        searchButtonPlate.style.backgroundColor = "#003aab";
        searchButtonPlate.style.cursor = "pointer";
    } else {
        searchButtonPlate.disabled = true;
        searchButtonPlate.style.backgroundColor = "#a0c4ff";
        searchButtonPlate.style.cursor = "not-allowed";
    }
}

licenseInput.addEventListener("input", updateLicensePlateButtonState);

document.addEventListener("DOMContentLoaded", function () {
    updateLicensePlateButtonState();
});




// Handle dropdown interactions for car brand, model, and year
const brandSelect = document.getElementById('car-brand');
const modelSelect = document.getElementById('car-model');
const yearSelect = document.getElementById('car-year');

modelSelect.disabled = true;
yearSelect.disabled = true;

brandSelect.addEventListener('change', function () {
    modelSelect.disabled = this.value === '';
    if (this.value === '') {
        modelSelect.value = '';
        yearSelect.disabled = true;
        yearSelect.value = '';
    }
    updateStepIndicators();
});

modelSelect.addEventListener('change', function () {
    yearSelect.disabled = this.value === '';
    if (this.value === '') {
        yearSelect.value = '';
    }
    updateStepIndicators();
});



// Update step indicators
function updateStepIndicators() {
    const steps = document.querySelectorAll('.step-number');
    steps[0].style.backgroundColor = '#4caf50';
    steps[1].style.backgroundColor = brandSelect.value ? '#4caf50' : '#ccc';
    steps[2].style.backgroundColor = modelSelect.value ? '#4caf50' : '#ccc';
}

document.addEventListener("DOMContentLoaded", function () {
    updateStepIndicators();
});




// Handle search layout updates based on vehicle type
const typeSelect = document.getElementById("type");
const licensePlateSection = document.querySelector(".search-plate");
const modelSearchSection = document.getElementById("model-search-section");
const searchButtonModel = document.querySelector(".search-button-model");

function updateSearchButtonState() {
    if (brandSelect.value && modelSelect.value && yearSelect.value) {
        searchButtonModel.disabled = false;
        searchButtonModel.style.backgroundColor = "#003aab";
        searchButtonModel.style.cursor = "pointer";
    } else {
        searchButtonModel.disabled = true;
        searchButtonModel.style.backgroundColor = "#a0c4ff";
        searchButtonModel.style.cursor = "not-allowed";
    }
}

brandSelect.addEventListener("change", updateSearchButtonState);
modelSelect.addEventListener("change", updateSearchButtonState);
yearSelect.addEventListener("change", updateSearchButtonState);

document.addEventListener("DOMContentLoaded", function () {
    updateSearchButtonState();
});

function updateSearchLayout() {
    const selectedType = typeSelect.value;
    const promoSlider = document.querySelector('.promo-slider');
    const promoContent = document.querySelectorAll('.promo-content');

    licenseInput.value = "";
    brandSelect.value = "";
    modelSelect.value = "";
    yearSelect.value = "";
    modelSelect.disabled = true;
    yearSelect.disabled = true;

    const steps = document.querySelectorAll('.step-number');
    steps.forEach(step => {
        step.style.backgroundColor = '#ccc';
    });

    updateSearchButtonState();

    if (selectedType === "motorcycle" || selectedType === "truck") {
        licensePlateSection.style.display = "none";
        document.querySelector(".search-subtitle").textContent = 
            `Selecionar o modelo da ${selectedType === "motorcycle" ? "moto" : "camião"} para procurar peças`;
        document.getElementById("car-brand").options[0].text = 
            `Selecione uma marca de ${selectedType === "motorcycle" ? "moto" : "camião"}`;
        document.getElementById("car-model").options[0].text = 
            `Selecione um modelo de ${selectedType === "motorcycle" ? "moto" : "camião"}`;
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

    steps[0].style.backgroundColor = '#4caf50';
}

typeSelect.addEventListener("change", function () {
    updateSearchLayout();
    updateSearchButtonState();
});

document.addEventListener("DOMContentLoaded", function() {
    updateSearchLayout();
});



// Handle slider functionality
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
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    let slideTimer = setInterval(nextSlide, slideInterval);

    const slider = document.querySelector('.promo-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });

    slider.addEventListener('mouseleave', () => {
        slideTimer = setInterval(nextSlide, slideInterval);
    });

    showSlide(0);
});
