

function guardarPaquete(element) {
    const flag = element.getAttribute('data-flag');
    const name = element.getAttribute('data-name');
    const description = element.getAttribute('data-description');
    const image = element.getAttribute('data-image');
  
    localStorage.setItem('packageflag', flag);
    localStorage.setItem('packageName', name);
    localStorage.setItem('packageDescription', description);
    localStorage.setItem('packageImage', image);
  
    window.location.href = '/tours/plantilla.html';
  }
  
  function llenarPlantilla() {
    const name = localStorage.getItem('packageName');
    const description = localStorage.getItem('packageDescription');
    const image = localStorage.getItem('packageImage');
  
    if (name && description && image) {
      const packageTitle = document.getElementById('packageTitle');
      const packageImage = document.querySelector('.card-img-top');
      const packageDescription = document.querySelector('.card-text');
  
      packageTitle.textContent = name;
      packageImage.src = image;
      packageImage.alt = name;
      packageDescription.textContent = description;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('packageTitle')) {
      llenarPlantilla();
    }
  });
  
  function addToCart() {
    const destino = localStorage.getItem('packageflag');
    const numPersonas = document.getElementById('numPersonas').value;
    const bebidasIncluidas = document.getElementById('bebidasIncluidas').checked;
    const guiaIncluido = document.getElementById('guiaIncluido').checked;
    const seguroIncluido = document.getElementById('seguroIncluido').checked;

    let precioPorPersona;
    switch(destino) {
        case 'francia':
            precioPorPersona = 1499;
            break;
        case 'roma':
            precioPorPersona = 1299;
            break;
        case 'tokio':
            precioPorPersona = 1999;
            break;
        case 'cancún':
            precioPorPersona = 899;
            break;
    }

    let precioTotal = precioPorPersona * numPersonas;

    if (bebidasIncluidas) {
        precioTotal += 150 * numPersonas;
    }
    if (guiaIncluido) {
        precioTotal += 150 * numPersonas;
    }
    if (seguroIncluido) {
        precioTotal += 150 * numPersonas;
    }

    const tour = {
        destino: destino,
        precioPorPersona: precioPorPersona,
        numPersonas: numPersonas,
        bebidasIncluidas: bebidasIncluidas,
        guiaIncluido: guiaIncluido,
        seguroIncluido: seguroIncluido,
        precioTotal: precioTotal
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.push(tour);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`Tour a ${destino.charAt(0).toUpperCase() + destino.slice(1)} añadido al carrito`);
    
    const isLoggedIn = localStorage.getItem('sessionToken');

    if (isLoggedIn) {
        window.location.href = '/tours/carrito.html';
    } else {
        alert('Por favor, inicia sesión para continuar');
        window.location.href = '/login.html'; 
    }
}
