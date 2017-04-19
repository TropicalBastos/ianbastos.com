var blueParticles = [];
var aboutCanvas;
var h;

function setup(){
  if(windowWidth<1600){
      h = $("#includer").height();
      aboutCanvas = createCanvas(windowWidth,h);
    }else{
      aboutCanvas = createCanvas(windowWidth,windowHeight);
    }
    for(var i = 0; i < 200; i++){
        blueParticles[i] = new BlueParticle();
    }
}

function draw(){
    clear();

    for(var i = 0; i < blueParticles.length; i++){
        blueParticles[i].show();
        if(width<1600){
          blueParticles[i].moveUp();
        }
    }
}

function BlueParticle(){

    this.z = random(0,20);
    this.x = random(0,width);
    if(width>1600){
      this.y = random(height/4,(height/3)*2);
      $("canvas").css({"top":"30%"});
    }else{
      this.y = random(0,height);
      $("canvas").css({"top":"0"});
    }
    if(width>1600){
      this.width = map(this.z,0,20,0.5,5);
    }else{
      this.width = map(this.z,0,20,0.5,15);
    }
    if(width>1031){
    this.yspeed = map(this.z,0,20,0.5,4);
  }else{
    this.yspeed = map(this.z,0,20,0.5,2);
  }

    this.show = function(){
      if(width>1600){
        fill(122, 255, 255);
      }else{
        fill(122, 255, 255,70);
      }
        ellipse(this.x,this.y,this.width);
    };

    this.moveUp = function(){
      if(width>1600){
          if(this.y<height/3){
                this.y = random(height/4,(height/3)*2);
              }
            }else{
              if(this.y<0){
                    this.y = random(height+200,height);
                  }
            }
        this.y = this.y - this.yspeed;
    };

    this.moveDown = function(){
      if(width>1600){
        if(this.y>(height/3)*2){
            this.y = random(height/4,(height/3)*2);
        }
      }else{
        if(this.y>height){
              this.y = random(-200,0);
            }
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
