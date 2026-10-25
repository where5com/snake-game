import type {Vec, Direction, Snake} from './global.ts'
import {COLS,ROWS} from './global.ts'


let onChange: (() => void) | null = null

export function setOnChange(callback: () => void) {
  onChange = callback
}

export function moveSnake (s:Snake, d:Direction) {
    if (s.dir == d) {
        s.body.unshift(nextMove(s,d))
        s.body.pop() 
    }
    s.dir = d
    onChange?.()
    function nextMove(s:Snake,d:Direction):Vec {
        let v:Vec = {...s.body[0]}
        switch (d) {
          case 'up':
            v.y--
            break

          case 'down':
            v.y++
            break

          case 'left':
            v.x--
            break

          case 'right':
            v.x++
            break
        }
        v.x = ((v.x % COLS) + COLS) % COLS
        v.y = ((v.y % ROWS) + ROWS) % ROWS
        return v
    }



}

// body[len] 是上一個尾端位置，不算目前占用的格子。
export function genFood(snake: Snake): Vec | null {
  const occupied = new Set(
    snake.body.slice(0, snake.len).map(pos => `${pos.x},${pos.y}`)
  )
  const available: Vec[] = []
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (!occupied.has(`${x},${y}`)) available.push({ x, y })
    }
  }
  // 滿盤時不再生成，避免無限尋找空格。
  if (available.length === 0) return null
  return available[Math.floor(Math.random() * available.length)]
}

export function incLength(snake: Snake, food: Vec | null): boolean {
  const head = snake.body[0]
  if (!food || !head || head.x !== food.x || head.y !== food.y) return false

  // 舊尾端成為身體，並保留額外一格供畫面還原使用。
  snake.body.push({ ...snake.body[snake.len] })
  snake.len++
  // 不在這裡呼叫 onChange，避免測試入口的吃食物判定遞迴觸發。
  return true
}
