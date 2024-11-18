const { GlobalState } = require('./GlobalState.js')
const { Actions } = require('./ActionEnum.js')

class InactiveState extends GlobalState {
    
    static validActions = new Map([
        [Actions.BEGIN, () => ({ error: false, message: "" })],
        [Actions.INST, () => ({ error: true, message: "El programa no ha iniciado" })],
        [Actions.END, () => ({ error: true, message: "El programa no se ha iniciado" })]
    ])
    
    checkAction = action => InactiveState.validActions.get(action)()

    constructor(){
        super()
        this.cursorPosition = [0, 0]
        this.color = 'rojo'
    }
}

exports.InactiveState = InactiveState