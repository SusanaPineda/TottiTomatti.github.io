function God(px,py) {
    //Inicialializa la posicion y decide que tipo de vegetal será
    var x = px;
    var y = py;
    
	//Sounds
	var correctVSound = document.getElementById("correctVegetable");
	var wrongVSound = document.getElementById("wrongVegetable");
	var volume = 0.3;
    
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

    	
		if(currentRecipe.getRecipe().length>0) //si la receta no esta vacia
		{
			var check=false; //inicia el check a false.
			var count=0;

            if(vegetable[0].getType()=="mole" || vegetable[0].getType()=="moleExp"){ //si es un topo, explota y pierdes

                vegetable[0].explode();

                return true;
            }else{

				if(currentRecipe.getRecipe().length > 3){ //si no es un topo, recorre los 3 primeros ing si es mayor de 3 la receta
					while(count<3 && check==false)
					{					
						if(currentRecipe.getIngredient(count).getType() == vegetable[0].getType()) //si coincide elimina el ing de la receta y sale del bucle
						{
							currentRecipe.removeIngredient(count); 								// <-- es un metodo de receta que elimina el ingrediente de la receta dandole el indice
							check=true;
							correctVSound.volume = volume; //sonido verdura correcta
							correctVSound.pause();
							correctVSound.currentTime = 0
							correctVSound.play();
						}
						count++;
					}
					if(!check){
						wrongVSound.volume = volume; //sonido verdura erronea
						wrongVSound.pause();
						wrongVSound.currentTime = 0
						wrongVSound.play();
					}
				}else{
					//aqui hace lo mismo pero para recetas de 3 ing o menos.
					while(count<currentRecipe.getRecipe().length && check==false)
					{					
						if(currentRecipe.getIngredient(count).getType() == vegetable[0].getType())
						{
							currentRecipe.removeIngredient(count); 								// <-- es un metodo de receta que elimina el ingrediente de la receta dandole el indice
							check=true;
							correctVSound.volume = volume;
							correctVSound.pause();
							correctVSound.currentTime = 0
							correctVSound.play();
						}
						count++;
					}
					
					if(!check){
						wrongVSound.volume = volume;
						wrongVSound.pause();
						wrongVSound.currentTime = 0
						wrongVSound.play();
					}
				}
			}
		
				
		}
        if(check==true){
			return currentRecipe; //si la verdura era valida devuelve la nueva receta
        }else{
            return false; //si no devuelve false y te quita una vida
        }
		
    }
    
    //Dibuja el sprite de dios
    this.draw = function(context)
    {	
        animator.play(animGod, context, x, y);
    }
}