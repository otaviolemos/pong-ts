import { Paddle } from './paddle'

export class Ball {
  readonly radius = 10
  x: number
  y: number
  private ySpeed: number
  private xSpeed: number
  private readonly canvasWidth: number
  private readonly canvasHeight: number

  constructor (canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.reset()
  }

  update (leftPaddle: Paddle, rightPaddle: Paddle) {
    if (this.reachedTop() || this.reachedBottom()) {
			this.bounceOnY()
		} 
    
		if (this.leftPaddleScored()) {
      leftPaddle.score()
			return this.reset() 
		} 
    
    if (this.rightPaddleScored()) {
      rightPaddle.score()
      return this.reset() 
    }
		
		this.move()
  }

  private move() {
    this.x += this.xSpeed
		this.y += this.ySpeed
  }

  private bounceOnY() {
    this.ySpeed = -this.ySpeed
  }

  private reachedTop (): boolean {
    return this.y < this.radius
  }

  private reachedBottom (): boolean {
    return this.y > this.canvasHeight - this.radius
  }

  private leftPaddleScored (): boolean {
    return this.x > this.canvasWidth + this.radius
  }

  private rightPaddleScored (): boolean {
    return this.x < this.radius
  }

  reset () {
    const midWidth = this.canvasWidth / 2
    const midHeight = this.canvasHeight / 2
    this.x = midWidth
		this.y = midHeight
		this.xSpeed = this.randomBetween(3, 4)
		
		let shouldGoLeft = this.randomBetween(0, 1) > 0.5
    if (shouldGoLeft) {
			this.bounceOnX()
		} 
		
		this.ySpeed = this.randomBetween(-3, 3)
  }

  private randomBetween (min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  bounceOnX () {
    this.xSpeed = -this.xSpeed
  }
}