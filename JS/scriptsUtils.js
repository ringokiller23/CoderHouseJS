document.addEventListener('DOMContentLoaded', () => {
    const carritoLink = document.getElementById('carrito-link');

    carritoLink.addEventListener('click', (event) => {
        const token = localStorage.getItem('sessionToken');

        if (!token) {
            event.preventDefault();
            window.location.href = '../login.html';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const destinosLink = document.getElementById('destinos-link');

    destinosLink.addEventListener('click', (event) => {
        const token = localStorage.getItem('sessionToken');

        if (token) {
            event.preventDefault();
            window.location.href = '/user/userDestinos.html';
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const submitBtn = document.getElementById("submitBtn");

    if (submitBtn) {
        submitBtn.onclick = function(event) {
            event.preventDefault();  

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            const mailtoLink = `mailto:contacto@agenciadeviajes.com?subject=Mensaje de ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;

            window.location.href = mailtoLink;
        };
    }
});