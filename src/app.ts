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
		const middleOfCanvas = p5.height / 2
		player = new Paddle(26, middleOfCanvas, p5.height, p5.width)
		cpu = new Paddle(p5.width - 48, middleOfCanvas, p5.height, p5.width)
		ball = new Ball(p5.width, p5.height)
	}

	p5.draw = () => {
		clearScreen()
		displayObjects()
		displayLine()
		displayScores()
		updateObjects()
		handleCollision()		
	}

	p5.keyPressed = () => {
		if (p5.keyCode === p5.UP_ARROW) {
			return player.shouldGoUp = true
		} 
		
		if (p5.keyCode === p5.DOWN_ARROW) {
			return player.shouldGoDown = true
		}
	}

	p5.keyReleased = () => {
		if (p5.keyCode === p5.UP_ARROW) {
			return player.shouldGoUp = false
		}  
		
		if (p5.keyCode === p5.DOWN_ARROW) {
			return player.shouldGoDown = false
		}
	}

	function clearScreen () {
		p5.clear()
		p5.background(0)
	}

	function displayObjects () {
		displayPaddle(player)
		displayPaddle(cpu)
		displayBall(ball)
	}

	function displayLine () {
		p5.stroke(255)
		p5.line(p5.width / 2, 0, p5.width / 2, p5.height)
	}

	function displayScores () {
		p5.textSize(32)
		p5.fill(255)
		p5.text(player.getScore(), p5.width / 2 - 28, 30)
		p5.text(cpu.getScore(), p5.width / 2 + 10, 30)
	}

	function updateObjects () {
		player.update()
		cpu.update()
		ball.update(player, cpu)
		cpu.processArtificialMovement(ball.y)
	}

	function handleCollision () {
		if (player.wasHitBy(ball) || cpu.wasHitBy(ball)) {
			ball.bounceOnX()
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
