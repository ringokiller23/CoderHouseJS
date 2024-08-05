document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTitle = document.getElementById('loginTitle');
    const registerTitle = document.getElementById('registerTitle');
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');

    showLoginForm();

    registerLink.addEventListener('click', function (e) {
        e.preventDefault();
        showRegisterForm();
    });

    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        showLoginForm();
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (validateUser(email, password)) {
            const sessionToken = generateSessionToken();
            localStorage.setItem('sessionToken', sessionToken);
            window.location.href = '/user/userHome.html'
        } else {
            alert('Correo electrónico o contraseña incorrectos');
        }
    });

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('newEmail').value;
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        if (registerUser(email, password)) {
            alert('Cuenta creada exitosamente');
            showLoginForm();
        } else {
            alert('El correo electrónico ya está registrado');
        }
    });

    function showLoginForm() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginTitle.style.display = 'block';
        registerTitle.style.display = 'none';
    }

    function showRegisterForm() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        loginTitle.style.display = 'none';
        registerTitle.style.display = 'block';
    }

    function validateUser(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.email === email && user.password === password);
    }

    function registerUser(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.email === email)) {
            return false; 
        }

        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    function generateSessionToken() {
        return Math.random().toString(36).substr(2); 
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('sessionToken');

    if (token) {
        const loginNavItem = document.getElementById('login-item');
        if (loginNavItem) {
            loginNavItem.style.display = 'none';
        }
    }
});

