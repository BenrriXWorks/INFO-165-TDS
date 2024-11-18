// IMPORTS
const { compile_jison, getSafe } = require("./src/utilities.js")
const { createCanvas } = require('canvas')
const { exec } = require('child_process')
const readline = require('readline') // Usamos readline en lugar de readlineSync
const config = require('./config.json')
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const process = require('process') 
const chalk = require('chalk')

// Configurar Express y Socket.IO
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// Configuración del puerto para el servidor web
const PORT = 3000
app.use(express.static('public')) // Para servir archivos estáticos, como el cliente HTML

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
const drawLine = (color, start, end) => {
    ctx.beginPath()
    ctx.moveTo(start[0]*5, start[1]*5)
    ctx.lineTo(end[0]*5, end[1]*5)
    ctx.strokeStyle = colorMap.get(color)
    ctx.lineWidth = 2
    ctx.stroke()
}

// Configuración de readline para leer la entrada de consola de manera no bloqueante
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Main para configurar el servidor y la entrada de la consola
;(() => {
    if (config.COMPILE_JISON && compile_jison(config.grammarPath, config.lexerPath) !== "Ok")
        return "Error al compilar jison"
    const parser = require('./parser/compiled_grammar.js')

    // Inicializa la conexión de los clientes
    io.on('connection', (socket) => {
        socket.emit('update', { img: canvas.toDataURL() }) // Enviar la imagen inicial del canvas al cliente cuando se conecta
        socket.on('disconnect', () => {})
    })

    // Función para procesar la entrada de consola y actualizar el gráfico
    const processInput = () => {
        rl.question(chalk.green('λ >> '), input => {
            if (input === 'exit()') {
                rl.close()
                process.exit(0)
            }

            const [err, val] = getSafe(parser.parse, input)
            if (err) console.error(config.VERBOSE_ERROR_MESSAGES ? err : err.message)
                
            if (config.SHOW_COMUNICATION_STACK) console.log(val)
            
            // Si hay instrucciones en el stack al llegar:
            if (val?.length)
                val.forEach(instruction => {
                    // Reiniciar el canvas
                    if (instruction?.option === 'clear') {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        io.emit('update', { img: canvas.toDataURL() })
                    }
        
                    if (instruction?.action) {
                        drawLine(...instruction.data)
                        // Actualizar el grafico web
                        io.emit('update', { img: canvas.toDataURL() })
                    }
                })
            
            // Continuar leyendo la entrada
            processInput()
        })
    }

    // Iniciar el servidor en el puerto 3000
    server.listen(PORT, () => {
        console.log(`Servidor escuchando en `, chalk.blue(`http://localhost:${PORT}`))
        exec('start http://localhost:3000')
        // Iniciar el proceso de entrada de consola sin bloquear el servidor
        console.log("Iniciando interprete, escriba", chalk.green("exit()"), "para salir...")
        processInput()  // Aquí procesamos la entrada de consola mientras el servidor escucha
    })
})()
