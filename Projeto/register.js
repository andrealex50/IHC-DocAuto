document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let users = JSON.parse(localStorage.getItem('logins')) || [];
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repeatPassword = document.getElementById('repeat-password').value;

    if (password !== repeatPassword) {
        alert('Passwords do not match!');
        return;
    }

    for (let user of users) {
        if (user.email === email) {
            alert('Email already registered!');
            return;
        }
    }

    users.push({
        name: username,
        email: email,
        password: password,
        isAdministrator: false,
        isDistributor: false
    });

    localStorage.setItem('logins', JSON.stringify(users));
    alert('Registration successful!');
    window.location.href = 'login.html';
});


function togglePasswordVisibility(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const eyeOpen = document.getElementById(`eyeOpen-${fieldId}`);
    const eyeClosed = document.getElementById(`eyeClosed-${fieldId}`);

    const isPasswordVisible = passwordInput.type === 'text';

    passwordInput.type = isPasswordVisible ? 'password' : 'text';
    eyeOpen.style.display = isPasswordVisible ? 'inline' : 'none';
    eyeClosed.style.display = isPasswordVisible ? 'none' : 'inline';
}





