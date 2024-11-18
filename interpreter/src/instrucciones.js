// instrucciones.js
const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:8081')

ws.on('error', console.error)

ws.on('open', function open() {
    console.log('Client up')
})

function validarPosicion(tipo, valor) {
    if (tipo !== 'i') 
        return `POS debe recibir números como argumento, pero recibió: ${valor}`
    if (valor > 100 || valor < 0) 
        return `La posicion debe estar entre 0 y 100 pero recibio: ${valor}`
    return null; // Si no hay error, devolver null
}

function cambiarColor(valor) {
    console.log(`Cambio de color: ${valor}`)
    return valor
}

function cambiarPosicion(valor1, valor2) {
    console.log(`Cambio de posición: (${valor1}, ${valor2})`)
    return [valor1, valor2]
}

function moverRec(valor, posicionActual) {
    // Derecha
    if (posicionActual[0] + valor > 100) {
        console.log("Movimiento se sale del canvas")
        return posicionActual
    }
    return [posicionActual[0] + valor, posicionActual[1]]
}

function moverLin(valor, posicionActual) {
    // Izquierda
    if (posicionActual[0] - valor < 0) {
        console.log("Movimiento se sale del canvas")
        return posicionActual
    }
    return [posicionActual[0] - valor, posicionActual[1]]
}

function moverUbe(valor, posicionActual) {
    // Arriba
    if (posicionActual[1] - valor < 0) {
        console.log("Movimiento se sale del canvas")
        return posicionActual
    }
    return [posicionActual[0], posicionActual[1] - valor]
}

function moverUnt(valor, posicionActual) {
    // Abajo
    if (posicionActual[1] + valor > 100) {
        console.log("Movimiento se sale del canvas")
        return posicionActual
    }
    return [posicionActual[0], posicionActual[1] + valor]
}

function beginEvent() {

}


module.exports = {
    validarPosicion,
    cambiarColor,
    cambiarPosicion,
    moverRec,
    moverLin,
    moverUbe,
    moverUnt,
    beginEvent
}