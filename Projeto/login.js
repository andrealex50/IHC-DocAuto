document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let users = JSON.parse(localStorage.getItem('logins')) || [];
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'personal.html';
    } else {
        alert('Invalid email or password!');
    }
});

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeOpen = document.getElementById('eyeOpen');
    const eyeClosed = document.getElementById('eyeClosed');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'inline';
    } else {
        passwordInput.type = 'password';
        eyeOpen.style.display = 'inline';
        eyeClosed.style.display = 'none';
    }
}


