const { exec } = require('child_process')
const { execSync } = require('child_process')
const { WebSocketServer } = require('ws')
const { getSafe } = require('./interpreter/src/utilities')

try {
    console.log('Ejecutando servidor en plotter...')
    exec('cd plotter && node ./server.js', { stdio: 'inherit' })

    const wss = new WebSocketServer({ port: 8080 })

    wss.on('connection', function connection(ws) {
        ws.on('error', console.error)

        ws.on('message', function message(data) {
            if (data == 'success') {
                console.log('Ejecutando cliente en interpreter...')
                [err, data] = getSafe(execSync, 'cd interpreter && node ./client.js', { stdio: 'inherit' })
                if (data) return console.log('Ejecucion finalizada')
                console.error(`Error ejecutando comandos: ${err.message}`)
            }
        })
    })


}
catch (err) { console.error(err) }
