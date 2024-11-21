// IMPORTS
const { compile_jison, getSafe, getHelp } = require("./src/utilities.js")
const { createCanvas } = require('canvas')
const { exec } = require('child_process')
const readline = require('readline') // Usamos readline en lugar de readlineSync
const config = require('./config.json')
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const process = require('process') 
const chalk = require('chalk')
const help_messages = require('./help-explain.json')

// Configurar Express, Socket.IO y Readline
const app = express()
const server = http.createServer(app)
const io = socketIo(server)
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

// Configuración del puerto para el servidor web
app.use(express.static('public'))

// Configurar canvas y contexto para las actualizaciones
const canvas = createCanvas(500, 500)
const ctx = canvas.getContext('2d')

const colorMap = new Map([
    ["rojo","red"],
    ["amarillo", "yellow"],
    ["blanco", "white"],
    ["verde", "green"],
    ["azul", "blue"]
])
// Función para dibujar la línea
function drawLine(color, start, end) {
    ctx.beginPath()
    ctx.moveTo(start[0]*5, start[1]*5)
    ctx.lineTo(end[0]*5, end[1]*5)
    ctx.strokeStyle = colorMap.get(color)
    ctx.lineWidth = 2
    ctx.stroke()
    
}


// Main
;(() => {
    if (config.COMPILE_JISON && compile_jison(config.grammarPath, config.lexerPath) !== "Ok"){
        console.error("Error al compilar el archivo jison")
        process.exit(1)
    }
    const parser = require('./parser/compiled_grammar.js')

    // Inicializa la conexión de los clientes
    io.on('connection', socket => { socket.emit('update', { img: canvas.toDataURL() }) })

    // Función para procesar la entrada de consola y actualizar el gráfico
    const processInput = () => {
        rl.question(chalk.green('λ >> '), 
            input => {
                input = input.trim()
                if (input=='exit()'){ // EXIT
                    rl.close()
                    process.exit(0)
                } else if (input.length >= 4 && input.substring(0, 4) == 'help'){ // HELP
                    getHelp(input, help_messages)
                    processInput()
                } else {
                    const [err, val] = getSafe(parser.parse, input)

                    if (err) console.error(config.VERBOSE_ERROR_MESSAGES ? err : err.message);
                    if (config.SHOW_COMUNICATION_STACK) console.log(val);

                    // Si hay instrucciones en el stack al llegar:
                    if (val?.length) val.forEach(instruction => {
                        if (instruction?.option === 'clear') ctx.clearRect(0, 0, canvas.width, canvas.height)
                        if (instruction?.action) drawLine(...instruction.data)
                        io.emit('update', { img: canvas.toDataURL() })
                    })
                    
                    // Continuar leyendo la entrada
                    processInput()
                }
        })
    }

    // Iniciar el servidor en el puerto 3000
    server.listen(config.PORT, () => {
        console.log(`Servidor escuchando en`, chalk.blue(`http://localhost:${config.PORT}`))
        exec(`start http://localhost:${config.PORT}`)
        // Iniciar el proceso de entrada de consola sin bloquear el servidor
        console.log(`Para información acerca de las instrucciones, utilice [${chalk.green("help")}] y [${chalk.green("help <comandos>")}]`)
        console.log("Iniciando interprete, escriba", chalk.green("exit()"), "para salir...")
        processInput()  // Aquí procesamos la entrada de consola mientras el servidor escucha
    })
})()
