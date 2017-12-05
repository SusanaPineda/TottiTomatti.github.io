function Animator() {
    
    var prevAnimation;
    var currentAnimation;
    
    this.play = function(anim,c,x,y){
        if(currentAnimation != anim){ //si la animacion no es la misma la sustituye
           currentAnimation = anim;
        }
        if (prevAnimation != currentAnimation && prevAnimation!=null){ //si la animacion anterior no es la misma que la de ahora
            prevAnimation.resetCurrentPosition(0); //resetea la animacion
            prevAnimation = anim; //y la cambia
        }else if (prevAnimation==null){
            prevAnimation = anim;
        }
        
        var spr;
        spr = anim.getNextFrame();
		
        //Mantiene el centro del sprite
        var v = x - spr.width/2;
        var z = y - spr.height/2;

        context.drawImage(spr,v,z);
    }
}