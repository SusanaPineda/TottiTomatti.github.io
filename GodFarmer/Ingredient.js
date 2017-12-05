function Ingredient(t,q) {
    
    //Atributos
    var type = t;
    var quantity = q;
	var currentSpr = new Image();
	
	//Cambia el sprite segun el tipo
	switch (type){
		case "tomatoe":
			currentSpr.src = "./Recipes/Tomate_Icono.png";
			break;
		case "potatoe":
			currentSpr.src = "./Recipes/Patata_Icono.png";
			break;
		case "eggplant":
			currentSpr.src = "./Recipes/Berenjena_Icono.png";
			break;
		case "lettuce":
			currentSpr.src = "./Recipes/Lechuga_Icono.png";
			break;
		case "carrot":
			currentSpr.src = "./Recipes/Zanahoria_Icono.png";
			break;
	}
    
    //Devuelve el tipo de vegetal del ingrediente
    this.getType = function(){
        return type;
    }
    this.getQuantity = function(){
        return quantity;
    }
	this.reduceQuantity=function(){
		quantity--;
	}
	this.draw = function(context,count){
		var x;
		var y;

		switch(count){
			case 0:
				x=70;
				y=80;
				break;
			case 1:
				x=140;
				y=80;
				break;
			case 2:
				x=210;
				y=80;
				break;
		}
		
		//Mantiene el centro del sprite
        var v = x - currentSpr.width/2;
        var z = y - currentSpr.height/2;

        context.drawImage(currentSpr,v,z);
	}
}