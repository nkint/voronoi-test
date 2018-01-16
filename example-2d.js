'use strict'

var vd = require('voronoi-diagram')
var randomColor = require('randomcolor').randomColor
var canvas, context

canvas = document.createElement('canvas')
const edge = Math.min(window.innerWidth, window.innerHeight)
console.log(edge)
canvas.width = edge
canvas.height = edge
context = canvas.getContext('2d')
document.body.appendChild(canvas)

context.fillStyle = '#eee'
context.fillRect(0,0,canvas.width,canvas.height)

//--------------------------------------------- input points

const NUM = 10
const k = canvas.width / (NUM + 1)
var sites = new Array(NUM).fill(0)
.map((n, i) =>
  [k + i * k, canvas.height / 2] // k + i * k]
)
console.log({sites})

var voronoi = vd(sites)
var colors = new Array(voronoi.cells.length)
for(var i=0; i<voronoi.cells.length; ++i) {
  colors[i] = randomColor()
}

var w = canvas.width
var h = canvas.height

context.fillStyle = '#eee'
context.fillRect(0,0,w,h)

var cells = voronoi.cells
var points = voronoi.positions

console.log({points})

context.strokeStyle = '#000'
context.lineWidth = Math.min(1.0, 1.0)

cells.forEach((cell, i) => {
  if(cell.indexOf(-1) >= 0) {
    console.log('cell contains -1, return', cell)
    return
  }
  context.fillStyle = colors[i]
  context.beginPath()
  context.moveTo(points[cell[0]][0], points[cell[0]][1])
  cell.forEach(index => {
    const point = points[index]
    context.lineTo(point[0], point[1])
  })
  context.closePath()
  context.stroke()
  context.fill()
})

context.fillStyle = '#000'
sites.forEach(site => {
  context.beginPath()
  context.arc(site[0], site[1], 5.0, 0, 2*Math.PI)
  context.closePath()
  context.fill()
})

context.fillStyle = '#f00'
points.forEach(site => {
  context.beginPath()
  context.arc(site[0], site[1], 5.0, 0, 2*Math.PI)
  context.closePath()
  context.fill()
})

console.log('.')
