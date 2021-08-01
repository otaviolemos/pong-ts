import { CPU } from './cpu'
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

  update (player: Paddle, computer: CPU) {
    if (this.y < this.radius || this.y > this.canvasHeight - this.radius) {
			this.ySpeed = -this.ySpeed
		} 
    
		if (this.playerScored()) {
      player.score()
			this.reset()
		} else if (this.computerScored()) {
      computer.score()
      this.reset()
    }
		
		this.x += this.xSpeed
		this.y += this.ySpeed
  }

  playerScored (): boolean {
    return this.x > this.canvasWidth + this.radius
  }

  computerScored (): boolean {
    return this.x < this.radius
  }


  reset () {
    this.x = this.canvasWidth / 2
		this.y = this.canvasHeight / 2
		
		this.xSpeed = this.randomBetween(3, 4)
		
		let isLeft = this.randomBetween(0, 1)
		
    if (isLeft) {
			this.xSpeed = -this.xSpeed;
		} 
		
		this.ySpeed = this.randomBetween(-3, 3)
  }

  randomBetween (min: number, max: number) {
    return Math.random() * (max - min) + min;
  }


  changeDirection () {
    this.xSpeed = -this.xSpeed
  }
}