let varNum = prompt('Escribe un número');
let varString = prompt('Escribe una cadena de texto');
let varBool = prompt('Escribe un valor booleano');

const stringTrueLower = varBool.toLowerCase();

const boolData = stringTrueLower === 'true' ? true : stringTrueLower === 'false' ? false : null;

const numData = parseFloat(varNum);
const numertoSum = 100;

console.log('Valor Numerico: ' + numData + ' valor String: ' + varString + ' valor Booleano: ' + boolData);

if (boolData === false) {
    resultado = numData + numertoSum;
    console.log('Ingresaste un valor booleano con false');
    console.log('Se suma el valor dado más 100: ' + resultado);
} else {
    resultado = numData - numertoSum;
    console.log('El valor booleano ingresado es true');
    console.log('Se resta el valor dado menos 100: ' + resultado);
}
