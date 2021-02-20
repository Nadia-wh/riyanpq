
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var player, bgimage, playerimage, edges, soccerballimg, defenderimage, soccerball, defender1, defender2, defender3, defender4, gameState, playerimage2, defenderimage2, goalie, goalieimage, homepage, bgimage2, timer, kickGameState, youlose, gameoverimg, gameover, youwinsound, bg, youwinimg, youwin
function preload(){
  bgimage = loadImage('soccerField.png')
  soccerballimg = loadImage('soccerball.png')
  playerimage = loadImage('francis.png')
  playerimage2 = loadImage('FrancisForward.png')
  defenderimage = loadImage('defender.png')
  defenderimage2 = loadImage('DefenderForward.png')
  goalieimage = loadImage('defender.png')
  bgimage2 = loadImage('soccerplayer.jpg')
  homepage = new Form()
  youlose = loadSound("gameover.mp3")
  gameoverimg = loadImage('gameover.jpg')
  youwinsound = loadSound('youwin.mp3')
  youwinimg = loadImage('youwin.jpg')

}

function setup() {
	createCanvas(windowWidth, windowHeight)
  player = createSprite(windowWidth/2, (windowHeight - 7)/2)
  player.addAnimation('player', playerimage)
  player.addAnimation('player2', playerimage2)
  player.scale = 0.5
  player.visible = false

  soccerball = createSprite(player.x, player.y - 130)
  soccerball.addAnimation('soccerball', soccerballimg)
  soccerball.scale = 0.15
  soccerball.visible = false

  // defender 1
  defender1 = createSprite(windowWidth/2 - 200, (player.position.y - 800))
  defender1.addAnimation('defender2', defenderimage2)
  defender1.addAnimation('defender', defenderimage)
  defender1.scale = 0.4
  defender1.visible = false

  // defender 2
  defender2 = createSprite(windowWidth/2 + 200, (player.position.y - 800))
  defender2.addAnimation('defender2', defenderimage2)
  defender2.addAnimation('defender', defenderimage)
  defender2.scale = 0.4
  defender2.visible = false

  // defender 3
  defender3 = createSprite(windowWidth/2 + 200, (player.position.y - 1600))
  defender3.addAnimation('defender2', defenderimage2)
  defender3.addAnimation('defender', defenderimage)
  defender3.scale = 0.4
  defender3.visible = false

  // defender 4
  defender4 = createSprite(windowWidth/2 - 200, (player.position.y - 1600))
  defender4.addAnimation('defender2', defenderimage2)
  defender4.addAnimation('defender', defenderimage)
  defender4.scale = 0.4
  defender4.visible = false

  goalie = createSprite(windowWidth/2 - 400, player.position.y - 1450)
  goalie.addAnimation('goalie', goalieimage)
  goalie.scale = 0.4
  goalie.visible = false

  homepage.display()
  gameState = 4
  player.setCollider('circle', 0, 0, 200)
  soccerball.setCollider('circle', 0, 0, 225)
  defender1.setCollider('circle', 0, 0, 240)
  defender2.setCollider('circle', 0, 0, 240)
  defender3.setCollider('circle', 0, 0, 240)
  defender4.setCollider('circle', 0, 0, 240)
  goalie.setCollider('circle', 0, 0, 240)
  timer = 40
  kickGameState = null
  gameover = createSprite(player.x, player.y)
  gameover.addAnimation('gameover', gameoverimg)
  gameover.visible = false
  youwin = createSprite(player.x, player.y)
  youwin.addAnimation('youwin', youwinimg)
  youwin.visible = false
  youwin.scale = 1.75
  timer = 40 
  timeLimit = 0
  

}


function draw() {
  rectMode(CENTER);
  imageMode(CENTER)
  background(255);
  console.log(camera.position.x)
  console.log(camera.position.y)
  gameover.x = camera.position.x
  gameover.y = camera.position.y
  youwin.x = camera.position.x
  youwin.y = camera.position.y
  if (gameState != 0){
    soccerball.x = player.x
  }
  if (gameState == 1){
    player.visible = true
    defender1.visible = true
    defender2.visible = true
    defender3.visible = true
    defender4.visible = true
    goalie.visible = true
    soccerball.visible = true

  }
  defender1.bounceOff(defender2)
  defender1.bounceOff(defender3)
  defender1.bounceOff(defender4)
  defender2.bounceOff(defender3)
  defender2.bounceOff(defender4)
  defender3.bounceOff(defender4)

  if (soccerball.isTouching(defender1)){
    gameState = 0
  }
  if (soccerball.isTouching(defender2)){
    gameState = 0
  }
  if (soccerball.isTouching(defender3)){
    gameState = 0
  }
  if (soccerball.isTouching(defender4)){
    gameState = 0
  }
  if (soccerball.isTouching(goalie)){
    gameState = 0
  }
  if (gameState == 0){
    camera.position.x = 720
    camera.position.y = 394.5
    player.visible = false
    soccerball.visible = false
    defender1.visible = false
    defender2.visible = false
    defender3.visible = false
    defender4.visible = false
    goalie.visible = false
    gameover.visible = true
    youlose.play()
    noLoop()  

  }
  if (gameState != 0){
    if (player.y > defender1.y && gameState != 0 && gameState != 4 && gameState != 3){
      defender1.velocityY = 7
    }
    if (player.y < defender1.y && gameState != 0 && gameState != 4 && gameState != 3){
      defender1.velocityY = -7
    }
    if (player.x < defender1.x && gameState != 0 && gameState != 4 && gameState != 3){
      defender1.velocityX = -7
    }
    if (player.x > defender1.x && gameState != 0 && gameState != 4 && gameState != 3){
      defender1.velocityX = 7
    }


    // Second defender 
    if (player.y > defender2.y && gameState != 0 && gameState != 4 && gameState != 3){
      defender2.velocityY = 7
    }
    if (player.y < defender2.y && gameState != 0 && gameState != 4 && gameState != 3){
      defender2.velocityY = -7
    }
    if (player.x < defender2.x && gameState != 0 && gameState != 4 && gameState != 3){
      defender2.velocityX = -7
    }
    if (player.x > defender2.x && gameState != 0 && gameState != 4 && gameState != 3){
      defender2.velocityX = 7
    }

    // Third defender
    if (player.y > defender3.y && gameState != 0 && gameState != 4 && gameState != 3){
      defender3.velocityY = 7
    }
    if (player.y < defender3.y && gameState != 0 && gameState != 4 && gameState != 3){
      defender3.velocityY = -7
    }
    if (player.x < defender3.x && gameState != 0 && gameState != 4 && gameState != 3){
      defender3.velocityX = -7
    }
    if (player.x > defender3.x && gameState != 0 && gameState != 4 && gameState != 3){
      defender3.velocityX = 7
    }

    // Fourth defender
    if (player.y > defender4.y && gameState != 0 && gameState != 4 && gameState != 3){
      defender4.velocityY = 7
    }
    if (player.y < defender4.y && gameState != 0 && gameState != 4 && gameState != 3){
      defender4.velocityY = -7
    }
    if (player.x < defender4.x && gameState != 0 && gameState != 4 && gameState != 3){
      defender4.velocityX = -7
    }
    if (player.x > defender4.x && gameState != 0 && gameState != 4 && gameState != 3){
      defender4.velocityX = 7
    }

    // Goalie
    if (goalie.position.x <= windowWidth/2 - 400 && gameState != 0 && gameState != 4 && gameState != 3){
      goalie.velocityX = 50
    }
    if (goalie.position.x >= windowWidth/2 + 400 && gameState != 0 && gameState != 4 && gameState != 3){
      goalie.velocityX = -50
    }

  }

  if (frameCount % 40 == 0 && timer > 0  && gameState != 0 && gameState != 4 && gameState != 3){ 
    timer --;
  }
  if (timer == 0){
    gameState = 0
    gameover.visible = true
  }
  if(keyDown(RIGHT_ARROW) && gameState != 0 && gameState != 4 && gameState != 3 || touches.length > 0 && player.overlapPoint(touches[0].x, touches[0].y)){
    if (camera.position.x >= 1150 || touches.length > 0){
      camera.position.x -= 10
    }
    if (player.position.x >= 290){
      camera.position.x += 10
    }
    if (player.position.x <= 1805){
      player.position.x += 10
    }
    touches = [0]

  }
  if (keyDown(UP_ARROW) && gameState != 0 && gameState != 4 && gameState != 3 || touches.length > 0 && player.overlapPoint(touches[0].x, touches[0].y)){
    if (camera.position.y >= -990 || touches.length > 0){
      camera.position.y -= 10
    }
    if (player.position.y >= -1239){
      player.position.y -= 10
    }
    if (player.position.y >= 1771){
      camera.position.y += 10
    }

    player.changeAnimation('player')
    soccerball.y = player.y - 130
    touches = [0]
  }

  if(keyDown(DOWN_ARROW) && gameState != 0 && gameState != 4 && gameState != 3 || touches.length > 0 && player.overlapPoint(touches[0].x, touches[0].y)){
    if (camera.position.y <= 1771 || touches.length > 0){
      camera.position.y += 10
    }
    if (player.position.y <= 2021){
      player.position.y += 10
    }
    if (player.position.y <= -990){
      camera.position.y -= 10
    }
    player.changeAnimation('player2')
    
    soccerball.y = player.y + 130
    touches = [0]
  } 



  if(keyDown(LEFT_ARROW) && gameState != 0 && gameState != 4 && gameState != 3 || touches.length > 0 && player.overlapPoint(touches[0].x, touches[0].y)){
    if (camera.position.x >= 290 || touches.length > 0){
      camera.position.x -= 10
    }
    if (player.position.x >= 1150){
      camera.position.x += 10
    }
    if (player.position.x >= -365){
      player.position.x -= 10
    }
    touches = [0]
  }
  if (defender1.velocityY < 0){
    defender1.changeAnimation('defender2')
  }
  if (defender2.velocityY < 0){
    defender2.changeAnimation('defender2')
  }
  if (defender3.velocityY < 0){
    defender3.changeAnimation('defender2')
  }
  if (defender4.velocityY < 0){
    defender4.changeAnimation('defender2')
  }
  if (defender1.velocityY > 0){
    defender1.changeAnimation('defender')
  }
  if (defender2.velocityY > 0){
    defender2.changeAnimation('defender')
  }
  if (defender3.velocityY > 0){
    defender3.changeAnimation('defender')
  }
  if (defender4.velocityY > 0){
    defender4.changeAnimation('defender')
  }
  if (defender1.position.y == player.position.y){
    defender1.changeAnimation('defender')
  }

  if (player.position.y <= -1170 && player.position.x >= 560 && player.position.x <= 870){
    gameState = 3

  }
  if (gameState == 3){
    player.visible = false
    soccerball.visible = false
    defender1.visible = false
    defender2.visible = false
    defender3.visible = false
    defender4.visible = false
    goalie.visible = false
    youwinsound.play()
    youwin.visible = true
    noLoop()
  }
  if (gameState != 4 && gameState != 0 && gameState != 3){
    rectMode(CENTER)
    image(bgimage, windowWidth/2, (windowHeight - 7)/2, 2400, 3632)
  }
  if (gameState == 4){
    rectMode(CENTER)
    image(bgimage2, windowWidth/2, windowHeight/2)
  }
  drawSprites();
  if (gameState != 0 && gameState != 4 && gameState != 3){
    fill(0)
    textSize(20)
    text(timer + ' sec remaining', player.position.x - 60, player.position.y - 300)
  }

 
}
class Form{
  constructor() {
    this.button = createButton('Play');
    this.title = createElement('h2');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Soccer Game");
    this.title.position(displayWidth/2 - 70, 0);
    this.title.style('color', '#ffff00')
    this.title.size('font-size', '60px')
    this.button.position(displayWidth/2 - 50, displayHeight/2 - 200, 20, 20);
    this.button.style('color', '#ff0000')
    this.button.size(100)
    this.button.style('font-size', '40px')

    this.button.mousePressed(()=>{
      this.title.hide();
      this.button.hide();
      gameState = 1
    });
  }
}





// Gamestates: 0 = lose, 1 = playing, 2 = playing2, 3 = win, 4 = homepage