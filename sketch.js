var robot, robotImg;
var invisibleGround;
var edges;

var virus, virusGroup, virusImg1, virusImg2, virusImg3, virusImg4;

function preload(){
	//loading the robot's image
	robotImg = loadImage("Images/PC-Robot.png");

	virusImg1 = loadImage("Images/Virus-1.png");
	virusImg2 = loadImage("Images/Virus-2.png");
	virusImg3 = loadImage("Images/Virus-3.png");
	virusImg4 = loadImage("Images/Virus-4.png")
}

function setup() {
	createCanvas(850, 500);

	//creating the PC - robot
	robot = createSprite(70, 470, 10, 10);
	robot.addImage(robotImg);
	robot.scale = 0.17;

	//creating an invisible ground
	invisibleGround = createSprite(500,480,1000,20);
	invisibleGround.shapeColor = "grey";
  	/*invisibleGround.visible = false;*/

	//creating groups
	virusGroup = createGroup();
  
}

function draw() {
  background(180);
  edges = createEdgeSprites();

  //colliding the robot with the bottom edge
  robot.collide(invisibleGround);

  //to enable the robot to jump
  if(keyDown(UP_ARROW) || touches.length > 0){
	  robot.velocityY = -10;
  }

  //adding gravity to the robot
  robot.velocityY+= 0.4;

  //setting velocity of the ground
  invisibleGround.velocityX = -3;

  //reseting the ground
  if (invisibleGround.x < 260){
	invisibleGround.x = invisibleGround.width/2;
  };

  //calling the functions
  spawnVirus();

  if(virusGroup.isTouching(robot)){
	  robot.velocityY = 0;
	  invisibleGround.velocityX = 0;
	  virusGroup.setVelocityXEach(0);
	  virusGroup.setLifetimeEach(-1);
  }

  fill("black");
  textSize(25);
  textFont("Georgia");
  text("Press the UP arrow key to make the robot jump", 150, 50);
  
  drawSprites();
 
}

function spawnVirus(){
	if(frameCount % 180 === 0){
		//creating the virus sprite and adding characteristics
		virus = createSprite(850, random(340, 450), 10, 10);
		virus.velocityX = -3;
		virus.scale = 0.2;
		virus.lifetime = 285;

		//adding images to the virus sprite
		var rand = Math.round(random(1, 4));
		switch(rand){
			case 1: virus.addImage(virusImg1);
					break;
			case 2: virus.addImage(virusImg2);
					break;
			case 3: virus.addImage(virusImg3);
					break;
			case 4: virus.addImage(virusImg4);
					break;
		}

		//definging the depths
		virus.depth = robot.depth;
		robot.depth+=1;

		//adding the individual virus sprite to the virus group
		virusGroup.add(virus);
	}
}

