var canvas;
var ship;
var target = [];
var bullets  = [];
var player;
var playerRight;
var playerLeft;
var speedFx = [];
var workCloud, aboutCloud, contactCloud;
var ian;
var workHover, aboutHover, contactHover;
var touchY;
var leftArrow, rightArrow;
var leftArrowHover, rightArrowHover;
var controls = [];
var moveLeft = false, moveRight =false;
var fire, fireHover;
var frames;
var delta;
var flickerSpace = false;
var fireMobile, fireMobileHover;
touchOn = false;

function preload(){
    player = loadImage("res//fighter4.png");
    playerRight = loadImage("res//fighter5Right.png");
    playerLeft = loadImage("res//fighter5Left.png");
    workCloud = loadImage("res//workCloud.png");
    aboutCloud = loadImage("res//aboutCloud.png");
    contactCloud = loadImage("res//contactCloud.png");
    ian = loadFont("res//zian.otf");
    workHover = loadImage("res//workHover.png");
    aboutHover = loadImage("res//aboutHover.png");
    contactHover = loadImage("res//contactHover.png");
    leftArrow = loadImage("res//leftArrow.png");
    rightArrow = loadImage("res//rightArrow.png");
    leftArrowHover = loadImage("res//leftArrowHover.png");
    rightArrowHover = loadImage("res//rightArrowHover.png");
    fire = loadImage("res//fire.png");
    fireHover = loadImage("res//fireHover.png");
    fireMobile = loadImage("res//fireMobile.png");
    fireMobileHover = loadImage("res//fireMobileHover.png");
}

function setup(){
    canvas = createCanvas(windowWidth,windowHeight);
    ship = new Ship();
    for(var i =0;i < 3; i++){
        target[i] = new Target((i*(width/3))+(width/24),100,i);
    }

    for(var i = 0;i < 500;i++){
        speedFx[i] = new SpeedEffect();
    }

    for(var i = 0; i < 3; i++){
        controls[i] = new Control(i);
    }
    frames = 0;
    delta = 0;
    tn = new TitleName();
}

function draw(){
    background(0);

    frames++;
    if(frames>30){
        frames = 0;
        delta++;
    }

    //loop through particle speed effects
    for(var i = 0;i < speedFx.length; i++){
        speedFx[i].fall();
        speedFx[i].show();
    }

    //show whether the cursor is hovering over tab
    showPointer();

    //draw title
    tn.show();

    //draw player intro animation
    if(delta===0){
        ship.scaleDown(1,1);
        ship.yspeed = -10;
    }
    if(delta===1){
        ship.scaleDown(-0.5,-0.5);
        ship.yspeed = -5;
        if(height<700)
          ship.yspeed = -2;
    }
    if(delta>=2 && delta<=3){
        ship.scaleDown(-0.25,-0.25);
        ship.yspeed = 2;
        if(height<700)
          ship.yspeed = 3;
        for(var i = 0;i < 500;i++){
        speedFx[i].yspeed = 15;
    }
    }
    if(delta>3){
        ship.yspeed=0;
    }

    moveRight = false;
    moveLeft = false;

    //keyboard controls
    if(keyIsDown(RIGHT_ARROW)){
        ship.move(1);
        moveRight = true;
        controls[1].keyPressed = true;
        for(var i = 0;i < 500;i++){
        speedFx[i].x = speedFx[i].x - 10;
    }
    }
    else if(keyIsDown(LEFT_ARROW)){
        ship.move(0);
        moveLeft = true;
        controls[0].keyPressed = true;
        for(var i = 0;i < 500;i++){
        speedFx[i].x = speedFx[i].x + 10;
    }
    }


    //touch
    if(touchOn){
      for(var i = 0; i < controls.length; i++){
        var d = dist(controls[i].x+50,controls[i].y,mouseX,mouseY);
        if(d<controls[i].width){
            if(controls[i].index===1){
              ship.move(1);
              moveRight = true;
              for(var i = 0;i < 500;i++){
                speedFx[i].x = speedFx[i].x - 10;
              }
            }else if(controls[i].index===0){
                ship.move(0);
                moveLeft = true;
                for(var i = 0;i < 500;i++){
                  speedFx[i].x = speedFx[i].x + 10;
                  }
                }
              }
            }
    }

    //draw controls
    for(var i = 0; i < controls.length; i++){
        controls[i].show();
    }

    //show player;
    if(!moveRight&&!moveLeft)
        ship.show(player);
    else if(moveRight)
        ship.show(playerRight);
    else
        ship.show(playerLeft);

    //loop through targets
    for(var i =0;i < target.length; i++){
        target[i].animate();
        if(target[i].mouseOver()){
            target[i].showHover();
        }else{
            target[i].show();
        }
    }

    //loop through bullets
    for(var i = 0;i < bullets.length; i++){
        bullets[i].show();
        bullets[i].move();

        for(var j =0;j < target.length; j++){
            if(bullets[i].hits(target[j])){
                target[j].showHover();
                goToIndex(j);
            }
        }
    }

}

function keyPressed(){
    if(keyCode === 32){
        var bullet = new Bullet(ship.x+(ship.width/2) ,ship.y);
        bullets.push(bullet);
        flickerSpace = true;
    }
}

//other objects of this page

function SpeedEffect(){
    this.x = random(0,width);
    this.y = random(0,-1000);
    this.yspeed = 35;
    this.len = 8;

    this.fall = function(){
        if(this.y>height){
            this.y = random(0,-1000);
            this.x = random(0,width);
        }
        this.y = this.y + this.yspeed;
    };

    this.show = function(){
        var c = color(232, 240, 255, 80);
        stroke(c);
        line(this.x,this.y,this.x,this.y+this.len);
    };
}

function TitleName(){
    this.f = ian;
    this.color = color(0, 209, 216);
    this.text = "Ian Bastos";
    this.size = 80;
    if(width<570){
        this.size = 50;
    }
    this.x = width/3;
    this.y = 80;

    this.show = function(){
      stroke(this.color);
      textFont(this.f);
      textSize(this.size);
      textAlign(CENTER);
      text(this.text,width/2,this.y);
    };
}

function Control(i){
    this.index = i;
    this.img;
    this.hover;
    this.width = 100;
    this.height = 80;
    this.y = height - 100;
    this.keyPressed;
    switch(i){
        case 0: this.img = leftArrow;
            this.x = 20;
            this.hover = leftArrowHover;
            this.keyPressed = false;
            break;
        case 1: this.img = rightArrow;
            this.x = width-120;
            this.hover = rightArrowHover;
            this.keyPressed = false;
            break;
        case 2: this.img = fire;
            this.x = (width/2)-100;
            this.hover = fireHover;
            this.width = 200;
            this.height = 70;
            this.y = height - 80;
            if(width<800){
                this.width = 50;
                this.x = (width/2) -25;
                this.height = 100;
                this.y = height - 140;
                this.img = fireMobile;
                this.hover = fireMobileHover;
            }
            if(height < 700){
                this.y = height - 120;
            }
            break;
    }

    this.show = function(){
      var d = dist(this.x+100,this.y,mouseX,mouseY);
      if(d<this.width){
          if(mouseIsPressed){
               if(this.index===1){
                ship.move(1);
                moveRight = true;
                for(var i = 0;i < 500;i++){
        speedFx[i].x = speedFx[i].x - 10;
    }
            }else if(this.index===0){
                ship.move(0);
                moveLeft = true;
                for(var i = 0;i < 500;i++){
        speedFx[i].x = speedFx[i].x + 10;
    }
            }
    }
      if(width>=800 ||this.index===0 || this.index===1){
          image(this.hover,this.x,this.y,this.width,this.height);
        }else{
          image(this.img,this.x,this.y,this.width,this.height);
        }
      }else if(this.keyPressed){
          image(this.hover,this.x,this.y,this.width,this.height);
      }else{
          image(this.img,this.x,this.y,this.width,this.height);
      }

      if(this.index === 2 && flickerSpace){
          image(this.hover,this.x,this.y,this.width,this.height);
      }

      if(width<800 && this.index===2){
        var d = dist(this.x,this.y+this.height/2,mouseX,mouseY);
        if(d<this.width)
          image(this.hover,this.x,this.y,this.width,this.height);
      }

    };
}

function windowResized(){
   setup();
}


function keyReleased(){
    if(keyCode === 32){
        flickerSpace = false;
    }
    if(keyCode === 37 || keyCode === 39){
        //turning off the highlighted arrows
        controls[0].keyPressed = false;
        controls[1].keyPressed = false;
    }
}


//function for showing pointer cursor
function showPointer(){
    if(target[0].mouseOver()){
        $("body").css("cursor","pointer");
    }
    else if(target[1].mouseOver()){
        $("body").css("cursor","pointer");
    }
    else if(target[2].mouseOver()){
        $("body").css("cursor","pointer");
    }
    else{
        $("body").css("cursor","default");
    }
}

//click events for clicking clouds
function mouseClicked(){

     for(var i = 0; i < target.length; i++){
         if(target[i].mouseOver()){
             goToIndex(i);
         }
     }
     if(width>=800){
     var d = dist(controls[2].x,controls[2].y,mouseX,mouseY);
      if(d<controls[2].width){
          bullets.push(new Bullet(ship.x+(ship.width/2),ship.y));
    }
  }else{
    var d = dist(controls[2].x,controls[2].y+controls[2].height/2,mouseX,mouseY);
     if(d<controls[2].width){
         bullets.push(new Bullet(ship.x+(ship.width/2),ship.y));
   }
  }
}

//go to the page in which the cloud represents
function goToIndex(i){
    var p;
    switch(i){
        case 0: p = "pages/about.html";
            break;
        case 1: p = "pages/work.html";
            break;
        case 2: p = "pages/contact.html";
            break;
    }

    Cookies.set('intro',p);
    window.location.replace("../../index.php");
}


//mobile touch functionality

$(document).on('touchend',function(e){
  //check if user has tapped on clouds
  for(var i = 0; i < target.length; i++){
    var d = dist(target[i].x+target[i].width/2,target[i].y,mouseX,mouseY);
    if(d<target[i].width/1.6){
        goToIndex(i);
      }
    }
    //check if user has tapped fire button
    var d = dist(controls[2].x,controls[2].y+controls[2].height/2,mouseX,mouseY);
     if(d<controls[2].width){
         bullets.push(new Bullet(ship.x+(ship.width/2),ship.y));
       }
  });



document.addEventListener("touchstart",touchStartHandler,false);
document.addEventListener("touchend",touchEndHandler,false);

  function touchStartHandler(e){
    touchOn = true;
  }

  function touchEndHandler(e){
    touchOn = false;
  }
