var iki, ikiAnimation, treeImage1, treeImage2, treeImage3, cloudImage, ground, bgImage, bgMount, bulletImage, bulletGroup, score = 0;
var rFly, rTank, rMob, robo1, robo2, robo3, flyGroup, tankGroup, mobGroup, isDead;

function preload(){

  ikiAnimation = loadAnimation("Assets/Run1.png","Assets/Run2.png","Assets/Run3.png","Assets/Run4.png","Assets/Run5.png","Assets/Run6.png");
  
  treeImage1 = loadImage("Assets/Tree1.png");
  treeImage2 = loadImage("Assets/Tree2.png");
  treeImage3 = loadImage("Assets/Tree3.png");

  bulletImage = loadImage("Assets/Laser.png");

  rFly = loadAnimation("Assets/R1_1.png","Assets/R1_2.png","Assets/R1_3.png","Assets/R1_4.png");
  rTank = loadAnimation("Assets/Tank_1.png","Assets/Tank_2.png");
  rMob = loadAnimation("Assets/R3_1.png","Assets/R3_2.png","Assets/R3_3.png","Assets/R3_4.png","Assets/R3_5.png","Assets/R3_6.png");

  cloudImage = loadImage("Assets/Cloud.png");

  bgImage = loadImage("Assets/Mountain.png");

}

function setup(){

  createCanvas(800,400);
  iki = createSprite(100,250,20,20);
  iki.scale = 2;
  iki.addAnimation("run",ikiAnimation);
  iki.setCollider("rectangle",0,5,60,45);
  
  tree();

  ground = createSprite(400,375,800,50);
  ground.shapeColor = "#C5A880";

  bgMount = createSprite(400,220,10,10);
  bgMount.addImage(bgImage);
  bgMount.scale = 1.7;

  bulletGroup = createGroup();

  flyGroup = createGroup();
  tankGroup = createGroup();
  mobGroup = createGroup();

  isDead = 0;
  
}

function draw(){
  
  background("#CAE4DB");
  drawSprites();

  bgMount.depth = 1;

  if(keyWentDown("space")&&isDead === 0){
    bullet();
  }

  worldTick();

  iki.collide(ground);

  iki.velocityY += 0.6;
  if(keyWentDown("up")){
    iki.velocityY = -10;
  }

  if(bulletGroup.isTouching(flyGroup)){
    flyGroup.destroyEach();
    score+=300;
  }

  if(bulletGroup.isTouching(tankGroup)){
    tankGroup.destroyEach();
    score+=400;
  }

  if(bulletGroup.isTouching(mobGroup)){
    mobGroup.destroyEach();
    score+=500;
  }

  fill("black");
  text("Score: "+Math.floor(score/10),40,20);
  text("Attack the robots for score bonuses",40,40);

  textSize(24);
  text("IKI'S ADVENTURE",550,40);

  if(iki.isTouching(flyGroup) || iki.isTouching(tankGroup) || iki.isTouching(mobGroup) || isDead === 1){

    death();

  }

}

function worldTick(){

  var randTick = Math.floor(Math.random() * 500);

  if(randTick>495){
    var rand = Math.floor(random(1,3.99));

    if (rand === 1){
      roboFly();
    } else if (rand === 2){
      roboTank();
    } else if (rand === 3){
      roboMob();
    } else{
      roboFly();
    }
  }

  randTick = Math.floor(Math.random() * 500);

  if(randTick>480){
    tree();
  }

  randTick = Math.floor(Math.random() * 500);

  if(randTick>480){
    cloud();
  }

  ground.depth = iki.depth+1;

  score+=1;

}

function tree(){
  
  var tree = createSprite(900,315,10,10);
  tree.velocityX = -2;
  tree.lifetime = 480;
  
  var rand = Math.round(random(1,3));

  if (rand === 1){
    tree.addImage(treeImage1);
  } else if (rand === 2){
    tree.addImage(treeImage2);
  } else if (rand === 3){
    tree.addImage(treeImage3);
  } else{
    tree.addImage(treeImage1);
  }

  tree.scale = 3;
  iki.depth = tree.depth+1;
  
}

function cloud(){
  
  var cloud = createSprite(900,Math.round(random(40,120)),10,10);
  cloud.velocityX = -2;
  cloud.lifetime = 480;
  cloud.addImage(cloudImage);

  cloud.scale = 3;
  iki.depth = cloud.depth+1;
  
}

function bullet(){

  var bullet = createSprite(iki.x + 50,iki.y - 7,40,40);
  bullet.velocityX = 5;
  bullet.lifetime = 85;

  bullet.setCollider("rectangle",0,0,10,2.5);

  bullet.addImage(bulletImage);
  bullet.scale = 2;

  bulletGroup.add(bullet);
  
}

function roboFly(){
  
  robo1 = createSprite(900,300,10,10);
  robo1.addAnimation("fly",rFly);
  robo1.velocityX = -4;
  robo1.scale = 2;
  robo1.setCollider("circle",0,0,10);
  console.log("1");
  flyGroup.add(robo1);

}

function roboTank(){

  robo2 = createSprite(900,307,10,10);
  robo2.addAnimation("tank",rTank);
  robo2.velocityX = -4.5;
  robo2.scale = 2.5;
  console.log("2");
  tankGroup.add(robo2);
  robo2.setCollider("rectangle",0,0,35,30);

}

function roboMob(){

  robo3 = createSprite(900,315,10,10);
  robo3.addAnimation("mob",rMob);
  robo3.velocityX = -3;
  robo3.scale = 2;
  console.log("3");
  mobGroup.add(robo3);
  robo3.setCollider("rectangle",0,0,50,30);


}

function death(){

  textAlign(CENTER,CENTER);
  textSize(30);
  fill("black")
  text("You lost. Try again!",400,200);

  iki.visible = false;
  bulletGroup.destroyEach();
  isDead = 1;

}