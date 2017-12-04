function Animator() {
    
    var prevAnimation;
    var currentAnimation;
    
    this.play = function(anim,c,x,y,canv){
        if(currentAnimation != anim){
           currentAnimation = anim;
        }
        if (prevAnimation != currentAnimation && prevAnimation!=null){
            prevAnimation.resetCurrentPosition(0);
            prevAnimation = anim;
        }else if (prevAnimation==null){
            prevAnimation = anim;
        }
        
        var spr;
        spr = anim.getNextFrame();
        /*
        var x=1280-648.797;
        var y=720-339.922
        spr.width=(spr.width-x);
        spr.height=(spr.height-y);
        */
        //Mantiene el centro del sprite
        var v = x - spr.width/2;
        var z = y - spr.height/2;

        context.drawImage(spr,v,z);
    }
}