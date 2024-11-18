// instrucciones.js

function validarPosicion(tipo, valor) {
    if (tipo !== 'i') {
        return `POS debe recibir números como argumento, pero recibió: ${valor}`;
    }
    return null; // Si no hay error, devolver null
}

function cambiarColor(valor) {
    console.log(`Cambio de color: ${valor}`);
}

function cambiarPosicion(valor1, valor2) {
    console.log(`Cambio de posición: (${valor1}, ${valor2})`);
}

function moverRec(valor) {
    console.log(`Movimiento rec: ${valor}`);
}

function moverLin(valor) {
    console.log(`Movimiento lin: ${valor}`);
}

function moverUbe(valor) {
    console.log(`Movimiento ube: ${valor}`);
}

function moverUnt(valor) {
    console.log(`Movimiento unt: ${valor}`);
}

module.exports = {
    validarPosicion,
    cambiarColor,
    cambiarPosicion,
    moverRec,
    moverLin,
    moverUbe,
    moverUnt
};
