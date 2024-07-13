alert("Bienvenido al Exchange de Cryptos");

let opcion, moneda;
let tokenArray = [];
do {
    opcion = prompt(
        "\n¿Qué operación deseas realizar?\n\n1. Convertir USDC a Bitcoin\n\n2. Convertir USDC a Ethereum\n\n3. Convertir a USDC\n\nPara salir, ingresa 'N'."
    );

    if (opcion === null) {
        break;
    } else if (opcion === '1') {
        moneda = "BTC";
        if (confirm("Has elegido convertir USDC a Bitcoin.\n\n¿Deseas continuar?")) {
            calcularCrypto(moneda);
        }
    } else if (opcion === '2') {
        moneda = "ETH";
        if (confirm("Has elegido convertir USDC a Ethereum.\n\n¿Deseas continuar?")) {
            calcularCrypto(moneda);
        }
    } else if (opcion === '3') {
        moneda = "USDC";
        if (confirm("Has elegido convertir Crypto a USDC.\n\n¿Deseas continuar?")) {
            calcularCrypto(moneda);
        }
    } else if (opcion.toUpperCase() !== 'N') {
        alert("Por favor, ingresa una respuesta válida.");
    }
} while (opcion !== null && opcion.toUpperCase() !== 'N');

alert("Gracias por usar la el exchange de Cryptos");

function calcularCrypto(moneda) {
    let cantidad, aceptado, billetera, billeteraArray, resultado, tipo, tasa, inverso;
    let tokenArray = [];

    for (let i = 0; i < 9; i++) {
        let randomNumber = Math.floor(Math.random() * 10);
        tokenArray.push(randomNumber);
    }
    
    switch (moneda) {
        case "BTC":
            tipo = "btc";
            cantidad = prompt(`Ingresa la cantidad de USDC que deseas convertir a ${moneda}:`);
            billetera = prompt('Ingresa tu billetera Bitcoin (debe empezar con "btc" seguido de 5 números):');
            if(cantidad === null || billetera === null)
                break;
            billeteraArray = billetera.split('');
            aceptado = validarBilletera(billeteraArray, tipo);
            if (aceptado) {
                [resultado, tasa] = calculoCrypto(cantidad, tipo);
                alert(`Has convertido ${cantidad} USDC dando un resultado de ${resultado.toFixed(8)} BTC a una tasa de 1 BTC a ${tasa} USDC.\n\n Su token de transacción generado es el siguiente: id${tokenArray.join('')}`);
            } else {
                alert("Billetera no válida.");
            }
            break;
        case "ETH":
            tipo = "eth";
            cantidad = prompt(`Ingresa la cantidad de USDC que deseas convertir a ${moneda}:`);
            billetera = prompt('Ingresa tu billetera Ethereum (debe empezar con "eth" seguido de 5 números):');
            if(cantidad === null || billetera === null)
                break;
            billeteraArray = billetera.split('');
            aceptado = validarBilletera(billeteraArray, tipo);
            if (aceptado) {
                [resultado, tasa] = calculoCrypto(cantidad, tipo);
                alert(`Has convertido ${cantidad} USDC dando un resultado de ${resultado.toFixed(8)} ETH a una tasa de 1 ETH a ${tasa} USDC.\n\n Su token de transacción generado es el siguiente: id${tokenArray.join('')}`);
            } else {
                alert("Billetera no válida.");
            }
            break;
        case "USDC":
            inverso = prompt("Selecciona la opción que deseas operar:\n\n1. Convertir Bitcoin a USDC\n\n2. Convertir Ethereum a USDC\n\n");
            if (inverso === "1") {
                tipo = "usdcbtc";
                cantidad = prompt(`Ingresa la cantidad de Bitcoin que deseas convertir a USDC:`);
                if(cantidad === null)
                    break;
                [resultado, tasa] = calculoCrypto(cantidad, tipo);
                alert(`Has convertido ${cantidad} Bitcoin dando un resultado de ${resultado.toFixed(2)} USDC a una tasa de 1 USDC a ${tasa.toFixed(8)} BTC.\n\n Su token de transacción generado es el siguiente: id${tokenArray.join('')}`);
            } else if (inverso === "2") {
                tipo = "usdceth";
                cantidad = prompt(`Ingresa la cantidad de Ethereum que deseas convertir a USDC:`);
                if(cantidad === null)
                    break;
                [resultado, tasa] = calculoCrypto(cantidad, tipo);
                alert(`Has convertido ${cantidad} Ethereum dando un resultado de ${resultado.toFixed(2)} USDC a una tasa de 1 USDC a ${tasa.toFixed(8)} ETH.\n\n Su token de transacción generado es el siguiente: id${tokenArray.join('')}`);
            } else {
                alert("Operación no válida.");
            }
            break;
    }

    tokenArray = [];
}

function validarBilletera(billeteraArray, tipo) {
    let arrayBilleteraKey = billeteraArray.slice(0, 3).join('');
    if (billeteraArray.length === 8 && arrayBilleteraKey === tipo) {
        return true;
    }
    return false;
}

function calculoCrypto(cantidad, tipo) {
    let resultado;
    const precioEth = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;
    const precioBtc = Math.floor(Math.random() * (70000 - 50000 + 1)) + 50000;

    switch (tipo) {
        case "btc":
            resultado = cantidad / precioBtc;
            return [resultado, precioBtc];
        case "eth":
            resultado = cantidad / precioEth;
            return [resultado, precioEth];
        case "usdcbtc":
            resultado = cantidad * precioBtc;
            return [resultado, 1 / precioBtc];
        case "usdceth":
            resultado = cantidad * precioEth;
            return [resultado, 1 / precioEth];
    }
}
