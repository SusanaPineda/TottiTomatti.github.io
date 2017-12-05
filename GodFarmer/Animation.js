function Animation(sprs, lp, spd) {
    
    var sprites = [];
    sprites = sprs;
    var currentSprite = sprites[0];
    var currentPosition = 0;
    
    var loop = lp;
    var speed = spd;
    var framesPerSprite = 60/spd - ((60%spd)/spd);
    var frameCount = 0;
    
    
    
    this.getCurrentSprite = function(){
        return currentSprite;
    }
    
    this.getCurrentPosition = function(){
        return currentPosition;
    }
    
    this.setCurrentPosition = function(){
        currentPosition = 0;
    }
    
    this.resetCurrentPosition = function(index){
        currentPosition = index;
    }
    
    this.getLoop = function(){
        return loop;
    }
    
    this.setLoop = function(lp){
        loop = lp;
    }
    
    this.getNextFrame = function(){
        if(sprites.length!=0){
            if (loop){
                if (currentPosition < sprites.length-1 && frameCount == framesPerSprite){
                    currentPosition++;
                    frameCount = 0;
                }else if (currentPosition >= sprites.length-1 && frameCount == framesPerSprite){
                    currentPosition = 0;
                    frameCount = 0;
                }
            }else{
                if (currentPosition < sprites.length-1 && frameCount >= framesPerSprite){
                    currentPosition++;
                    frameCount = 0;
                }
            }
        
        frameCount++;
        currentSprite = sprites[currentPosition];

       



        return currentSprite;
        }
        
        return currentSprite;
    }
    
    
}