import { Ball } from './ball'
import { Paddle } from './paddle'

export class Player extends Paddle {
  wasReachedBy (ball: Ball): boolean {
    return (ball.x - ball.radius <= this.x + this.width && ball.x > this.x) 
      && this.isAtTheSameHeightOf(ball)
  }
}