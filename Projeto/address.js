document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const headerIcon = document.querySelector('.header-icon');
    
    // Address elements
    const addressText = document.getElementById('address-text');
    const nifText = document.getElementById('nif-text');
    const phoneText = document.getElementById('phone-text');
    const editButton = document.getElementById('edit-button');
    const removeButton = document.getElementById('remove-button');
    
    // State
    let isEditing = false;
    
    // Initialize
    setupEventListeners();
    loadAddressData();
    updateNotificationBadges(); // Adicionado
    
    // Functions
    function setupEventListeners() {
        // Sidebar toggle
        sidebarToggle.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Address management
        editButton.addEventListener('click', toggleEditMode);
        removeButton.addEventListener('click', removeAddressData);
        
        window.addEventListener('resize', handleResize);
    }
    
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
        sidebarOverlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    }
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
        sidebarOverlay.style.display = 'none';
    }
    
    function handleResize() {
        if (window.innerWidth > 992) {
            closeSidebar();
        }
        
        if (headerIcon) {
            headerIcon.style.display = window.innerWidth <= 992 ? 'block' : 'none';
        }
    }
    
    function loadAddressData() {
        const savedAddress = localStorage.getItem('address');
        const savedNif = localStorage.getItem('nif');
        const savedPhone = localStorage.getItem('phone');
        
        addressText.textContent = savedAddress || 'Not specified';
        nifText.textContent = savedNif || 'Not specified';
        phoneText.textContent = savedPhone || 'Not specified';
    }
    
    function toggleEditMode() {
        if (isEditing) {
            // Save changes
            const addressInput = addressText.querySelector('input');
            const nifInput = nifText.querySelector('input');
            const phoneInput = phoneText.querySelector('input');
            
            const newAddress = addressInput.value.trim();
            const newNif = nifInput.value.trim();
            const newPhone = phoneInput.value.trim();
            
            localStorage.setItem('address', newAddress);
            localStorage.setItem('nif', newNif);
            localStorage.setItem('phone', newPhone);
            
            // Update display
            addressText.innerHTML = newAddress || 'Not specified';
            nifText.innerHTML = newNif || 'Not specified';
            phoneText.innerHTML = newPhone || 'Not specified';
            
            editButton.textContent = 'Edit Address';
            removeButton.style.display = 'block';
        } else {
            // Enter edit mode
            const currentAddress = addressText.textContent;
            const currentNif = nifText.textContent;
            const currentPhone = phoneText.textContent;
            
            addressText.innerHTML = `<input type="text" value="${currentAddress !== 'Not specified' ? currentAddress : ''}">`;
            nifText.innerHTML = `<input type="text" value="${currentNif !== 'Not specified' ? currentNif : ''}">`;
            phoneText.innerHTML = `<input type="tel" value="${currentPhone !== 'Not specified' ? currentPhone : ''}">`;
            
            editButton.textContent = 'Save Changes';
            removeButton.style.display = 'none';
        }
        
        isEditing = !isEditing;
    }
    
    function removeAddressData() {
        if (confirm('Are you sure you want to remove your address data?')) {
            localStorage.removeItem('address');
            localStorage.removeItem('nif');
            localStorage.removeItem('phone');
            loadAddressData();
            updateNotificationBadges(); // Atualiza notificações após remoção
        }
    }

    // Função para atualizar os badges de notificação
    function updateNotificationBadges() {
        // Atualiza notificações de appointments
        const appointments = JSON.parse(localStorage.getItem('calendarEvents')) || [];
        const appointBadge = document.querySelector('.notification-badge-appoint');
        if (appointBadge) {
            appointBadge.textContent = appointments.length;
            appointBadge.style.display = appointments.length > 0 ? 'inline-block' : 'none';
        }

        // Atualiza notificações de garage
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        const garageBadge = document.querySelector('.notification-badge-garage, .notification-badge');
        if (garageBadge) {
            garageBadge.textContent = vehicles.length;
            garageBadge.style.display = vehicles.length > 0 ? 'inline-block' : 'none';
        }
    }
});