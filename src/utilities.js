const { execSync } = require('child_process')
const chalk = require('chalk')

function getSafe(fn, ...args) {
    try {
        return [null, fn(...args)]
    } catch (error) {
        return [error, null]
    }
}

async function getSafeAsync(fn, ...args) {
    try {
        const val = await fn(...args)
        return [null, val]
    } catch (error) {
        return [error, null]
    }
}

function compile_jison(grammarPath, lexerPath) {
    let [err, _] = getSafe(execSync, `jison ${grammarPath} ${lexerPath} -o parser/compiled_grammar.js`)
    return err ?? "Ok"
}

function getHelp(input, help_messages){
    let tokens = input.split(/\s+/)
    tokens.shift()
    if (tokens.length == 0){ 
        Object.keys(help_messages)
            .forEach(command => {
                const properties = help_messages[command]
                console.log(`    | ${ chalk.blue(command) }${ chalk.green(properties["Parametros"] ?? "") }: ${ properties['Descripción corta'] }`)})
        return 'Ok'
    } 

    tokens.forEach(token => {
        const command = help_messages[token]
        if (command != undefined) 
            console.log(
                `     COMANDO : ${chalk.green(token)}\n`,
                `    Tipo    : ${command['Tipo']}\n`,
                `    Descripcion: ${command['Descripción larga']}\n`,
                `    Ejemplos: \n`,
                command['Ejemplos'].map(ex=>JSON.stringify(ex, undefined, 8).replace(/^\{|\}$/g, '')).join('')
            )
        else 
            console.log(`[${chalk.red(token)}]: Instrucción no definida...`)
    })
    return 'Ok'

}


exports.compile_jison = compile_jison
exports.getSafe = getSafe
exports.getSafeAsync = getSafeAsync
exports.getHelp = getHelp
