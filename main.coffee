comp = new Uint8Array(256)

style = document.createElement "style"
style.innerHTML = """
  body {
    margin: 0;
    overflow: hidden;
    background-color: black;
  }

  canvas {
    background-color: white;
    margin: auto;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    width: 512px;
    height: 512px;
    image-rendering: pixelated;
  }
"""
document.head.appendChild style

canvas = document.createElement('canvas')
canvas.width = 16
canvas.height = 16

document.body.appendChild canvas
context = canvas.getContext('2d')

rand = ->
  Math.floor Math.random() * 256

draw = (data, context) ->
  imageData = context.getImageData 0, 0, 16, 16

  id = imageData.data
  i = 0

  while i < 256
    v = data[i]
    id[4 * i + 0] = 0
    id[4 * i + 1] = 255
    id[4 * i + 2] = 0
    id[4 * i + 3] = v
    i += 1

  context.putImageData imageData, 0, 0

randomFill = (buffer) ->
  l = buffer.length
  i = 0
  while i < l
    buffer[i] = rand()
    i += 1

seqFill = (buffer) ->
  l = buffer.length
  i = 0
  while i < l
    buffer[i] = i
    i += 1

seqFill comp

subneg = (data) ->
  pc = data[0]
  acc = data[1]

  a = data[pc]
  next = pc + 1
  if next is 256
    next = 0
  b = data[next]

  acc = data[1] = data[pc] = r = a - acc

  console.log "PC: #{pc}, ACC: #{acc}, A: #{a}, B: #{b}, R: #{r}"

  if r < 0
    data[0] = b
  else
    data[0] = next

setInterval ->
  subneg(comp)
  draw comp, context
, 10