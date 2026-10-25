import type {Vec, Direction, Snake} from '../src/global.ts'
import { setupBoard, drawSnake, drawPixl} from '../src/board.ts'
import {soundButtons}             from '../src/main.ts'
import {setupControl}             from '../src/control.ts'
import { moveSnake, setOnChange, genFood, incLength } from '../src/snake.ts'

export type TestContext = {
  home: HTMLDivElement
  game: HTMLDivElement
  canvas: HTMLCanvasElement
}

let home: HTMLDivElement
let game: HTMLDivElement
let canvas: HTMLCanvasElement

export function test_main(TC:TestContext) {
    setupTest(TC)
    game.hidden = false
    home.hidden = true
    setupBoard(canvas)
    // test_draw()
    test_sound()
    return test_snake()
}

function test_snake() {
  const snake:Snake = {
    len  : 5,
    dir  : 'right',
    body : [ ]
  }
  let timer: ReturnType<typeof setInterval> | undefined
  let food: Vec | null = null

  function render() {
    drawSnake(snake)
    // Draw after restoring snake cells, including the previous tail cell.
    if (food) drawPixl([food], '#f97316')
  }
  function restartTimer() {
      if (timer !== undefined) {
        clearInterval(timer)
      }

      timer = setInterval(() => {
        moveSnake(snake, snake.dir)
      }, 800)
  }
  function resetGame() {
    restartTimer();
    snake.len = 5
    snake.dir = 'right'
    snake.body = [
      { x: 12, y: 10 },
      { x: 11, y: 10 },
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 8, y: 10 }, // 上一次尾端位置
    ]

    // 重置時重新建立棋盤；平常移動的局部更新稍後處理
    setupBoard(canvas)
    food = genFood(snake)
    render()
  }


  setOnChange((turned) => {
    if (turned) restartTimer()
    if (incLength(snake, food)) {
      food = genFood(snake)
    }
    render()
  })

  const up = document.querySelector<HTMLButtonElement>('#up')!
  const down = document.querySelector<HTMLButtonElement>('#down')!
  const left = document.querySelector<HTMLButtonElement>('#left')!
  const right = document.querySelector<HTMLButtonElement>('#right')!
  setupControl(
    [up,down,left,right],
    snake,
    game
  )
  
  
  resetGame()
  return resetGame
}

function setupTest(TC:TestContext) {
    home = TC.home
    game = TC.game
    canvas = TC.canvas
    document.querySelector<HTMLElement>('#test-mode')!.hidden = false
    console.log('test mode has been setuped')
}


function test_draw() {
  const COLS = 20
  const ROWS = 20
  
  const STEP_SECONDS = 1
  const STEP_MS = STEP_SECONDS * 1000
  
  let step = 0
  let paused = false
  
  async function render() {
    const horizontal = [{
      x: step % COLS,
      y: 5,
    }]
  
    const vertical = [{
      x: 12,
      y: step % ROWS,
    }]
  
    drawPixl(horizontal, '#4caf50')
    await new Promise(resolve => setTimeout(resolve, 300))
    drawPixl(vertical, '#62b8f5')
  }
  
  function tick() {
    if (paused) return
    step++
    render()
  }
  
  setInterval(tick, STEP_MS)
  
  
}

function test_sound() {
  
 
  soundButtons.forEach(button => { 
    button.addEventListener ('click', ()=> {
      playSound()
    })
  })
  function playSound() {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.frequency.value = 220
    gain.gain.value = 0.2

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.2)

    osc.onended = () => void ctx.close()
  }




}
