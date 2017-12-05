function FoodGenerator(px, py){
	var foods = [];
	var x = px;
	var y = py;
	var vegetablesType=["tomatoe","carrot","lettuce","potatoe","eggplant","mole","moleExp"];
	var enviado =[false,false,false,false,false];
	var contador=0;
	var index;
	
	this.restart = function(){
		foods = [];
	}
	
	this.update = function(level){

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
		
		for(var i = 0; i< foods.length; i++){
			foods[i].update();
		}
		
		if(foods.length == 0){

			if(vegetablesType[index]=="mole"){
				foods[0] = new Mole(px, py, vegetablesType[index], false);
			}else{
				if(vegetablesType[index]=="moleExp"){
				console.log("topo_explosivo");
				foods[0] = new Mole(px, py, vegetablesType[index], true);
			}else{
				foods[0] = new Vegetable(px, py, vegetablesType[index]);
			}
				
			}
			
		}else{
			if(foods[foods.length-1].getX() < 1000){
				if(vegetablesType[index]=="mole"){
					foods[foods.length] = new Mole(px, py, vegetablesType[index], false);
				}else if(vegetablesType[index]=="moleExp"){
					console.log("topo_explosivo");
					foods[foods.length] = new Mole(px, py, vegetablesType[index], true);
				}else{
					foods[foods.length] = new Vegetable(px, py, vegetablesType[index]);
				}				
			}
		}
		
		if(foods[0].getX() <0){
			var f = foods[0];
			foods.splice(0,1);
			f.destroy();
		}
		
		
		return foods;
	}
	
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

