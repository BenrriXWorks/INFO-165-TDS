// Select the canvas element
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function cambiarColor(color) {
    ctx.strokeStyle = color
}

function movePen(x, y) {
    ctx.moveTo(x, y)
}

function moveRight(pos, move) {
    ctx.lineTo(pos[0] + move, pos[1])
    ctx.stroke()
}

function moveLeft(pos, move) {
    ctx.lineTo(pos[0] - move, pos[1])
    ctx.stroke()
}

function moveUp(pos, move) {
    ctx.lineTo(pos[0], pos[1] + move)
    ctx.stroke()
}

function moveDown(pos, move) {
    ctx.lineTo(pos[0], pos[1] - move)
    ctx.stroke()
}


cambiarColor('red')
// Draw a green triangle
ctx.beginPath()
ctx.lineWidth = 2
movePen(300, 300)
moveLeft([300, 300], 50)
moveDown([250, 300], 50)
