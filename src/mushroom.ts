import { GameObject } from './game-object'
import { randomBetween } from './util'

export class Mushroom implements GameObject {
  active: boolean = false
  probabilityOfAppearence = 0.003
  x: number
  y: number
  private ySpeed: number
  private xSpeed: number
  private readonly canvasHeight: number
  private readonly canvasWidth: number
  readonly size = 30
  static readonly CANVAS_TOP = 0
  
  constructor (canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.reset()
  }

  update () {
    if (!this.active) {
      this.reset()
      return
    }

    if (this.crossedCanvas()) {
      this.active = false
      return
    }

    if (this.reachedTop() || this.reachedBottom()) {
			this.bounceOnY()
		}

    this.move()
  }

  crossedCanvas (): boolean {
    return this.x < -50
  }

  isActive (): boolean {
    return this.active
  }

  reset () {
    const shouldAppear = Math.random() <= this.probabilityOfAppearence
    if (!shouldAppear) {
      this.active = false
      return
    } 
    this.active = true
    const midWidth = this.canvasWidth / 2
    const midHeight = this.canvasHeight / 2
    this.x = midWidth
		this.y = midHeight
		this.xSpeed = -randomBetween(3, 4)
		this.ySpeed = randomBetween(-3, 3)
  }

  private move() {
    this.x += this.xSpeed
		this.y += this.ySpeed
  }

  private bounceOnY() {
    this.ySpeed = -this.ySpeed
  }

  private reachedTop (): boolean {
    return this.y < Mushroom.CANVAS_TOP
  }

  private reachedBottom (): boolean {
    return this.y > this.canvasHeight - this.size
  }
}