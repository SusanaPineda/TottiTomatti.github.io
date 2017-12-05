function SceneManager() {
    
	this.menu;
	this.level;	
    
    //Recorre la escena e instancia todos los elementos de esta
    this.buildScene = function(sce, context){ //el parametro es un entero
		if(sce == menu){
			var elem = sce.getAllElements();
			
			//Background
			var m = 640 - elem[0].width/2;
			var n = 360 - elem[0].height/2;
		
			context.drawImage(elem[0],m,n);
			
			//NewGame
			var a = 640 - elem[1].width/2;
			var b = 400 - elem[1].height/2;
		
			context.drawImage(elem[1],a,b);
			
			//ContactUS
			var c = 640 - elem[2].width/2;
			var d = 550 - elem[2].height/2;
		
			context.drawImage(elem[2],c,d);
			
		}else{
			var elem = sce.getAllElements();
			for(var i = 0; i < elem.length; i++){
				elem[i].draw(context);
			}
		}
    };
	
	//Crea las escenas de menu y nivel de juego
	this.createScenes = function(){
		var scenes = [];
		menu = new Scene();
		
		var background = new Image();
		background.src = "./MainMenu/MainFondo.png";
		
		var newGameBtn = new Image();
		newGameBtn.src = "./MainMenu/NewGame.png";
		
		var contactBtn = new Image();
		contactBtn.src = "./MainMenu/ContactUs.png";
		
		var contactPanel = new Image();
		contactPanel.src = "./MainMenu/ContactPanel.png";
		
		var contacted = false;
		
		
		var menu_elements = [background, newGameBtn, contactBtn, contactPanel, contacted];
		menu.setAllElements(menu_elements);
		
		var level = new Scene();
		var lvl1Elements = [new Farmer(640,580), new God(640, 192)];
		level.setAllElements(lvl1Elements);
		

		scenes[0] = menu;
		scenes[1] = level;

		return scenes;
	};	
}