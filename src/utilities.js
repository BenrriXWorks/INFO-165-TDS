const { execSync } = require('child_process')

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

exports.compile_jison = compile_jison
exports.getSafe = getSafe
exports.getSafeAsync = getSafeAsync
