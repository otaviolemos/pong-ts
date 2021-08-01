import { Ball } from './ball'

export abstract class Paddle {

  private _score: number = 0
  y: number
  readonly x: number  
  readonly height: number = 80
  readonly width: number = 20
  readonly canvasHeight: number
  isDown = false
  isUp = false
  
  constructor (x: number, y: number, canvasHeight: number) {
    this.x = x
    this.y = y
    this.canvasHeight = canvasHeight
  }

  update () {
    if (this.isUp) {
      this.up()
    } else if (this.isDown) {
      this.down()
    }
  }

  up () {
    if (this.y > 0) {
      this.y -= 2
    }
  }

  down () {
    if (this.y < this.canvasHeight - this.height) {
      this.y += 2
    }
  }

  score () {
    this._score++
  }

  getScore () {
    return this._score
  }

  abstract wasReachedBy (ball: Ball): boolean

  isAtTheSameHeightOf (ball: Ball): boolean {
    return ball.y >= this.y && ball.y <= this.y + this.height
  }
}
