function FoodGenerator(px, py){
	//Atributos
	var foods = [];
	var x = px;
	var y = py;
	var vegetablesType=["tomatoe","carrot","lettuce","potatoe","eggplant","mole","moleExp"];
	var enviado =[false,false,false,false,false];
	var contador=0;
	var index;
	
	//Vacia el array de comidas
	this.restart = function(){
		foods = [];
	}
	//Actualiza el array de comidas moviendolas y generando nuevas y borrando las que se salgan de la pantalla
	this.update = function(level){
		//en el nivel 1 solo hay verduras, en el nivel 2 se añaden topos explosivos y en el 3 topos disfrazados
		switch(level){
			case 1:
				index=Math.floor((Math.random() * (vegetablesType.length-2)));
				break;
			case 2:
				index=Math.floor((Math.random() * (vegetablesType.length-1)));
				break;
			case 3:
				index=Math.floor((Math.random() * vegetablesType.length));
				break;
		}		
		index=checkSend();
		
		//actualiza las verduras
		for(var i = 0; i< foods.length; i++){
			foods[i].update(level);
		}
		
		//Si esta vacia la lista crea una verdura
		if(foods.length == 0){
			if(vegetablesType[index]=="mole"){
				foods[0] = new Mole(px, py, vegetablesType[index], false);
			}else if(vegetablesType[index]=="moleExp"){
				foods[0] = new Mole(px, py, vegetablesType[index], true);
			}else{
				foods[0] = new Vegetable(px, py, vegetablesType[index]);
			}						
		}else{
			if(foods[foods.length-1].getX() < 1000){ //si la ultima verdura ha llegado a la posicion 1000 crea una nueva
				if(vegetablesType[index]=="mole"){
					foods[foods.length] = new Mole(px, py, vegetablesType[index], false);
				}else if(vegetablesType[index]=="moleExp"){
					foods[foods.length] = new Mole(px, py, vegetablesType[index], true);
				}else{
					foods[foods.length] = new Vegetable(px, py, vegetablesType[index]);
				}				
			}
		}
		
		if(foods[0].getX() <0){ //si alguna se va de la pantalla la borra
			var f = foods[0];
			foods.splice(0,1);
		}
		
		return foods;
	}
	
	//Se asegura que salga una verdura necesaria si no ha salido ninguna en las ultimas iteraciones
	function checkSend(){
		for(var i=0;i<enviado.length;i++){
			if(enviado[i]==false && contador>=5){
				return i;
			}
		}		
		if(contador>=5){ //aqui solo llega cuando se han enviado todas las verduras entonces reseteo el contador si es mayor o igual que 10
			contador=0;
			for(var i=0;i<enviado.length;i++){ //se ha cumplido una vuelta asi que reseteo los enviados
				enviado[i]=false;
			}
		}
		return index;
	}
}

