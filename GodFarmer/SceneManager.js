function SceneManager() {
    
	this.menu;
	this.level;
	this.level2;
	this.level3;	
	
	//createScenes();
    
    //Recorre la escena e instancia todos los elementos de esta
    this.buildScene = function(sce, context){ //el parametro es un entero
		var elem = sce.getAllElements();
		for(var i = 0; i < elem.length; i++){
			elem[i].draw(context);
		}
    };
	
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
		
		
		var menu_elements = [background, newGameBtn, contactBtn, contactPanel];
		menu.setAllElements(menu_elements);
		
		var level = new Scene();
		var lvl1Elements = [new Farmer(640,580), new God(640, 192)];
		level.setAllElements(lvl1Elements);
		

		scenes[0] = menu;
		scenes[1] = level;
		//scenes[2] = level3;

		return scenes;
	};	
}