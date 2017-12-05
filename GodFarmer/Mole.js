function Mole(px,py,t,exp) {
    //Inicialializa la posicion y decide que tipo de vegetal será
    var x = px;
    var y = py;
    var type = t; //Not customizable, celery, carrot, turnip, pumpkin, potatoe
	var vegetablesType=["tomatoe","carrot","lettuce","potatoe","eggplant"];
    var thrown = false;  
	var explosive = exp;
	
	//Booleanos que determinan cuando esta explotando y cuando ya ha explotado
	var exploding = false;
	var exploded = false;
	
	//Sprites de la animacion de la explosion
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
        
    
    //Atributos
    var speed = 5;
    var currentSpr = new Image();

    if(!explosive){
         currentSpr.src = "./Vegetables/Topo_Normal.png";
    }else{
		var random = Math.floor(Math.random() * vegetablesType.length);
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
    
    //Getters y Setters
    this.getX = function()
    {
        return x;
    }
    this.getY = function()
    {
        return y;
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
    
    //Mueve el vegetal en el suelo a la velocidad deseada
	this.move = function(level){
        x = x-(1+(level*2));
    }
	
	//Mueve el vegetal hacia Dios
	this.moveVertical = function(){
		x=640;
		y=y-speed;
	}

    this.explode = function(){
		exploding = true;
    }

    //Dibuja el sprite del mole
    this.draw = function(context)
	{
		//si esta explotando hace la animacion de explotar, sino pinta el sprite estático
		if(exploding){
			animator.play(animExplosion, context, x, y);
		}else{
			//Mantiene el centro del sprite
			var v = x - currentSpr.width/2;
			var z = y - currentSpr.height/2;

			context.drawImage(currentSpr,v,z);
		}
    }

    //Actuliza el estado del mole
    //El atributo e es el evento de control de raton o teclado si fuera necesario
    this.update = function(level)
    {
		if(exploding){
			if(animExplosion.getCurrentPosition() >= spritesExplosion.length-1){
				exploded = true;
			}
		}else{       
			if(thrown){
			   this.moveVertical();
			}else{
			   this.move(level);
			}
		}        
    }
}