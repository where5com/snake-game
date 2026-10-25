import type {Vec, Direction, Snake} from './global.ts'
import {COLS,ROWS,CELL_SIZE} from './global.ts'


let canvas: HTMLCanvasElement
let ctx   : CanvasRenderingContext2D

export function setupBoard(element: HTMLCanvasElement) {
  canvas = element

  const context = canvas.getContext('2d')
  if (!context) throw new Error('Cannot get canvas context')

  ctx = context
  canvas.width = COLS * CELL_SIZE
  canvas.height = ROWS * CELL_SIZE
  clearBoard()  
}
function clearBoard(){
  // 棋盤背景
  ctx.fillStyle = '#14271d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 棋盤格線
  ctx.strokeStyle = '#2d4737'
  ctx.lineWidth = 1

  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath()
    ctx.moveTo(x * CELL_SIZE, 0)
    ctx.lineTo(x * CELL_SIZE, canvas.height)
    ctx.stroke()
  }

  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * CELL_SIZE)
    ctx.lineTo(canvas.width, y * CELL_SIZE)
    ctx.stroke()
  }
}

export function drawPixl ( position:{ x: number; y: number }[], color:string 
){
  ctx.fillStyle = color
  for (const pos of position) {
    ctx.fillRect(
      pos.x * CELL_SIZE,
      pos.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    )
  }
}
export function drawSnake(snake:Snake) {
  const { body, len, dir } = snake
  for (let i = 0; i<=len; i++) restoreCell(body[i])
  for (let i = len - 1; i >= 0; i--) {
    const pos = body[i]
    const x = pos.x * CELL_SIZE
    const y = pos.y * CELL_SIZE

    // Head: opaque; Body: fade toward tail
    const alpha = i === 0
      ? 1
      : 0.2 + 0.8 * (len - 1 - i) / Math.max(1, len - 2)

    ctx.save()

    ctx.globalAlpha = alpha
    ctx.fillStyle = i === 0 ? '#15803d' : '#4ade80'

    ctx.beginPath()
    ctx.roundRect(
      x + 1,
      y + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2,
      3
    )
    ctx.fill()

    ctx.restore()

    if (i !== 0) continue

    // Head direction indicator
    const angle = {
      right: 0,
      down: Math.PI / 2,
      left: Math.PI,
      up: -Math.PI / 2
    }[dir]

    ctx.save()
    ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2)
    ctx.rotate(angle)

    ctx.fillStyle = '#bbf7d0'
    ctx.beginPath()
    ctx.moveTo(CELL_SIZE * 0.28, 0)
    ctx.lineTo(-CELL_SIZE * 0.12, -CELL_SIZE * 0.22)
    ctx.lineTo(-CELL_SIZE * 0.12, CELL_SIZE * 0.22)
    ctx.closePath()
    ctx.fill()

    ctx.restore()
  }
  function restoreCell(pos: Vec) {
    const x = pos.x * CELL_SIZE
    const y = pos.y * CELL_SIZE

    // 還原這一格的背景
    ctx.fillStyle = '#14271d'
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)

    // 還原格線
    ctx.strokeStyle = '#2d4737'
    ctx.lineWidth = 1
    ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE)
  }
}