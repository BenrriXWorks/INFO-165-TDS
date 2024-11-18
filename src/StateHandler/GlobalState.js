/* Clase abstracta para manejar los estados del analizador sintactico, contiene la tabla de simbolos */
class GlobalState {

    cursorPosition = null

    constructor() { 
        if (this.constructor === GlobalState) 
            throw new Error("GlobalState is an abstract class")
        this.TS = new Map() // Tabla de símbolos
    }
    checkAction() {
        if (this.constructor === GlobalState) 
            throw new Error("GlobalState is an abstract class")
    }
}

exports.GlobalState = GlobalState