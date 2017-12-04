function God(px,py) {
    //Inicialializa la posicion y decide que tipo de vegetal será
    var x = px;
    var y = py;
    
    
    //Sprites
    var spritesGod = [];

    spritesGod[0] = new Image();
    spritesGod[0].src = "./God/Dios_F1.png";
    
    spritesGod[1] = new Image();
    spritesGod[1].src = "./God/Dios_F2.png";
    
    spritesGod[2] = new Image();
    spritesGod[2].src = "./God/Dios_F3.png";
	
	var animGod = new Animation(spritesGod, true, 3);
	var animator = new Animator();
    

    
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

    //Chequea si el ingrediente recibido(vegetable) forma parte de la receta actual (currentRecipe)
    this.checkIngredient = function(currentRecipe, vegetable){ 

    	
		if(currentRecipe.getRecipe().length>0)
		{
			var check=false;
			var count=0;

            if(vegetable[0].getType()=="mole" || vegetable[0].getType()=="moleExp"){

                vegetable[0].explode();

                return true;
            }else{

				if(currentRecipe.getRecipe().length > 3){
					while(count<3 && check==false)
					{					
						if(currentRecipe.getIngredient(count).getType() == vegetable[0].getType())
						{
							currentRecipe.removeIngredient(count); 								// <-- es un metodo de receta que elimina el ingrediente de la receta dandole el indice
							check=true;
						}
						count++;
					}
				}else{
					while(count<currentRecipe.getRecipe().length && check==false)
					{					
						if(currentRecipe.getIngredient(count).getType() == vegetable[0].getType())
						{
							currentRecipe.removeIngredient(count); 								// <-- es un metodo de receta que elimina el ingrediente de la receta dandole el indice
							check=true;
						}
						count++;
					}
				}
			}
		
				
		}
        if(check==true){
    return currentRecipe;
        }else{
            return false;
        }
		
    }
    
    //Dibuja el sprite de dios
    this.draw = function(context)
    {	
        animator.play(animGod, context, x, y);
    }

    //Actuliza el estado de¡ dios
    //El atributo e es el evento de control de raton o teclado si fuera necesario
    this.update = function(e)
    {
       
            //---
        
    }

}