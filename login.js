// Mostrar los formularios y configurar los eventos cuando se cargue el documento
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleAuth = document.getElementById('toggleAuth');

    toggleAuth.addEventListener('click', toggleForms);
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
});

// Función para alternar entre los formularios de Iniciar Sesión y Crear Cuenta
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleAuth = document.getElementById('toggleAuth');

    if (loginForm.classList.contains('d-none')) {
        loginForm.classList.remove('d-none');
        signupForm.classList.add('d-none');
        toggleAuth.textContent = '¿No tienes cuenta? Crear cuenta';
    } else {
        loginForm.classList.add('d-none');
        signupForm.classList.remove('d-none');
        toggleAuth.textContent = '¿Ya tienes cuenta? Iniciar sesión';
    }
}

function handleSignup(event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    Swal.fire({
        icon: 'success',
        title: 'Cuenta creada',
        text: 'Cuenta creada exitosamente. Ahora puedes iniciar sesión.',
    });

    document.getElementById('signupForm').reset();
    toggleForms();
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        const sessionToken = generateSessionToken();
        localStorage.setItem('sessionToken', sessionToken);

        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Redirigiendo...',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'index.html'; 
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Correo o contraseña incorrectos. Intenta de nuevo.',
        });
    }
}

function generateSessionToken() {
    return Math.random().toString(36).substr(2); 
}
