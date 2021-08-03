import { Ball } from './ball'

export class Paddle {

  private _score: number = 0
  y: number
  readonly x: number  
  readonly height: number = 80
  readonly width: number = 20
  readonly canvasHeight: number
  readonly canvasWidth: number
  shouldGoDown = false
  shouldGoUp = false
  
  constructor (x: number, y: number, canvasHeight: number, canvasWidth: number) {
    this.x = x
    this.y = y
    this.canvasHeight = canvasHeight
    this.canvasWidth = canvasWidth
  }

  update () {
    if (this.shouldGoUp && this.canGoUp()) {
      this.goUp()
    } else if (this.shouldGoDown && this.canGoDown()) {
      this.goDown()
    }
  }

  private canGoUp (): boolean {
    return this.y > 0
  }

  private canGoDown (): boolean {
    return this.y < this.canvasHeight - this.height
  }

  private goUp () {
    this.y -= 2
  }

  private goDown () {
    this.y += 2
  }

  score () {
    this._score++
  }

  getScore () {
    return this._score
  }

  wasHitBy (ball: Ball): boolean {
    if (this.isAtTheSameHeightOf(ball)) {
      if (this.isAtLeftSide()) {
        return this.leftReachedBy(ball) 
      }
      return this.rightReachedBy(ball)
    }
  }

  private leftReachedBy (ball: Ball) {
    return ball.x - ball.radius <= this.x + this.width && ball.x > this.x
  }

  private rightReachedBy (ball: Ball) {
    return ball.x + ball.radius >= this.x && ball.x <= this.x + this.width
  }

  private isAtLeftSide() {
    return this.x < (this.canvasWidth / 2)
  }

  private isAtTheSameHeightOf (ball: Ball): boolean {
    return ball.y >= this.y && ball.y <= this.y + this.height
  }

  processArtificialMovement (ballHeight: number) {
    let middleOfPaddle = this.y + this.height / 2;
    if (middleOfPaddle > ballHeight) {
      this.shouldGoUp = true;
      this.shouldGoDown = false;
    } else {
      this.shouldGoDown = true;
      this.shouldGoUp = false;
    }
  }
}
