import P5, { Image, SoundFile } from 'p5'
import 'p5/lib/addons/p5.dom'
import 'p5/lib/addons/p5.sound'
import './styles.scss'
import { Paddle } from './paddle'
import { Ball } from './ball'
import { Mushroom } from './mushroom'

const sketch = (p5: P5) => {
	let player: Paddle
	let cpu: Paddle
	let ball: Ball
	let mushroomImage: Image
	let mushroom: Mushroom
	let hitSound: SoundFile
	let powerUpSound: SoundFile
	let backgroundMusic: SoundFile
	let growCount = 0

	p5.preload = () => {
		const loadSound = (path: string) =>
			((p5 as any) as SoundFile).loadSound(path)
		mushroomImage = p5.loadImage('assets/mushroom.png')
		hitSound = loadSound('assets/hit.wav')
		powerUpSound = loadSound('assets/power-up.mp3')
		backgroundMusic = loadSound('assets/background-music.mp3')
	}

	p5.setup = () => {
		const canvas = p5.createCanvas(624, 351)
		canvas.parent('app')
		p5.background(0)
		const middleOfCanvas = p5.height / 2
		player = new Paddle(26, middleOfCanvas, p5.height, p5.width)
		cpu = new Paddle(p5.width - 48, middleOfCanvas, p5.height, p5.width)
		ball = new Ball(p5.width, p5.height)
		mushroom = new Mushroom(p5.width, p5.height)
		powerUpSound.setVolume(1.1)
		backgroundMusic.setVolume(0.1)
		backgroundMusic.loop()
	}

	p5.draw = () => {
		clearScreen()
		displayObjects()
		displayLine()
		displayScores()
		updateObjects()
		if (slowerRefresh()) {
			processGrowth()
		}
		handleCollision()
	}

	function slowerRefresh (): boolean {
		return p5.frameCount % 20 === 0
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
		if (mushroom.isActive()) {
			displayMushroom(mushroom)
		}
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
		mushroom.update()
		cpu.processArtificialMovement(ball.y)
	}

	function processGrowth () {
		if (player.shouldGrow && growCount < 3) {
			player.goUp()
			player.growBy(4)
			growCount++
			return
		}

		if (growCount === 3) {
			growCount = 0
			player.stopGrowing()
		}
	}

	function handleCollision () {
		if (player.wasHitBy(ball) || cpu.wasHitBy(ball)) {
			ball.bounceOnX()
			hitSound.play()
		}

		if (mushroom.isActive() && player.wasTouchedBy(mushroom)) {
			powerUpSound.play()
			mushroom.reset()
			player.startGrowing()
		}
	}

	function displayPaddle (paddle: Paddle) {
		p5.stroke(255)
    p5.rect(paddle.x, paddle.y, paddle.width, paddle.height)
  }

  function displayBall (ball: Ball) {
		p5.stroke(255)
    p5.ellipse(ball.x, ball.y, ball.radius * 2, ball.radius * 2)
  }

	function displayMushroom (mushroom: Mushroom) {
		p5.stroke(255)
		p5.image(mushroomImage, mushroom.x, mushroom.y, mushroom.size, mushroom.size)
  }
};

new P5(sketch);
