//Estados del Juego
var PLAY=1;
var END=0;
var gameState=1;

var tower, towerImage
var door, doorImage
var ghostAnimation, ghost 
var doorGroup, ClimberGroup
var recta
var musicafea
function preload() {
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  musicafea = loadSound("spooky.wav")
  ghostAnimation = loadAnimation("ghost-jumping.png", "ghost-standing.png") 
}
function setup() {
createCanvas(400,400)

//fondo
 tower = createSprite(width/2,height/2,300,300);
 tower.addImage(towerImage);
 tower.scale = 0.7;

 ghost = createSprite(width/2,height/2+100,20,20)
 ghost.addAnimation("ghost",ghostAnimation)
 ghost.scale = 0.3;
 
 recta = createSprite(width/2,400,400,10)
 recta.visible = false;

  musicafea.play();
  
  doorGroup = new Group();
  ClimberGroup = new Group();
 
}

function draw() {
 background(0);
drawSprites();


 
   
  if (tower.y > height){
      tower.y = height/2;
    }
    //establece velocidad de cada objeto del juego en 0
    tower.velocityY = 1;
  ghost.collide(ClimberGroup);
  if(gameState===PLAY){
    
    //Llama la función de frutas y Monstruo
     spawnDoor();

    //Mueve la espada/cuchillo con el ratón
 
    if (keyDown("LEFT_ARROW")){
   ghost.x = ghost.x-5
 }
   if (keyDown("RIGHT_ARROW")){
   ghost.x = ghost.x+5
 }
  if(keyDown("space")){
    ghost.velocityY = - 10
  }  
  ghost.velocityY = ghost.velocityY + 0.8

    if(ghost.isTouching(recta)){
  gameState=END;  
  console.log("holasaaaaa")
  ClimberGroup.destroyEach();
  doorGroup.destroyEach();
  ghost.destroy();
    }
  }
  else if(gameState === END){
  tower.velocityY = 0;
  textSize(30)
  fill("black")
  textAlign(CENTER)
    text("perdiste mijo=/",width/2,      height/2);
      musicafea.pause();
        
  }
    


}
function spawnDoor() {
  //escribe el código aquí para aparecer las nubes
  if (frameCount % 300 === 0) {
    var door =createSprite(400,-50,10,10);
    door.x = Math.round(random(50,350));
    door.addImage(doorImage);
   
    door.velocityY = 1
 
    
     //asigna ciclo de vida a la variable
    door.lifetime = 400;
    
    //ajusta la profundiad
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    //agrega cada nube al grupo
    doorGroup.add(door);
    
    var climber = createSprite(door.x,-1,50,20);
      climber.velocityY = 1;
         //asigna ciclo de vida a la variable
    climber.lifetime = 400;
    ClimberGroup.add(climber);
  }

}