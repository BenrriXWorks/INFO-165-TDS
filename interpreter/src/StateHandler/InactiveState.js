const { GlobalState } = require('./GlobalState.js')
const { Actions } = require('./ActionEnum.js')

class InactiveState extends GlobalState {
    
    static validActions = new Map([
        [Actions.BEGIN, () => ""],
        [Actions.INST, () => new Error("El programa no ha iniciado")],
        [Actions.END, () => new Error("El programa no se ha iniciado")]
    ])
    
    checkAction = action => InactiveState.validActions.get(action)()

    constructor(){
        super()
    }
}

exports.InactiveState = InactiveState