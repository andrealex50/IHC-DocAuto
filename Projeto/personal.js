document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    loadUserData();
    updateNotificationBadges(); // Adicionado
});

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const body = document.body;
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (sidebar.classList.contains('active')) {
        body.classList.add('sidebar-open');
    } else {
        body.classList.remove('sidebar-open');
    }
}

document.querySelector('.sidebar-overlay').addEventListener('click', toggleSidebar);

window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }
});

function getPersonalDataElements() {
    return {
        usernameValue: document.getElementById('username-value'),
        passwordValue: document.getElementById('password-value'),
        emailValue: document.getElementById('email-value'),
        phoneValue: document.getElementById('phone-value')
    };
}

function loadUserData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const { usernameValue, passwordValue, emailValue, phoneValue } = getPersonalDataElements();

    if (currentUser) {
        document.querySelector('.user-name').textContent = currentUser.name;
        document.querySelector('.user-email').textContent = currentUser.email;
        
        usernameValue.textContent = currentUser.name;
        passwordValue.textContent = '••••••••'; // Mostra placeholder para senha
        emailValue.textContent = currentUser.email;
        phoneValue.textContent = currentUser.phone || 'Not provided';
    } else {
        window.location.href = 'login.html';
    }
}

function editPersonalData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const { usernameValue, emailValue, phoneValue } = getPersonalDataElements();
    const passwordField = document.querySelector('.password-field');

    usernameValue.innerHTML = `<input type="text" value="${currentUser.name}">`;
    emailValue.innerHTML = `<input type="email" value="${currentUser.email}">`;
    phoneValue.innerHTML = `<input type="tel" value="${currentUser.phone || ''}">`;
    
    // Atualiza o campo de senha para edição
    passwordField.innerHTML = `
        <input type="password" id="password-value" value="${currentUser.password}">
        <button type="button" class="toggle-password" onclick="toggleProfilePasswordVisibility()">
            <svg id="profileEyeOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
            <svg id="profileEyeClosed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: none;">
                <path d="M17.94 17.94C16.13 19.16 14.11 20 12 20c-7 0-11-8-11-8 1.21-2.15 3-4.09 5.26-5.46M9.88 9.88a3 3 0 104.24 4.24"/>
                <path d="M1 1l22 22"/>
            </svg>
        </button>
    `;

    const editButton = document.querySelector('.edit-button');
    editButton.textContent = 'Save Changes';
    editButton.onclick = savePersonalData;
}

function savePersonalData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const { usernameValue, passwordValue, emailValue, phoneValue } = getPersonalDataElements();

    currentUser.name = usernameValue.querySelector('input').value;
    currentUser.password = passwordValue.querySelector('input').value;
    currentUser.email = emailValue.querySelector('input').value;
    currentUser.phone = phoneValue.querySelector('input').value;

    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

    const users = JSON.parse(localStorage.getItem('logins')) || [];
    const userIndex = users.findIndex(user => user.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('logins', JSON.stringify(users));
    }

    usernameValue.textContent = currentUser.name;
    passwordValue.textContent = '••••••••'; // Volta a mostrar placeholder
    emailValue.textContent = currentUser.email;
    phoneValue.textContent = currentUser.phone || 'Not provided';

    const editButton = document.querySelector('.edit-button');
    editButton.textContent = 'Edit Personal Data';
    editButton.onclick = editPersonalData;

    updateNotificationBadges(); // Atualiza notificações após salvar
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function toggleProfilePasswordVisibility() {
    const passwordInput = document.getElementById('password-value');
    const eyeOpen = document.getElementById('profileEyeOpen');
    const eyeClosed = document.getElementById('profileEyeClosed');
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordInput.value = currentUser.password; // Mostra a senha real
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'inline';
    } else {
        passwordInput.type = 'password';
        passwordInput.value = currentUser.password; // Mantém o valor real mas escondido
        eyeOpen.style.display = 'inline';
        eyeClosed.style.display = 'none';
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