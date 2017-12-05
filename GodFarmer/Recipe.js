function Recipe() {
    
    //Atributos
    //Array de ingredientes
    var ingredients = []; 
    var vegetablesType=["tomatoe","carrot","lettuce","potatoe","eggplant"];
	
	var ing1 = new Image();
	ing1.src = "./Recipes/+1.png";
	
	var ing2 = new Image();
	ing2.src = "./Recipes/+2.png";

    //Devuelve el array de ingredientes de esta receta    
    this.getRecipe = function(){
        return ingredients;
    }
    
    //Recive un array de ingredientes y la establece como esta receta
    this.setIngredients = function(ing){
        ingredients = ing;
    }
    
    //Añade un ingrediente a una receta y la cantidad de este.
    this.addIngredient = function(ing){
        ingredients.push(ing);
    }
    
    //Devuelve un array con los ingredientes de la receta
    this.getIngredient = function(index){
        return ingredients[index];
    }
    
	//Elimina ingredientes de la receta si su cantidad es cero, si no lo es reduce la cantidad
    this.removeIngredient = function(index){
	
		if(ingredients[index].getQuantity()>0)
		{
			ingredients[index].reduceQuantity();			
		}
		if(ingredients[index].getQuantity() == 0){
			ingredients.splice(index,1);
		}
	}
	
	//Crea una nueva receta
    this.createRecipe = function(level){

        var cloneIngredients=vegetablesType.slice(0,vegetablesType.length); //array copia con los posibles tipos de ingredientes para ir eliminandolos y que no se repitan
		
		for(var i=0;i<level+2;i++) //En el nivel 1 serán de 3 ingredientes, en el 2 de 4 y en el 3 de 5
		{	

			var random=Math.floor(Math.random() * cloneIngredients.length);
            var quantity=Math.floor((Math.random() * level+1) + 1); //habra dos de cada en el nivel 1, 3 de cada en el 2 y 4 de cada en el 3
            //var quantity=1;
			var ing= new Ingredient(cloneIngredients[random],quantity); //ingrediente a generar

            this.addIngredient(ing);
            cloneIngredients.splice(random,1);		
		}		
	}
	
	//Funcion de pintado
	this.draw=function(c){
		if(ingredients.length < 3){
			for(var i=0;i<ingredients.length;i++){//pinta solo los tres primeros ingredientes
				ingredients[i].draw(c,i);
			}
		}else{
			for(var i=0;i<3;i++){ //pinta solo los tres primeros ingredientes
				ingredients[i].draw(c,i);
			}
			
			if(ingredients.length == 4){ //si tiene 4 ing enseña el aviso de que hay un ing detras de esos 3
				
				var m = 250 - ing1.width/2;
				var n = 150 - ing1.height/2;		
				context.drawImage(ing1,m,n);
				
			}else if (ingredients.length ==5){ //lo mismo pero para 5 ing
				
				var m = 250 - ing2.width/2;
				var n = 150 - ing2.height/2;		
				context.drawImage(ing2,m,n);	
				
			}
		}        
    }
}