%{    
/* Definiciones */
const { 
    validarPosicion, 
    cambiarColor, 
    cambiarPosicion, 
    moverRec, 
    moverLin, 
    moverUbe, 
    moverUnt
} = require('../src/instrucciones.js')
const { Actions } = require('../src/StateHandler/ActionEnum.js')
const { ElementoTS } = require('../src/StateHandler/ElementoTS.js')
const { ActiveState } = require('../src/StateHandler/ActiveState.js')
const { InactiveState } = require('../src/StateHandler/InactiveState.js')

function handleBeginAction() {
    const isValid = stateInstance.checkAction(Actions.BEGIN).message
    if (isValid.error) console.error(isValid.message)
}

let stateInstance = new InactiveState()
let clearSignal = false
let actionStack = []

%}

/* Declaración de tokens */
%token ANFANG ENDE WERT SYMBOLE ID ASSIGN INT FARBE POS REC LIN UBE UNT ROJO AZUL AMARILLO VERDE BLANCO
%start PROG

%%

PROG
    : ANFANG_PROD ANFANG_FACTOR { 
        handleBeginAction() 
        if (clearSignal) {
            clearSignal = false
            actionStack.push({action:false, data:[], option:'clear'})
        }
        var stackCopy = actionStack.slice()
        actionStack = []
        return stackCopy
    }
    | MULTI_INST EOF { 
        var isValid = stateInstance.checkAction(Actions.INST)
        if (isValid.error) {
            console.error(isValid.message)
        } 
        var stackCopy = actionStack.slice()
        actionStack = []
        return stackCopy
    }
    | ENDE EOF { 
        var isValid = stateInstance.checkAction(Actions.END)
        if (!isValid.error) {
            stateInstance = new InactiveState()
        } else {
            console.error(isValid.message)
        }
    }
    | SYMBOLE EOF { console.log(stateInstance.TS) }
    ;

ANFANG_PROD
    : ANFANG { 
        if (stateInstance.constructor === InactiveState) {
            stateInstance = new ActiveState()
            clearSignal = true
        } else {
            console.error("El programa ya esta iniciado")
        }
    } 
    ;

ANFANG_FACTOR
    : MULTI_INST ENDE EOF 
    | EOF 
    | MULTI_INST EOF 
    ;

MULTI_INST
    : INST MULTI_INST 
    | INST
    ;

INST
    : DECL
    | PROC
    ;

DECL
    : WERT ID ASSIGN DATO {
        if (stateInstance.constructor === ActiveState)
            stateInstance.TS[$2] = $4; // Asignamos DATO.place al ID
    }
    ;

PROC
    : PROC_FARBE
    | PROC_POS
    | MOV
    ;

MOV
    : MOV_REC
    | MOV_LIN
    | MOV_UBE
    | MOV_UNT
    ;

PROC_FARBE
    : FARBE '(' DATO ')' {
        if (stateInstance.constructor === ActiveState) {            
            if ($3.type !== 'c') return console.log("POS debe recibir números como argumento");
            stateInstance.color = cambiarColor($3.val);
        }
    }
    ;

PROC_POS
    : POS '(' DATO ',' DATO ')' {
        if (stateInstance.constructor === ActiveState) {
            const error1 = validarPosicion($3.type, $3.val);
            const error2 = validarPosicion($5.type, $5.val);
            if (error1 || error2) return console.log(error1 || error2);
            var posicionAntigua = stateInstance.cursorPosition;
            stateInstance.cursorPosition = cambiarPosicion($3.val, $5.val);
        }
    }
    ;

MOV_REC
    : REC '(' DATO ')' {
        if (stateInstance.constructor === ActiveState) {
            if ($3.type !== 'i') return console.log("POS debe recibir números como argumento");
            var posicionAntigua = stateInstance.cursorPosition;
            stateInstance.cursorPosition = moverRec($3.val, stateInstance.cursorPosition);
            actionStack.push({ action: true, data: [stateInstance.color, posicionAntigua, stateInstance.cursorPosition] })
        }
    }
    ;

MOV_LIN
    : LIN '(' DATO ')' {
        if (stateInstance.constructor === ActiveState) {
            if ($3.type !== 'i') return console.log("POS debe recibir números como argumento");
            var posicionAntigua = stateInstance.cursorPosition;
            stateInstance.cursorPosition = moverLin($3.val, stateInstance.cursorPosition);
            actionStack.push({ action: true, data: [stateInstance.color, posicionAntigua, stateInstance.cursorPosition] })
        }
    }
    ;

MOV_UBE
    : UBE '(' DATO ')' {
        if (stateInstance.constructor !== ActiveState) {
            return; // No hacer nada si no es una instancia activa
        }
        if ($3.type !== 'i') return console.log("POS debe recibir números como argumento");
        var posicionAntigua = stateInstance.cursorPosition;
        stateInstance.cursorPosition = moverUbe($3.val, stateInstance.cursorPosition);
        actionStack.push({ action: true, data: [stateInstance.color, posicionAntigua, stateInstance.cursorPosition] })
    }
    ;

MOV_UNT
    : UNT '(' DATO ')' {
        if (stateInstance.constructor !== ActiveState) {
            return; // No hacer nada si no es una instancia activa
        }
        if ($3.type !== 'i') console.error("POS debe recibir números como argumento");
        else {
            var posicionAntigua = stateInstance.cursorPosition;
            stateInstance.cursorPosition = moverUnt($3.val, stateInstance.cursorPosition);
            actionStack.push({ action: true, data: [stateInstance.color, posicionAntigua, stateInstance.cursorPosition] })
        }
    }
    ;

DATO
    : ID {
        if (stateInstance.constructor === ActiveState)
            $$ = stateInstance.TS[$1] ?? (stateInstance.TS[$1] = new ElementoTS(null, null))
    }
    | INT {$$ = new ElementoTS('i', Number($1))}
    | COLOR {$$ = new ElementoTS('c', $1)}
    ;

COLOR
    : ROJO { $$ = "rojo"; }
    | AZUL { $$ = "azul"; }
    | AMARILLO { $$ = "amarillo"; }
    | VERDE { $$ = "verde"; }
    | BLANCO { $$ = "blanco"; }
    ;

%%

