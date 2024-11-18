const { GlobalState } = require('./GlobalState.js')
const { Actions } = require('./ActionEnum.js')

class ActiveState extends GlobalState {

    static validActions = new Map([
        [Actions.BEGIN, () => new Error("El programa ya esta iniciado")],
        [Actions.INST, () => ""],
        [Actions.END, () => ""]
    ])
    
    checkAction = action => ActiveState.validActions.get(action)()

    constructor(){
        super()
        this.cursorPosition = [0, 0]
        this.color = 'rojo'
    }
}

exports.ActiveState = ActiveState