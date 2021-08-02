import P5 from 'p5'
import 'p5/lib/addons/p5.dom'
import './styles.scss'
import { Paddle } from './paddle'
import { Ball } from './ball'

const sketch = (p5: P5) => {
	let player: Paddle
	let cpu: Paddle
	let ball: Ball

	p5.setup = () => {
		const canvas = p5.createCanvas(624, 351)
		canvas.parent('app')
		p5.background(0)
		player = new Paddle(26, p5.height / 2, p5.height, p5.width)
		cpu = new Paddle(p5.width - 48, p5.height / 2, p5.height, p5.width)
		ball = new Ball(p5.width, p5.height)
	}

	p5.draw = () => {
		p5.clear()
		p5.background(0)

		displayPaddle(player)
		displayPaddle(cpu)

		player.update()
		cpu.update()

		cpu.processArtificialMovement(ball.y)

		ball.update(player, cpu)
		displayBall(ball)

		handleCollision(player, cpu, ball)		

		p5.stroke(255)
		p5.line(p5.width / 2, 0, p5.width / 2, p5.height)
		p5.textSize(32)
		p5.fill(255)
		p5.text(player.getScore(), p5.width / 2 - 28, 30)
		p5.text(cpu.getScore(), p5.width / 2 + 10, 30)
	}

	p5.keyPressed = () => {
		if (p5.keyCode === p5.UP_ARROW) {
			player.isUp = true
		} else if (p5.keyCode === p5.DOWN_ARROW) {
			player.isDown = true
		}
	}

	p5.keyReleased = () => {
		if (p5.keyCode === p5.UP_ARROW) {
			player.isUp = false
		} else if (p5.keyCode === p5.DOWN_ARROW) {
			player.isDown = false
		}
	}

	function handleCollision (player: Paddle, cpu: Paddle, ball: Ball) {
		if (player.wasHitBy(ball) || cpu.wasHitBy(ball)) {
			ball.changeDirection()
		}
	}

	function displayPaddle (paddle: Paddle) {
		p5.stroke(255)
    p5.rect(paddle.x, paddle.y, 20, 80)
  }

  function displayBall (ball: Ball) {
		p5.stroke(255)
    p5.ellipse(ball.x, ball.y, ball.radius * 2, ball.radius * 2)
  }
};

new P5(sketch);
