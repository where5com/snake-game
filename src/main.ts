import './style.css'
import { setupBoard, drawSnake} from './board.ts'
import '../tests/test_main.ts'
import soundOn  from '../image/icon/sound-on.png'
import soundOff from '../image/icon/sound-off.png'
import { test_main } from '../tests/test_main.ts'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="test-mode" hidden>TEST MODE</div>
  <div id=home class="home">
    <h1>SNAKE GAME</h1>
    <p>Classic Snake Game</p>
    <button id="start">START GAME</button>
    <button class="sound-toggle" type="button" aria-label="Toggle sound"> <img alt=""> </button>
  </div>

  <div id="game" hidden>
    <h2>Game Screen</h2>
    <canvas id="board"></canvas>
    <button id="back">BACK</button>
    <button class="sound-toggle" type="button" aria-label="Toggle sound"> <img alt=""> </button>
  </div>

  <div class="direction-pad">
    <button id="up">↑</button>
    <div class="direction-row">
      <button id="left">←</button>
      <button id="down">↓</button>
      <button id="right">→</button>
    </div>
  </div>
`
const startButton = document.querySelector<HTMLButtonElement>('#start')!
const home = document.querySelector<HTMLDivElement>('#home')!
const game = document.querySelector<HTMLDivElement>('#game')!
const canvas = document.querySelector<HTMLCanvasElement>('#board')!

startButton.addEventListener('click', () => {
  console.log('Game Start!')
  setupBoard(canvas)
})


document.querySelector<HTMLButtonElement>('#start')!
  .addEventListener('click', () => {
    home.hidden = true
    game.hidden = false
    resetGame()
  })

document.querySelector<HTMLButtonElement>('#back')!
  .addEventListener('click', () => {
    game.hidden = true
    home.hidden = false
  })


  let soundEnabled = false
  export const soundButtons = document.querySelectorAll<HTMLButtonElement>('.sound-toggle')
  updateSoundButtons()  
  soundButtons.forEach(button => {
    button.addEventListener('click', () => {
      soundEnabled = !soundEnabled
      
      updateSoundButtons()
    })
  })  
 export function updateSoundButtons() {
    soundButtons.forEach(button => {
      const img = button.querySelector('img')!

      img.src = soundEnabled ? soundOn : soundOff
      button.setAttribute('aria-pressed', String(!soundEnabled))
    })
  }
const resetGame = test_main({home,game,canvas})