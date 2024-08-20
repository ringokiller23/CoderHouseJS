function setupWalletTitle() {
    const walletTitle = document.getElementById('wallet-title');
    const email = localStorage.getItem('email');

    if (email) {
        walletTitle.innerHTML = `<span class="arrow" title="Regresar al MarketPlace">&#x2190;</span> Wallet de: ${email}`;
    } else {
        walletTitle.textContent = 'Mi Wallet';
    }

    walletTitle.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('logoutBtn').addEventListener('click', function () {
        localStorage.clear();
    
        window.location.href = 'login.html';
    });
}

function displayCryptoBalances() {
    const cryptoBalancesContainer = document.getElementById('crypto-balances');
    const cryptos = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('saldo_')) {
            const cryptoName = key.replace('saldo_', '').toLowerCase(); 
            const balance = parseFloat(localStorage.getItem(key));

            if (!isNaN(balance) && balance > 0) {
                cryptos.push({ name: cryptoName, balance });
            }
        }
    }

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1')
        .then(response => response.json())
        .then(data => {
            cryptos.forEach(crypto => {
                const cryptoData = data.find(c => c.id === crypto.name || c.symbol === crypto.name.toLowerCase());

                if (cryptoData) {
                    // Crear el contenedor para cada criptomoneda
                    const cryptoCard = document.createElement('div');
                    cryptoCard.className = 'col-md-4 crypto-card';

                    // Obtener la imagen de la criptomoneda
                    const cryptoImage = document.createElement('img');
                    cryptoImage.src = cryptoData.image;
                    cryptoImage.alt = cryptoData.name;
                    cryptoImage.className = 'img-fluid';

                    // Crear un título con el nombre de la criptomoneda
                    const cryptoTitle = document.createElement('h5');
                    cryptoTitle.textContent = cryptoData.name;

                    // Crear un párrafo con el saldo
                    const cryptoBalance = document.createElement('p');
                    cryptoBalance.textContent = `Saldo: ${crypto.balance} ${cryptoData.symbol.toUpperCase()}`;

                    // Añadir la imagen, el título y el saldo al contenedor
                    cryptoCard.appendChild(cryptoImage);
                    cryptoCard.appendChild(cryptoTitle);
                    cryptoCard.appendChild(cryptoBalance);

                    // Añadir el contenedor al contenedor principal
                    cryptoBalancesContainer.appendChild(cryptoCard);
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de CoinGecko:', error);
        });
}

setupWalletTitle();
displayCryptoBalances();
