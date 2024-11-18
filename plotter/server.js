const { WebSocketServer } = require('ws')
const express = require('express')
const path = require('path')

/*let ws = new WebSocket('ws://localhost:8080')

ws.onopen = () => {
    console.log('Server up')
    ws.send('success')
}

// Handle WebSocket errors
ws.onerror = (error) => {
    console.error('WebSocket Error:', error)
}

*/

const app = express()
const PORT = 3000

// Serve static files (e.g., your JavaScript and HTML files)
app.use(express.static(path.join(__dirname, 'src')))

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

const wss = new WebSocketServer({ port: 8081 })

wss.on('connection', function connection(ws) {
    ws.on('error', console.error)

    ws.on('message', function message(data) {
        console.log('received: %s', data)
    })

    ws.send('something')
})
