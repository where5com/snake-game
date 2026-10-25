export type Vec = {
    x : number
    y : number
}
export type Direction = 'up' | 'down' | 'left' | 'right'
export type Snake = {
  body: Vec[]
  len : number
  dir : Direction
}
export const COLS = 20
export const ROWS = 20
export const CELL_SIZE = 25