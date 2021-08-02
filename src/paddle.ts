import { Ball } from './ball'

export class Paddle {

  private _score: number = 0
  y: number
  readonly x: number  
  readonly height: number = 80
  readonly width: number = 20
  readonly canvasHeight: number
  readonly canvasWidth: number
  isDown = false
  isUp = false
  
  constructor (x: number, y: number, canvasHeight: number, canvasWidth: number) {
    this.x = x
    this.y = y
    this.canvasHeight = canvasHeight
    this.canvasWidth = canvasWidth
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

  wasHitBy (ball: Ball): boolean {
    if(this.isAtLeftSide()) {
      return this.leftReachedBy(ball) 
      && this.isAtTheSameHeightOf(ball)
    } 
    return this.rightReachedBy(ball)
      && this.isAtTheSameHeightOf(ball)
  }

  leftReachedBy (ball: Ball) {
    return ball.x - ball.radius <= this.x + this.width && ball.x > this.x
  }

  rightReachedBy (ball: Ball) {
    return ball.x + ball.radius >= this.x && ball.x <= this.x + this.width
  }

  isAtLeftSide() {
    return this.x < (this.canvasWidth / 2)
  }

  isAtTheSameHeightOf (ball: Ball): boolean {
    return ball.y >= this.y && ball.y <= this.y + this.height
  }

  processArtificialMovement (ballHeight: number) {
    let middleOfPaddle = this.y + this.height / 2;
    
    if (middleOfPaddle > ballHeight) {
      this.isUp = true;
      this.isDown = false;
    } else {
      this.isDown = true;
      this.isUp = false;
    }
  }
}
