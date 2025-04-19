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

window.onload = function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const { usernameValue, passwordValue, emailValue, phoneValue } = getPersonalDataElements();

    if (currentUser) {
        document.querySelector('.user-name').textContent = currentUser.name;
        document.querySelector('.user-email').textContent = currentUser.email;
        
        usernameValue.textContent = currentUser.name;
        passwordValue.textContent = currentUser.password;
        emailValue.textContent = currentUser.email;
        phoneValue.textContent = currentUser.phone || 'Not provided';
    } else {
        window.location.href = 'login.html';
    }
}

function editPersonalData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const { usernameValue, passwordValue, emailValue, phoneValue } = getPersonalDataElements();

    usernameValue.innerHTML = `<input type="text" value="${currentUser.name}">`;
    passwordValue.innerHTML = `<input type="password" value="${currentUser.password}">`;
    emailValue.innerHTML = `<input type="email" value="${currentUser.email}">`;
    phoneValue.innerHTML = `<input type="tel" value="${currentUser.phone || ''}">`;

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
    passwordValue.textContent = currentUser.password;
    emailValue.textContent = currentUser.email;
    phoneValue.textContent = currentUser.phone || 'Not provided';

    const editButton = document.querySelector('.edit-button');
    editButton.textContent = 'Edit Personal Data';
    editButton.onclick = editPersonalData;
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}