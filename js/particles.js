var blueParticles = [];
var aboutCanvas;
var h;
var particleImage;

function preload(){
  particleImage = loadImage("res//squareparts.png");
}

function setup(){
  if(pageLoaded){
    h = $(".scrollDiv")[0].offsetTop;
    aboutCanvas = createCanvas(windowWidth,h);
    for(var i = 0; i < 200; i++){
        blueParticles[i] = new BlueParticle();
    }
  }
}

function draw(){
    clear();

    for(var i = 0; i < blueParticles.length; i++){
        blueParticles[i].show();
        //blueParticles[i].moveUp();
    }
}

function BlueParticle(){

    this.z = random(0,20);
    this.x = random(0,width);
    this.y = random(0,height);
    this.width = map(this.z,0,20,0.5,15);
    this.yspeed = map(this.z,0,20,1,10); //used to be 0.5,1


    this.show = function(){
        image(particleImage,this.x,this.y,this.width,this.width);
    };

    this.moveUp = function(){
        if(this.y<0){
          this.y = random(height+200,height);
        }
        this.y = this.y - this.yspeed;
    };

    this.moveDown = function(){
      if(this.y>height){
        this.y = random(-200,0);
      }
      this.y = this.y + this.yspeed;
    };
}


var lastScrollTop = 0;
$(window).on('scroll',function(){

    var sc = $(this).scrollTop();

    if(lastScrollTop>sc){
        for(var i = 0; i < blueParticles.length; i++){
        blueParticles[i].moveDown();
        }
    }

    if(lastScrollTop<sc){
        for(var i = 0; i < blueParticles.length; i++){
        blueParticles[i].moveUp();
        }
    }
    lastScrollTop = sc;
});

function windowResized(){
  setup();
}
