%{    
/* Definiciones */
const { 
    validarPosicion, 
    cambiarColor, 
    cambiarPosicion, 
    moverRec, 
    moverLin, 
    moverUbe, 
    moverUnt,
    beginEvent,
    fullProgramEvent
} = require('../src/instrucciones.js')
const { Actions } = require('../src/StateHandler/ActionEnum.js')
const { ElementoTS } = require('../src/StateHandler/ElementoTS.js')
const { ActiveState } = require('../src/StateHandler/ActiveState.js')
const { InactiveState } = require('../src/StateHandler/InactiveState.js')

let stateInstance = new InactiveState()

%}

/* Declaración de tokens */
%token ANFANG ENDE WERT SYMBOLE ID ASSIGN INT FARBE POS REC LIN UBE UNT ROJO AZUL AMARILLO VERDE BLANCO
%start PROG

%%

PROG
    : ANFANG MULTI_INST ENDE {
        if (stateInstance.constructor === ActiveState)
            console.log("Warning: Se ejecutarán acciones sobre un programa ya iniciado")
        return stateInstance.checkAction(Actions.BEGIN).message // Devuelve mensaje (vacío o de advertencia)
    }
    | ANFANG EOF { 
        var isValid = stateInstance.checkAction(Actions.BEGIN);
        if (!isValid.error) { 
            stateInstance = new ActiveState()
            beginEvent()
        }
        return isValid.message // Retorna el mensaje vacío o de error
    }
    | ANFANG MULTI_INST EOF { 
        var isValid = stateInstance.checkAction(Actions.BEGIN)
        if (!isValid.error) {
            stateInstance = new ActiveState()
            beginEvent()
        } 
        return isValid.message
    }
    | MULTI_INST EOF { 
        var isValid = stateInstance.checkAction(Actions.INST)
        return isValid.message
    }
    | ENDE EOF { 
        var isValid = stateInstance.checkAction(Actions.END)
        if (!isValid.error) {
            stateInstance = new InactiveState()
        }
        return isValid.message
    }
    | SYMBOLE EOF { return stateInstance.TS }
    ;

MULTI_INST
    : INST
    | INST MULTI_INST 
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
        if ($3.type !== 'c') return console.log("POS debe recibir números como argumento")
        stateInstance.color = cambiarColor($3.val)
    }
    ;

PROC_POS
    : POS '(' DATO ',' DATO ')' {
        const error1 = validarPosicion($3.type, $3.val)
        const error2 = validarPosicion($5.type, $5.val)
        if (error1 || error2) return console.log(error1 || error2)
        stateInstance.cursorPosition = cambiarPosicion($3.val, $5.val)
    }
    ;

MOV_REC
    : REC '(' DATO ')' {
        if ($3.type !== 'i') return console.log("POS debe recibir números como argumento")
        stateInstance.cursorPosition = moverRec($3.val, stateInstance.cursorPosition)
        console.log(stateInstance.cursorPosition)
    }
    ;

MOV_LIN
    : LIN '(' DATO ')' {
        if ($3.type !== 'i') return console.log("POS debe recibir números como argumento")
        stateInstance.cursorPosition = moverLin($3.val, stateInstance.cursorPosition)
        console.log(stateInstance.cursorPosition)
    }
    ;

MOV_UBE
    : UBE '(' DATO ')' {
        if ($3.type !== 'i') return console.log("POS debe recibir números como argumento")
        stateInstance.cursorPosition = moverUbe($3.val, stateInstance.cursorPosition)
        console.log(stateInstance.cursorPosition)
    }
    ;

MOV_UNT
    : UNT '(' DATO ')' {
        if ($3.type !== 'i') return console.log("POS debe recibir números como argumento")
        stateInstance.cursorPosition = moverUnt($3.val, stateInstance.cursorPosition)
        console.log(stateInstance.cursorPosition)
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

