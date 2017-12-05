function Vegetable(px,py,t) {
    //Inicialializa la posicion y decide que tipo de vegetal será
    var x = px;
    var y = py;
    var type = t; //Celery, carrot, turnip, pumpkin, potatoe	
	var thrown = false;
   
    //Atributos    
    var speed = 5;
    var currentSpr = new Image();

    //Sprites
    switch (type){
		case "tomatoe":
			currentSpr.src = "./Vegetables/Tomate.png";
			break;
		case "potatoe":
			currentSpr.src = "./Vegetables/Patata.png";
			break;
		case "eggplant":
			currentSpr.src = "./Vegetables/Berenjena.png";
			break;
		case "lettuce":
			currentSpr.src = "./Vegetables/Lechuga.png";
			break;
		case "carrot":
			currentSpr.src = "./Vegetables/Zanahoria.png";
			break;
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
	
	this.getType = function(){
		return type;
	}
    
    //Mueve el vegetal a la velocidad deseada
    this.move = function(level){
         x = x-(1+(level*2));
    }
	
	this.moveVertical = function(){
		x=640;
		y=y-speed;
	}

    //Dibuja el sprite del vegetal
    this.draw = function(context)
    {	
        //Mantiene el centro del sprite
        var v = x - currentSpr.width/2;
        var z = y - currentSpr.height/2;

        context.drawImage(currentSpr,v,z);        
    }

    //Actuliza el estado del vegetal
    //El atributo e es el evento de control de raton o teclado si fuera necesario
    this.update = function(level)
    {
       if(thrown){
		   this.moveVertical();
	   }else{
		   this.move(level);
	   }        
    }
}