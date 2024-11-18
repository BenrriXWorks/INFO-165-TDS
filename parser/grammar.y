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

let stateInstance = new InactiveState()

%}

/* Declaración de tokens */
%token ANFANG ENDE WERT SYMBOLE ID ASSIGN INT FARBE POS REC LIN UBE UNT ROJO AZUL AMARILLO VERDE BLANCO
%start PROG

%%

PROG
    : ANFANG MULTI_INST ENDE { 
        return stateInstance.checkAction(Actions.BEGIN) 
    }
    | ANFANG EOF { 
        var isValid = stateInstance.checkAction(Actions.BEGIN)
        if (isValid.constructor !== Error) stateInstance = new ActiveState()
        return isValid
    }
    | ANFANG MULTI_INST EOF { 
        var isValid = stateInstance.checkAction(Actions.BEGIN).constructor
        if (isValid.constructor !== Error) stateInstance = new ActiveState()
        return isValid
    }
    | MULTI_INST EOF { 
        return stateInstance.checkAction(Actions.INST)
    }
    | ENDE EOF { 
        var isValid = stateInstance.checkAction(Actions.END)
        if (isValid.constructor !== Error) stateInstance = new InactiveState()
        return isValid
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
        if ($3.type !== 'c') return console.log("POS debe recibir números como argumento");
        cambiarColor($3.val);
    }
    ;

PROC_POS
    : POS '(' DATO ',' DATO ')' {
        const error1 = validarPosicion($3.type, $3.val);
        const error2 = validarPosicion($5.type, $5.val);
        if (error1 || error2) return console.log(error1 || error2);
        cambiarPosicion($3.val, $5.val);
    }
    ;

MOV_REC
    : REC '(' DATO ')' {
        if ($3.type !== 'i') return console.log("POS debe recibir números como argumento");
        moverRec($3.val);
    }
    ;

MOV_LIN
    : LIN '(' DATO ')' {
        if ($3.type !== 'i') return console.log("POS debe recibir números como argumento");
        moverLin($3.val);
    }
    ;

MOV_UBE
    : UBE '(' DATO ')' {
        if ($3.type !== 'i') return console.log("POS debe recibir números como argumento");
        moverUbe($3.val);
    }
    ;

MOV_UNT
    : UNT '(' DATO ')' {
        if ($3.type !== 'i') return console.log("POS debe recibir números como argumento");
        moverUnt($3.val);
    }
    ;

DATO
    : ID {
        if (stateInstance.constructor === ActiveState)
            $$ = stateInstance.TS[$1] ?? (stateInstance.TS[$1] = new ElementoTS(null, null));
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

