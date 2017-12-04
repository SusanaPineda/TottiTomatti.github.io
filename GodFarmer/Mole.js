function Mole(px,py,t,exp) {
    //Inicialializa la posicion y decide que tipo de vegetal será
    var x = px;
    var y = py;
    var type = t; //Not customizable, celery, carrot, turnip, pumpkin, potatoe
	var vegetablesType=["tomatoe","carrot","lettuce","potatoe","eggplant"];
    var thrown = false;  
	var explosive = exp;
        
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

        console.log("Explosión");
    }

    //Dibuja el sprite del mole
    this.draw = function(context)
    {	
        //Mantiene el centro del sprite
        var v = x - currentSpr.width/2;
        var z = y - currentSpr.height/2;
        
        //--Posiblemente se deban añadir mas cosas

        context.drawImage(currentSpr,v,z);
    }

    //Actuliza el estado del mole
    //El atributo e es el evento de control de raton o teclado si fuera necesario
    this.update = function(e)
    {
       
        if(thrown){
		   this.moveVertical();
	    }else{
		   this.move();
	    }
        
    }

}