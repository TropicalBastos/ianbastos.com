function Target(x,y,i){
    this.x = x;
    this.y = y;
    this.width = width/4, this.normalWidth = this.width;
    this.height = this.width/1.5, this.normalHeight = this.height;
    this.img;
    this.imgHover;
    this.alphaValue = 255;

    switch(i){
        case 0: this.img = aboutCloud;
            this.imgHover = aboutHover;
            this.name = "about";
            break;
        case 1: this.img = workCloud;
            this.imgHover = workHover;
            this.name = "work";
            break;
        case 2: this.img = contactCloud;
            this.imgHover = contactHover;
            this.name = "contact";
            break;
    }

    this.show = function(){
        image(this.img,this.x,this.y,this.width,this.height);
    };

    this.animate = function(){
        if(this.width >= this.normalWidth-20
                && this.width <= this.normalWidth+10){
            this.width = this.width + 1;
        }

        if(this.height >= this.normalHeight-20
                && this.height <= this.normalHeight+10){
            this.height = this.height + 1;
        }
    };

    this.mouseOver = function(){
        var d = dist(this.x+this.width/2,this.y,mouseX,mouseY);
        if(d<this.width/1.6){
            return true;
        }
        else{
            return false;
        }
    };

    this.showHover = function(){
        image(this.imgHover,this.x,this.y,this.width,this.height);
    };
}
