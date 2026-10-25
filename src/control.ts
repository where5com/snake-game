import type { Snake,Direction} from './global.ts'
import {moveSnake} from './snake.ts'

export function setupControl(
    buttons: HTMLButtonElement[],
    snake  : Snake,
    game   : HTMLElement 
) {
  buttons.forEach(button => {
        const d = button.id as Direction
        button.addEventListener('click', () => {
            if (game.hidden ==false) moveSnake(snake, d)
    })
  })
  document.addEventListener('keydown', event => {
    const directions: Record<string, Direction> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    }
    const direction = directions[event.key]

    if (!direction || game.hidden) return

    event.preventDefault()
    moveSnake(snake,direction)
  })


}