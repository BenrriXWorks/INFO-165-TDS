const { GlobalState } = require('./GlobalState.js')
const { Actions } = require('./ActionEnum.js')

class ActiveState extends GlobalState {

    static validActions = new Map([
        [Actions.BEGIN, () => ({ error: true, message: "El programa ya está iniciado" })],
        [Actions.INST, () => ({ error: false, message: "" })],
        [Actions.END, () => ({ error: false, message: "" })]
    ])

    checkAction = action => ActiveState.validActions.get(action)()

    constructor(){
        super()
        this.cursorPosition = [0, 0]
        this.color = 'rojo'
    }
}

exports.ActiveState = ActiveState