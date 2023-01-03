// variable for score and gameState
var score=0, gameState=0, time = 0, HS = 0;
//variables for sprites
var button, restart, pause, unpause, sloth, tree;
var branch1, branch2, branchGro;
var fruit, fruitGro;
var decor, planet1Img, planet2Img, planet3Img, planeImg, birdAni, satelliteImg, DecorGro;
//variables for images
var buttonImg, restartImg, pauseImg, unpauseImg, slothAni, slothIdle, slothSlp, treeImg, branch1Img, branch2Img, appleImg, bananaImg, orangeImg;
//Variables for the background
var Bg, backgroundImg,backmusic;

function preload() {
  //Loads buttons
  buttonImg = loadImage("Images/play button.png");
  restartImg = loadImage("Images/reset button.png");
  pauseImg = loadImage("Images/pause.png");
  unpauseImg = loadImage("Images/unpause.png");

  backmusic = loadSound("background_music.mp3");

  //Loads sloth and tree

  slothAni = loadAnimation("Images/Sloth/sloth-1.png", "Images/Sloth/sloth-2.png", "Images/Sloth/sloth-3.png");
  slothIdle = loadImage("Images/Sloth/sloth-1.png");
  slothSlp = loadAnimation("Images/Sloth/sloth-4.png","Images/Sloth/sloth-4.png",
   "Images/Sloth/sloth-5.png","Images/Sloth/sloth-5.png", "Images/Sloth/sloth-6.png","Images/Sloth/sloth-6.png");
  treeImg = loadImage("Images/treebark.jpg");

  //Loads branchs
  branch1Img = loadImage("Images/tree branch1.jpg");
  branch2Img = loadImage("Images/tree branch2.png");

  //loads fruits
  appleImg = loadImage("Images/apple.png");
  bananaImg = loadImage("Images/banana.png");
  orangeImg = loadImage("Images/orange.png");

  //loads backgrounds
  backgroundImg = loadImage("Images/Background.png");

  //loads Decorations
  planet1Img = loadAnimation("Images/planet1.png");
  planet2Img = loadAnimation("Images/planet2.png");
  planet3Img = loadAnimation("Images/planet3.png");
  planeImg = loadAnimation("Images/airplane.png");
  birdAni = loadAnimation("Images/Bird/bird1.png","Images/Bird/bird2.png","Images/Bird/bird3.png","Images/Bird/bird4.png","Images/Bird/bird5.png","Images/Bird/bird6.png","Images/Bird/bird7.png","Images/Bird/bird8.png","Images/Bird/bird9.png")
  satelliteImg = loadAnimation("Images/satellite.png");
}

function setup() {
  //Makes Canvas
  createCanvas(displayWidth,displayHeight);
  //Makes Branch Group
  branchGro = new Group();
  fruitGro = new Group();
  //Makes Background
  Bg = createSprite(displayWidth/2 -4,-displayHeight*4 ,displayWidth+10, -displayHeight*5);
  Bg.addImage("bg", backgroundImg);
  Bg.scale = 1.5;
  Bg.y = Bg.height/500 - 5800;
  //Bg.setCollider("rectangle",0,- displayHeight*100,displayWidth,displayHeight);
  //Makes Tree
  tree = createSprite(displayWidth/2, displayHeight/2, displayWidth/1.8, displayHeight);
  tree.addImage(treeImg)
  tree.scale = 2;
  tree.velocityY= 0;
  
  //Makes Sloth
  sloth = createSprite(displayWidth/2, displayHeight/1.8, 100, 50);
  sloth.addAnimation("idle", slothIdle);
  sloth.addAnimation("climbing", slothAni);
  sloth.addAnimation("sleep", slothSlp);
  sloth.scale = 0.8;
  sloth.setCollider("rectangle",0,10,85,160);
  //Makes play button
  button = createSprite(displayWidth/2,displayHeight/3,50,50);
  button.addImage(buttonImg)
  button.scale = 0.2;
  button.visible = true;
  
  //Makes reset button
  restart = createSprite(displayWidth/2,displayHeight/2+50,50,50);
  restart.addImage(restartImg)
  restart.visible = false;

  //Makes pause button
  pause = createSprite(displayWidth*0.95,displayHeight/15,50,50);
  pause.addImage(pauseImg)
  pause.scale = 0.2;
  pause.visible = false;

  //Makes unpause button
  unpause = createSprite(displayWidth*0.95,displayHeight/5.6,50,50);
  unpause.addImage(unpauseImg)
  unpause.scale = 0.2;
  unpause.visible = false;
}

function draw() {
  background(0);
 // backmusic.play()
  //sloth.debug = true;

  //Start
  if(gameState === 0) {
    sloth.changeAnimation("idle", slothIdle);
    pause.visible = false;

    button.visible = true;
    if(mousePressedOver(button) && gameState === 0) {
      gameState=1;
      button.visible = false;
    }
  }

  //Play
  if(gameState === 1) {
    
    Bg.velocityY = 2.5;
    sloth.changeAnimation("climbing", slothAni);

    //Makes pause button visible
    pause.visible = true;

    //When pause is pressed pause game
    if(mousePressedOver(pause) && gameState === 1) {
      pause.visible = false;
      gameState = 4;
    }

    //Changes Bg
    if(Bg.y > 6700) {
      Bg.y = 6000;
    }

    //Makes the tree reset to make it look like its moving
    if(tree.y > height){
      tree.y = height/2;
    }

    //Makes the sloth move with arrow key
    if(keyDown("right") && sloth.x < 1280){
      sloth.x += 7;
    }
      if(keyDown("left") && sloth.x > 252){
      sloth.x -= 7;
    }

    //Speed
    time = time + Math.round(getFrameRate()/60);
    tree.velocityY= (4 + time/1000);
    branchGro.setVelocityYEach(4 + time/1000);
    fruitGro.setVelocityYEach(4 + time/1000);
    //console.log(4+ time/100)

    //Makes score increase when fruit is touched
    if(sloth.isTouching(fruitGro)) {
      score += 5;
      //Mades the sloth move up on the tree
      if(sloth.y > displayHeight/1.8){
        sloth.y-=10;
      }
      fruitGro.destroyEach();
    }

    sloth.velocityY = 0;

    //Pushes the sloth off of the branches
    if(sloth.isTouching(branchGro)) {
      sloth.velocityY = (4.3 + time/100);
    }

    //If the sloth falls off the screen then Game Over
    if(sloth.y >= displayHeight) {
      gameState=3;
    }

    Branches();
    Fruits();
    Decorations();
  }
  
  //End
  if(gameState === 3) {
    Bg.velocityY = 0;
    sloth.changeAnimation("sleep", slothSlp);
    sloth.velocityY = 0;
    tree.velocityY = 0;
    branchGro.setVelocityYEach(0);
    fruitGro.setVelocityYEach(0);
    branchGro.setLifetimeEach(-1);
    fruitGro.setLifetimeEach(-1);

    restart.visible = true;
    restart.depth = sloth.depth + 5;
    if(mousePressedOver(restart) && gameState===3) {
      restart.visible = false;
      sloth.y = displayHeight/1.8;
      sloth.x = displayWidth/2;
      Bg.y = Bg.height/500 - 5800;
      branchGro.destroyEach();
      fruitGro.destroyEach();
      time = 0;
      gameState=0;
      score = 0;
    }
  }

  //Pause
  if(gameState === 4) {
    unpause.visible = true;
    Bg.velocityY = 0;
    sloth.changeAnimation("sleep", slothSlp);
    sloth.velocityY = 0;
    tree.velocityY = 0;
    branchGro.setVelocityYEach(0);
    fruitGro.setVelocityYEach(0);
    branchGro.setLifetimeEach(-1);
    fruitGro.setLifetimeEach(-1);

    //Makes game resume when pause is pressed again
    if(mousePressedOver(unpause) && gameState === 4) {
      gameState = 1;
      unpause.visible = false;
    }
  }

 drawSprites();

 //Instructions
 if(gameState === 0) {
  push()
   textSize(25)
   textFont("Georgia")
   textAlign(TOP)
   fill('red')
   text("Help the sloth collect fruit to climb the tree.", displayWidth/2.8, displayHeight/7);
   text("Watch out for oncoming branches!", displayWidth/2.6, displayHeight/5);
   pop()
 }

 //Makes game over appear
 if (gameState === 3) {
   push()
   textSize(50)
   textFont("bold")
   fill('red')
   text("GAME OVER", displayWidth/2-150, displayHeight/5+100);
   pop()
 }

  //Makes text for score
  push()
  textSize(35);
  fill('red')
  text("Score: "+score, 50,50)
  pop() 
  
  //Makes High Score
  if(HS<score){
    HS = score;
  }
  push()
  textSize(35);
  fill('red')
  text("High Score: "+HS, 10,100)
  pop()  
  
  /*
 fill('white')
  text(mouseX+","+mouseY,mouseX,mouseY);
  */
}

function Branches() {
  if(frameCount % 200 === 0) {
    
    var leftLocation = Math.round(random(252,717));

    var rightLocation = Math.round(random(750,1280));

    branch1 = createSprite(leftLocation,-30,20,20);
    branch1.addImage(branch1Img);
    branch1.scale = 0.13;
    branch1.velocityY = 4;
    branch1.lifetime = 300;
    branchGro.add(branch1);

    branch2 = createSprite(rightLocation,-30,20,20);
    branch2.addImage(branch2Img);
    branch2.scale = 0.13;
    branch2.velocityY = 4;
    branch2.lifetime = 300;
    branchGro.add(branch2);

    sloth.depth = branch1.depth;
    sloth.depth = branch2.depth;
    sloth.depth+= 1;

    branch1.setCollider("rectangle",0,0,1900,350);
    branch2.setCollider("rectangle",0,150,1900,300);
    //branch1.debug = true;
    //branch2.debug = true;
  }
} 

function Fruits() {
  if(frameCount % 150 === 0) {
    fruit = createSprite(Math.round(random(252,1280)),-30,20,20)
    fruit.velocityY = 4;
    //fruit.debug = true;

    var rand = Math.round(random(1,3))
    switch(rand) {
      case 1: fruit.addImage(appleImg);
      break;
      case 2: fruit.addImage(bananaImg);
      break;
      case 3: fruit.addImage(orangeImg);
      break;
    }

    fruitGro.add(fruit);
    fruit.depth = sloth.depth + 1;
    fruit.lifeTime = 300;
  }
}

function Decorations() {
  //Makes Decorations
  if(frameCount % 180 === 0){
    decor = createSprite(displayWidth/2, displayHeight/2, 50,50);
    decor.velocityX = Math.round(random(-4,4));
    decor.velocityY = Math.round(random(-4,4));

    if(Bg.y < -3600) {
      decor.addAnimation("deco",birdAni);
      decor.scale = 0.3;
      decor.velocityX = Math.round(random(0,4));
    }
   else if(Bg.y < 1000)
   {
    decor.addAnimation("deco",planeImg);
    decor.scale = 0.05;
    decor.velocityX = Math.round(random(-4,0));
   }
   else {
    var img = Math.round(random(1,4));
    switch(img) {
      case 1: decor.addAnimation("deco",planet1Img);
              decor.scale = 1;
      break;
      case 2: decor.addAnimation("deco",planet2Img);
              decor.scale = 0.1;
      break;
      case 3: decor.addAnimation("deco",planet3Img);
              decor.scale = 0.2;
      break;
      case 4: decor.addAnimation("deco",satelliteImg);
      decor.scale = 0.1;
      break;
    }
   }

    decor.lifetime = 700;
    decor.depth = tree.depth - 1;
  }
}