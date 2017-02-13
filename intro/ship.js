function Ship(){
    //constructor
    this.width = width/9;
    this.height = this.width;
    if(height<900){
        this.width = width/9;
    }
    if(height<700){
        this.y = (height - this.height)-50;
    }

    this.x = (width/2) - (this.width/2);
    this.y = height;
    this.yspeed = 0;

    this.show = function(img){
        //intro animation
        if(this.yspeed>0 || this.yspeed<0){
            this.y = this.y+this.yspeed;
        }
        image(img,this.x,this.y,this.width,this.height);
    };

    this.move = function(direction){
        var tempX = this.x;
        if(width<700)
            tempX += (direction===1) ? 15: -15;
        else
            tempX += (direction===1) ? 40: -40;

        this.x = constrain(tempX,0,width-this.width);

    };

    this.scaleDown = function(w,h){
        this.width = this.width - w;
        this.x = this.x+(w/2);
        this.height = this.height - h;
    };
};
