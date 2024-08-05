document.addEventListener('DOMContentLoaded', () => {
    const carritoElement = document.getElementById('carrito');
    const pagarButton = document.getElementById('pagar');

    if (!carritoElement || !pagarButton) {
        return;
    }

    function getCarrito() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    function saveCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function clearCarrito() {
        localStorage.removeItem('carrito');
    }

    function renderCarrito() {
        const carrito = getCarrito();
        carritoElement.innerHTML = '';

        if (carrito.length === 0) {
            carritoElement.innerHTML = '<p>No hay productos en el carrito.</p>';
        } else {
            const list = document.createElement('ul');
            list.className = 'list-group';

            carrito.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.textContent = `Destino: ${item.destino} - Numero de personas: ${item.numPersonas} - Total: ${item.precioTotal} USD`;

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger btn-sm';
                deleteButton.textContent = 'Borrar';
                deleteButton.onclick = () => {
                    carrito.splice(index, 1);
                    saveCarrito(carrito);
                    renderCarrito();
                };

                listItem.appendChild(deleteButton);
                list.appendChild(listItem);
            });

            carritoElement.appendChild(list);
        }
    }

    pagarButton.onclick = () => {
        const carrito = getCarrito();
        if (carrito.length !== 0) {
            clearCarrito();
            renderCarrito();
            alert('Compra realizada con éxito!');
        } else {
            alert('El carrito está vacío');
        }
    };
    
    renderCarrito();
});


function updateUserLink() {
    const userData = localStorage.getItem('users');

    if (userData) {
        const user = JSON.parse(userData);

        const email = user[0].email;

        const userLink = document.getElementById('user');

        userLink.textContent = `Hola ${email}`;
    }
}

document.addEventListener('DOMContentLoaded', updateUserLink);
