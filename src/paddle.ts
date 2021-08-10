import { Ball } from './ball'
import { GameObject } from './game-object'
import { Mushroom } from './mushroom'

export class Paddle implements Object {

  private _score: number = 0
  y: number
  readonly x: number  
  height: number = 80
  readonly width: number = 20
  readonly canvasHeight: number
  readonly canvasWidth: number
  shouldGoDown = false
  shouldGoUp = false
  shouldGrow = false
  static readonly CANVAS_TOP = 0
  
  constructor (x: number, y: number, canvasHeight: number, canvasWidth: number) {
    this.x = x
    this.y = y
    this.canvasHeight = canvasHeight
    this.canvasWidth = canvasWidth
  }

  update () {
    if (this.shouldGoUp && this.canGoUp()) {
      return this.goUp()
    }
    
    if (this.shouldGoDown && this.canGoDown()) {
      return this.goDown()
    }
  }

  private canGoUp (): boolean {
    return this.y > Paddle.CANVAS_TOP
  }

  private canGoDown (): boolean {
    return this.y < this.canvasHeight - this.height
  }

  goUp () {
    this.y -= 2
  }

  goDown () {
    this.y += 2
  }

  setShouldGrow() {
    this.shouldGrow = true
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

  wasTouchedBy (mushroom: Mushroom): boolean {
    return this.isAtTheSameHeightOf(mushroom) && this.wasReachedBy(mushroom)
  }

  private wasReachedBy (mushroom: Mushroom): boolean {
    return mushroom.x < this.x + this.width
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

  private isAtTheSameHeightOf (object: GameObject): boolean {
    return object.y >= this.y && object.y <= this.y + this.height
  }

  processArtificialMovement (ballHeight: number) {
    let middleOfPaddle = this.y + this.height / 2;
    if (middleOfPaddle > ballHeight) {
      this.shouldGoUp = true;
      this.shouldGoDown = false;
      return
    } 
    this.shouldGoDown = true;
    this.shouldGoUp = false;
  }

  growBy (n: number) {
    this.height += n
  }
}
