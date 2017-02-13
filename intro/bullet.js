function Bullet(x,y){
    this.x = x;
    this.y = y;
    //radius
    this.r = 5;
    this.yspeed = 28;
    
    this.show = function(){
        fill(50,0,200);
        //ellipse(this.x,this.y,this.r*2,this.r*2);
        ellipse(this.x,this.y+5,this.r*1.5,this.r*2+20);
        var c = color(50,0,200,80);
        fill(c);
        ellipse(this.x,this.y+5,this.r*1.5,this.r*2+35);
    };
    
    this.move = function(){
        this.y = this.y - this.yspeed;
    };
    
    this.hits = function(obj){
        var d;
        if(width<920){
            d = dist(this.x,this.y,obj.x+obj.width/2,obj.y);
        }else{
            d = dist(this.x,this.y,obj.x+obj.width/2,obj.y);
        }
        
        //check distance between radiuses
        if(d < (obj.width/1.6))
            return true;
        else
            return false;
        
    };
    
    this.mouseOver = function(){
        var d = dist(this.x+this.width/2,this.y,mouseX,mouseY);
        if(d<this.width/1.6)
            return true;
        else
            return false;
    };
}