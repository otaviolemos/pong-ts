import { Ball } from './ball';
import { Paddle } from './paddle'

export class CPU extends Paddle {
  processMovement (ballHeight: number) {
    let middleOfPaddle = this.y + this.height / 2;
    
    if (middleOfPaddle > ballHeight) {
      this.isUp = true;
      this.isDown = false;
    } else {
      this.isDown = true;
      this.isUp = false;
    }
  }

  wasReachedBy (ball: Ball): boolean {
    return ball.x + ball.radius >= this.x && ball.x <= this.x + this.width
      && this.isAtTheSameHeightOf(ball)
  }
}