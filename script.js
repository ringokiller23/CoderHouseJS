const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1';

async function fetchTop12Cryptos() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error al obtener datos de la API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Top 12 Criptomonedas:', data);

        const bannerContent = document.getElementById('banner-content');
        const cryptoGrid = document.getElementById('crypto-grid');
        bannerContent.innerHTML = '';
        cryptoGrid.innerHTML = '';

        data.forEach(crypto => {
            const cryptoBannerItem = document.createElement('div');
            cryptoBannerItem.className = 'crypto-banner-item';

            const cryptoBannerImage = document.createElement('img');
            cryptoBannerImage.src = crypto.image;
            cryptoBannerImage.alt = `${crypto.name} logo`;

            const cryptoBannerText = document.createElement('span');
            cryptoBannerText.textContent = `${crypto.name}: $${crypto.current_price.toFixed(2)}`;

            cryptoBannerItem.appendChild(cryptoBannerImage);
            cryptoBannerItem.appendChild(cryptoBannerText);
            bannerContent.appendChild(cryptoBannerItem);

            const cardCol = document.createElement('div');
            cardCol.className = 'col-md-4 col-sm-6 crypto-btn';

            const cryptoCard = document.createElement('div');
            cryptoCard.className = 'card crypto-card';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body crypto-card-body';

            const cryptoImage = document.createElement('img');
            cryptoImage.src = crypto.image;
            cryptoImage.alt = `${crypto.name} logo`;

            const cryptoInfo = document.createElement('div');

            const cryptoName = document.createElement('h5');
            cryptoName.className = 'crypto-name';
            cryptoName.textContent = crypto.name;

            const cryptoPrice = document.createElement('p');
            cryptoPrice.className = 'crypto-price';
            cryptoPrice.textContent = `$${crypto.current_price.toFixed(2)}`;

            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'btn-group';

            const buyButton = document.createElement('a');
            buyButton.href = 'Intercambio.html';
            buyButton.className = 'btn btn-buy';
            buyButton.textContent = 'Comprar';
            buyButton.addEventListener('click', () => {
                localStorage.setItem('selectedCrypto', JSON.stringify({
                    name: crypto.name,
                    price: crypto.current_price,
                    action: 'buy'
                }));
            });

            const sellButton = document.createElement('a');
            sellButton.href = 'Intercambio.html';
            sellButton.className = 'btn btn-sell';
            sellButton.textContent = 'Vender';
            sellButton.addEventListener('click', () => {
                localStorage.setItem('selectedCrypto', JSON.stringify({
                    name: crypto.name,
                    price: crypto.current_price,
                    action: 'sell'
                }));
            });

            buttonGroup.appendChild(buyButton);
            buttonGroup.appendChild(sellButton);

            cryptoInfo.appendChild(cryptoName);
            cryptoInfo.appendChild(cryptoPrice);
            cryptoInfo.appendChild(buttonGroup);

            cardBody.appendChild(cryptoImage);
            cardBody.appendChild(cryptoInfo);

            cryptoCard.appendChild(cardBody);
            cardCol.appendChild(cryptoCard);

            cryptoGrid.appendChild(cardCol);
        });
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
}

function getRandomBalance() {
    return parseFloat((Math.random() * (100000 - 80000) + 80000).toFixed(2));
}

const usdBalanceKey = 'saldo_usd';
let usdBalance = parseFloat(localStorage.getItem(usdBalanceKey));

if (isNaN(usdBalance)) {
    usdBalance = getRandomBalance();
    localStorage.setItem(usdBalanceKey, usdBalance);
}

document.getElementById('saldo-usd').textContent = `$${usdBalance.toFixed(2)}`;

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear(); 
    window.location.href = 'login.html'; 
});

document.getElementById('walletBtn').addEventListener('click', () => {
    window.location.href = 'wallet.html';
});

fetchTop12Cryptos();
