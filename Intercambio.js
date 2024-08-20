function getRandomBalance() {
    return parseFloat((Math.random() * 100).toFixed(2));
}

const sessionToken = localStorage.getItem('sessionToken');

if (!sessionToken) {
    window.location.href = 'login.html';
}

headerarrow.innerHTML = `<span class="arrow" title="Regresar al MarketPlace">&#x2190;</span> Marketplace`;

headerarrow.addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('sessionToken');

    window.location.href = 'login.html';
});

function displayCryptoInfo(crypto, usdBalance) {
    const action = crypto.action === 'buy' ? 'Comprar' : 'Vender';
    document.getElementById('crypto-name').textContent = `${action} ${crypto.name}`;
    document.getElementById('crypto-balance').textContent = `Saldo de ${crypto.name}: ${crypto.balance}`;
    document.getElementById('usd-balance').textContent = `Saldo en USD: $${usdBalance}`;
}

function updateUSDValue(amount, crypto) {
    const usdValue = amount * crypto.price;
    document.getElementById('usd-value').textContent = `Valor en USD: $${usdValue.toFixed(2)}`;
}

let selectedCrypto = JSON.parse(localStorage.getItem('selectedCrypto')) || {};

const cryptoBalanceKey = `saldo_${selectedCrypto.name}`;
let cryptoBalance = parseFloat(localStorage.getItem(cryptoBalanceKey));

if (isNaN(cryptoBalance)) {
    cryptoBalance = 0; 
    localStorage.setItem(cryptoBalanceKey, cryptoBalance);
}

selectedCrypto.balance = cryptoBalance;

const usdBalanceKey = 'saldo_usd';
let usdBalance = parseFloat(localStorage.getItem(usdBalanceKey));

if (isNaN(usdBalance)) {
    usdBalance = getRandomBalance(); 
    localStorage.setItem(usdBalanceKey, usdBalance);
}

displayCryptoInfo(selectedCrypto, usdBalance);

document.getElementById('amount').addEventListener('input', function() {
    const amount = parseFloat(this.value);
    if (!isNaN(amount) && amount > 0) {
        updateUSDValue(amount, selectedCrypto);
    } else {
        document.getElementById('usd-value').textContent = '';
    }
});

document.getElementById('action-button').addEventListener('click', function() {
    const amount = parseFloat(document.getElementById('amount').value);
    const usdEquivalent = amount * selectedCrypto.price;

    if (isNaN(amount) || amount <= 0) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor ingresa una cantidad válida.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else if (selectedCrypto.action === 'sell' && amount > selectedCrypto.balance) {
        Swal.fire({
            title: 'Error',
            text: 'Cantidad inválida. Verifica el saldo disponible de criptomoneda.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else if (selectedCrypto.action === 'buy' && usdEquivalent > usdBalance) {
        Swal.fire({
            title: 'Error',
            text: 'No tienes suficientes fondos en USD para comprar esta cantidad de criptomoneda.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        let newCryptoBalance;
        let newUsdBalance;

        if (selectedCrypto.action === 'sell') {
            newCryptoBalance = selectedCrypto.balance - amount;
            newUsdBalance = usdBalance + usdEquivalent;
        } else {
            newCryptoBalance = selectedCrypto.balance + amount;
            newUsdBalance = usdBalance - usdEquivalent;
        }

        localStorage.setItem(cryptoBalanceKey, newCryptoBalance);
        localStorage.setItem(usdBalanceKey, newUsdBalance);

        Swal.fire({
            title: `${selectedCrypto.action === 'buy' ? 'Compra' : 'Venta'} exitosa`,
            text: `Nuevo saldo de ${selectedCrypto.name}: ${newCryptoBalance}\nNuevo saldo en USD: $${newUsdBalance.toFixed(2)}`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = 'index.html';
        });
    }
});


