function Mole(px,py,t,exp) {
    //Inicialializa la posicion y decide que tipo de vegetal será
    var x = px;
    var y = py;
    var type = t; //Not customizable, celery, carrot, turnip, pumpkin, potatoe
	var vegetablesType=["tomatoe","carrot","lettuce","potatoe","eggplant"];
    var thrown = false;  
	var explosive = exp;
	
	var exploding = false;
	var exploded = false;
	
	var spritesExplosion = [];
	spritesExplosion[0] = new Image();
	spritesExplosion[0].src = "./Explosion_Topo/Topo_Explosion_F1.png";
	
	spritesExplosion[1] = new Image();
	spritesExplosion[1].src = "./Explosion_Topo/Topo_Explosion_F2.png";
	
	spritesExplosion[2] = new Image();
	spritesExplosion[2].src = "./Explosion_Topo/Topo_Explosion_F3.png";
	
	spritesExplosion[3] = new Image();
	spritesExplosion[3].src = "./Explosion_Topo/Topo_Explosion_F4.png";
	
	spritesExplosion[4] = new Image();
	spritesExplosion[4].src = "./Explosion_Topo/Topo_Explosion_F5.png";
	
	spritesExplosion[5] = new Image();
	spritesExplosion[5].src = "./Explosion_Topo/Topo_Explosion_F6.png";
	
	spritesExplosion[6] = new Image();
	spritesExplosion[6].src = "./Explosion_Topo/Topo_Explosion_F7.png";
	
	spritesExplosion[7] = new Image();
	spritesExplosion[7].src = "./Explosion_Topo/Topo_Explosion_F8.png";
	
	spritesExplosion[8] = new Image();
	spritesExplosion[8].src = "./Explosion_Topo/Topo_Explosion_F9.png";
	
	spritesExplosion[9] = new Image();
	spritesExplosion[9].src = "./Explosion_Topo/Topo_Explosion_F10.png";
	
	var animExplosion = new Animation(spritesExplosion, false, 20);
	var animator = new Animator();
        
        //---Se define una manera de seleccionar el tipo de mole pertinente y asignarlo a currentSpr
        //---con ayuda del metodo setCurrentSpr;
    
    
    //Atributos
    var speed = 5;
    var currentSpr = new Image();

    if(!explosive){
         currentSpr.src = "./Vegetables/Topo_Normal.png";
    }else{
		var random = Math.floor(Math.random() * vegetablesType.length);
		console.log(vegetablesType[random]);
		switch (vegetablesType[random]){
			case "tomatoe":
				currentSpr.src = "./Vegetables/Topo_Tomate.png";
				break;
			case "potatoe":
				currentSpr.src = "./Vegetables/Topo_Patata.png";
				break;
			case "eggplant":
				currentSpr.src = "./Vegetables/Topo_Berenjena.png";
				break;
			case "lettuce":
				currentSpr.src = "./Vegetables/Topo_Lechuga.png";
				break;
			case "carrot":
				currentSpr.src = "./Vegetables/Topo_Zanahoria.png";
				break;
		}
    }

   

    //Sprites
    var notCustomizableSpr = new Image();
    //notCustomizableSpr.src = "notCostumizable.png";
    
    var celerySpr = new Image();
    //celerySpr.src = "celery.png";
    
    var carrotSpr = new Image();
    //carrotSpr.src = "carrot.png";
    
    var turnipSpr = new Image();
    //turnipSpr.src = "turnip.png";
    
    var pumpkinSpr = new Image();
    //pumpkinSpr.src = "pumpkin.png";
    
    var potatoeSpr = new Image();
    //potatoeSpr.src = "potatoe.png";
    

    
    //Getters y Setters
    this.getX = function()
    {
        return x;
    }
    this.getY = function()
    {
        return y;
    }

    this.getSpeed = function()
    {
        return speed;
    }

    this.setSpeed = function(sp)
    {
        speed = sp;
    }

    this.getW = function()
    {
        return currentSpr.width;
    }
    this.getH = function()
    {
        return currentSpr.height;
    }
    this.setCurrentSprite = function(spr){
        currentSpr = spr;
    }
    this.getCurrentSprite = function(){
        return currentSpr;
    }
    this.setThrown = function(t)
    {
        thrown = t;
    }

    this.getThrown = function()
    {
        return thrown;
    }
	
	this.getType=function(){
		return type;
	}
	
	this.getExploding = function(){
		return exploding;
	}
	
	this.setExploding = function(ex){
		exploding =ex;
	}
	
	this.getExploded = function(){
		return exploded;
	}
    
    //Mueve el vegetal a la velocidad deseada
   this.move = function(){
        x = x-3;
    }
	
	this.moveVertical = function(){
		x=640;
		y=y-5;
	}

    //Destruye este objeto
	this.destroy = function(){
        //---
    }

    this.explode = function(){
		exploding = true;
        console.log("Explosión");
    }

    //Dibuja el sprite del mole
    this.draw = function(context)
    {	
	
		if(exploding){
			animator.play(animExplosion, context, x, y);
		}else{
			//Mantiene el centro del sprite
			var v = x - currentSpr.width/2;
			var z = y - currentSpr.height/2;
			
			//--Posiblemente se deban añadir mas cosas

			context.drawImage(currentSpr,v,z);
		}
    }

    //Actuliza el estado del mole
    //El atributo e es el evento de control de raton o teclado si fuera necesario
    this.update = function(e)
    {
		if(exploding){
			if(animExplosion.getCurrentPosition() >= spritesExplosion.length-1){
				exploded = true;
			}
		}else{
       
			if(thrown){
			   this.moveVertical();
			}else{
			   this.move();
			}
		}
        
    }

}