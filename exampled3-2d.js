'use strict'

var d3voronoi = require('d3-voronoi').voronoi
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
var delta = (Math.PI * 2) / NUM
var radius = canvas.width / 3
var sites = new Array(NUM).fill(0)
.map((n, i) =>
  // [k + i * k, k + i * k]
  [k + i * k, canvas.height / 2]
  // [
  //   Math.cos(i * delta) * radius + canvas.width / 2,
  //   Math.sin(i * delta) * radius + canvas.height / 2,
  // ]
)
console.log({sites})

//--------------------------------------------- voronoi
var voronoi = d3voronoi()
  .x(d => d[0])
  .y(d => d[1])
  .extent([[-1, -1], [canvas.width, canvas.height]])
var polygons = voronoi.polygons(sites)

console.log(polygons)

var colors = new Array(polygons.length)
for(var i=0; i<polygons.length; ++i) {
  colors[i] = randomColor()
}

polygons.forEach((polygon, i) => {
  context.strokeStyle = '#000'
  context.lineWidth = 1.0
  context.fillStyle = colors[i]

  context.beginPath()
  context.moveTo(polygon[0][0], polygon[0][1])
  polygon.forEach(point => {
    console.log({point});
    context.lineTo(point[0], point[1]);
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

console.log('.')
