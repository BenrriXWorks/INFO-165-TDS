// IMPORTS
const { compile_jison, getSafe } = require("./src/utilities.js")
const readlineSync = require('readline-sync')
const config = require('./config.json')
const fs = require('fs')

const handleError = err => {
    if (err?.constructor === Error) {
        console.error("Err:", config.VERBOSE_ERROR_MESSAGES ? err : err.message)
        return false
    }
    return true
}

// MAIN
(() => {

    if (config.COMPILE_JISON && compile_jison(config.grammarPath, config.lexerPath) !== "Ok") 
        return "Error al compilar jison"
    const parser = require('./parser/compiled_grammar.js')

    // File Read Mode
    if (!config.INTERPRETER_MODE) {
        const [fileReadError, fileContent] = getSafe(fs.readFileSync, config.INPUT_FILE, config.FILE_ENCODING)

        if (!handleError(fileReadError)) 
            return console.error("Error leyendo el archivo")
        
        const [parsingError, parseReturn] = getSafe(parser.parse, fileContent)
        if (handleError(parsingError || parseReturn) && parseReturn) 
            console.log(parseReturn)
        return console.log("Fin de la traducción")
    }
    
    // Interpreter Mode
    console.log("Iniciando modo interprete... Escriba . para finalizar y TS para ver la tabla de simbolos")
    let input = ''
    for(;;) {
        if ((input = readlineSync.question('>> ')) === '.') break
        if (!input) continue
        const [err, val] = getSafe(parser.parse, input)
        if (handleError(err || val) && val) console.log(val)
    }
    
})()