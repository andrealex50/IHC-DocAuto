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
});





const licenseInput = document.getElementById("license-plate");

licenseInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    if (value.length > 1) value = value.slice(0, 2) + "-" + value.slice(2);
    if (value.length > 4) value = value.slice(0, 5) + "-" + value.slice(5);
    if (value.length > 8) value = value.slice(0, 8); 

    e.target.value = value;
});


const brandSelect = document.getElementById('car-brand');
const modelSelect = document.getElementById('car-model');
const yearSelect = document.getElementById('car-year');

// Initially disable model and year dropdowns
modelSelect.disabled = true;
yearSelect.disabled = true;

// Enable model dropdown when a brand is selected
brandSelect.addEventListener('change', function () {
    modelSelect.disabled = this.value === ''; // Disable if no brand is selected
    if (this.value === '') {
        modelSelect.value = ''; // Reset model dropdown
        yearSelect.disabled = true; // Disable year dropdown
        yearSelect.value = ''; // Reset year dropdown
    }
});

// Enable year dropdown when a model is selected
modelSelect.addEventListener('change', function () {
    yearSelect.disabled = this.value === ''; // Disable if no model is selected
    if (this.value === '') {
        yearSelect.value = ''; // Reset year dropdown
    }
});



const typeSelect = document.getElementById("type");
const licenseSearchSection = document.querySelector(".number-search-container");
const vehicleDetailsSection = document.querySelector(".vehicle-details");
const searchWrapper = document.querySelector(".search-wrapper");
const dropdowns = document.querySelectorAll(".form-select");

function updateSearchLayout() {
    const selectedType = typeSelect.value;

    // Reset dropdown values
    dropdowns.forEach(dropdown => {
        dropdown.value = "";
    });

    // Reset dropdown states
    modelSelect.disabled = true;
    yearSelect.disabled = true;

    // Remove forced styles
    vehicleDetailsSection.classList.remove('row-mode');

    if (selectedType === "motorcycle" || selectedType === "truck") {
        licenseSearchSection.style.display = "none";
        vehicleDetailsSection.style.display = "flex";
        vehicleDetailsSection.classList.add('row-mode');
        searchWrapper.style.flexDirection = "column";
        searchWrapper.style.alignItems = "center";

        // Update placeholders for brand, model, and year dropdowns
        brandSelect.options[0].text = `Select ${selectedType} brand`;
        modelSelect.options[0].text = `Select ${selectedType} model`;
        yearSelect.options[0].text = `Select ${selectedType} year`;
    } else {
        licenseSearchSection.style.display = "flex";
        vehicleDetailsSection.style.display = "flex";
        searchWrapper.style.flexDirection = "row";
        searchWrapper.style.alignItems = "flex-start";

        // Reset placeholders for brand, model, and year dropdowns
        brandSelect.options[0].text = "Select car brand";
        modelSelect.options[0].text = "Select car model";
        yearSelect.options[0].text = "Select car year";
    }
}

typeSelect.addEventListener("change", updateSearchLayout);

// Call once on load
updateSearchLayout();


