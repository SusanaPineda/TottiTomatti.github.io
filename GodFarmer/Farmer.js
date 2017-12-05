function Farmer(px,py) {
    
    
    //Atributos
    var x = px;
    var y = py;
    var lifes = 3;
    var throwing=false;
    
    

    //Sprites
    var spritesThrow = [];

    spritesThrow[0] = new Image();
    spritesThrow[0].src = "./FarmerSprites/Farmer_Catch_F1.png";
    
    spritesThrow[1] = new Image();
    spritesThrow[1].src = "./FarmerSprites/Farmer_Catch_F2.png";
    
    spritesThrow[2] = new Image();
    spritesThrow[2].src = "./FarmerSprites/Farmer_Catch_F3.png";
    
    spritesThrow[3] = new Image();
    spritesThrow[3].src = "./FarmerSprites/Farmer_Catch_F4.png";
    
    spritesThrow[4] = new Image();
    spritesThrow[4].src = "./FarmerSprites/Farmer_Catch_F5.png";
    
    spritesThrow[5] = new Image();
    spritesThrow[5].src = "./FarmerSprites/Farmer_Catch_F6.png";
    
    spritesThrow[6] = new Image();
    spritesThrow[6].src = "./FarmerSprites/Farmer_Catch_F7.png";
    
    var spritesIddle = [];

    spritesIddle[0] = new Image();
    spritesIddle[0].src = "./FarmerSprites/Farmer_Iddle_F1.png";
    
    spritesIddle[1] = new Image();
    spritesIddle[1].src = "./FarmerSprites/Farmer_Iddle_F2.png";

    var animator = new Animator();

    var animThrow = new Animation(spritesThrow,false,8);
    var animIddle = new Animation(spritesIddle,true,3);

    //Getters y Setters
    this.getX = function()
    {
        return x;
    }
    this.getY = function()
    {
        return y;
    }

    this.getLifes = function()
    {
        return lifes;
    }

    this.setLifes = function(l)
    {
        lifes = l;
    }

    this.getW = function()
    {
        return farmerSpr.width;
    }
    this.getH = function()
    {
        return farmerSpr.height;
    }
    this.setThrowing=function(t)
    {
        throwing=t;
    }
	this.getThrowing = function(){
		return throwing;
	}
    
    //Dibuja el sprite del jugador
    this.draw = function(context,canvas)
    {
        if(throwing){               
            animator.play(animThrow,context,x,y);                
        }else{                
            animator.play(animIddle,context,x,y);
        }  
    }

    //Actuliza el estado del granjero
    //El atributo e es el evento de control de raton o teclado si fuera necesario
    this.update = function(e)
    {
        if(animThrow.getCurrentPosition() >= spritesThrow.length-1){
			throwing = false;
			console.log(throwing);
		}
    }

}