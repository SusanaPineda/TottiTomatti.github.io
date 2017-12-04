function GameController(cont,canv){
    
    //Atributos
    var play = true;
    var score = 0;
    var level = 1;
    var context = cont;
    var player;
	var god;
    var canvas = canv;
	var UIController = new UIcontroller(context);
	var lifes;
	//var lifes=[]; //vidas
	//booleanos que condicionan la victoria o la derrota
	var win = false;
	var lose = false;
	
	//Levels
	var levelSprites = [];
	levelSprites[0] = new Image();
	levelSprites[0].src = "./LevelsSprites/Nivel_1.png";
	
	levelSprites[1] = new Image();
	levelSprites[1].src = "./LevelsSprites/Nivel_2.png";
	
	levelSprites[2] = new Image();
	levelSprites[2].src = "./LevelsSprites/Nivel_3.png";
	
	//Background
	var backgroundSpr = new Image();
	backgroundSpr.src = "./Fondo/Fondo.png";
	
	var recipeZoneSpr = new Image();
	recipeZoneSpr.src = "./Recipes/CartelRecetas.png";
	
	var floorSpr = new Image();
	floorSpr.src = "./Fondo/Suelo.png";
	
	var spritesMiddle = [];
	
	spritesMiddle[0] = new Image();
	spritesMiddle[0].src = "./Fondo/Separacion_F1.png";
	spritesMiddle[1] = new Image();
	spritesMiddle[1].src = "./Fondo/Separacion_F2.png";
	spritesMiddle[2] = new Image();
	spritesMiddle[2].src = "./Fondo/Separacion_F3.png";
	spritesMiddle[3] = new Image();
	spritesMiddle[3].src = "./Fondo/Separacion_F4.png";
	
	var animMiddle = new Animation(spritesMiddle, true, 2);
	var animatorM = new Animator();
	
	//Caldero
	var spritesCauldron = [];
	
	spritesCauldron[0] = new Image();
	spritesCauldron[0].src = "./Cauldron/Caldero_F1.png";
	
	spritesCauldron[1] = new Image();
	spritesCauldron[1].src = "./Cauldron/Caldero_F2.png";
	
	spritesCauldron[2] = new Image();
	spritesCauldron[2].src = "./Cauldron/Caldero_F3.png";
	
	spritesCauldron[3] = new Image();
	spritesCauldron[3].src = "./Cauldron/Caldero_F4.png";
	
	var animC = new Animation(spritesCauldron, true, 5);
	var animatorC = new Animator();
	
	//Controlador escenas
	var sceneManager = new SceneManager();
	var sceneElements;
	var allScenes = sceneManager.createScenes();
	var currentScene = allScenes[level-1];
	
	//Controlador verduras
	var foodGen = new FoodGenerator(1280, 700);
	var foods = [];
	var fThrown = [];
    
    //Array que contiene todas las recetas
	var recipesLeft;
    var recipes;
	var recIndex = 0; //index de la recipe actual
    
    

    //Receta actual
    var currentRecipe = new Recipe();
    //-- Inicializar
    
    //--Inicializar escena antes de que se inicie el loop updateScene
    initWorld(level);
    //Habilitamos un temporizador que se active 30 veces por segundo
    //var temporizador = setInterval(updateWorld, 1000/60);
    //Habilitamos un temporizador que se activará a la velocidad del monitor
    requestAnimationFrame(updateScene);

    canvas.addEventListener("mousedown", mouseManage, false);
	//window.addEventListener('resize',resizeCanvas,false);
    

    //Creacion de nivel

    //--

    //Incrementa el score
    this.addScore = function(s)
    {
        score += s;
    }

    //Inicializa el mundo
    function initWorld(level)
    {    
		inicializarCanvas();
		
		if(level == 0){
			currentScene = allScenes[0];
		}else{
			currentScene = allScenes[1];
		}
		
		sceneManager.buildScene(currentScene, context); //construye el nivel
		sceneElements = currentScene.getAllElements();
		player = sceneElements[0]; //El jugador siempre en primera posicion 
		god = sceneElements[1];	//y dios en la segunda
		createLifes(); //crea las vidas
		recipes=createRecipes(level); //crea las recetas segun el nivel
		currentRecipe = recipes[recIndex]; //guarda la primera receta
		console.log(currentRecipe.showInConsole());
		

        //Sonido de incio de nivel
        /*levelStart.volume = volume;
        levelStart.pause();
        levelStart.currentTime = 0
        levelStart.play();*/

    }

	function createLifes(){
		lifes = new Lifes(3);
		player.setLifes(3);
    }
	
	function createRecipes(level){
		recipes1 = [];
		for(var i = 0; i < 3; i++){
			recipes1[i] = new Recipe();
			recipes1[i].createRecipe(level);
		}
		recipesLeft = 3;
		return recipes1;
	}
	
	//Dibujar Background
	function drawBackground(){
		
		//**************
		//Pinta el fondo
		//**************
		var v = 640 - backgroundSpr.width/2;
        var z = 360 - backgroundSpr.height/2;
        
		context.drawImage(backgroundSpr,v,z);
		
		//**************
		//Pinta el caldero
		//**************		
		animatorC.play(animC, context, 160, 200);
		
		//**************
		//Pinta el cartel de las recetas
		//**************		
		var m = 220 - recipeZoneSpr.width/2;
        var n = 100 - recipeZoneSpr.height/2;
		
        context.drawImage(recipeZoneSpr,m,n);	
	}
	
    
    //Comprueba si la receta esta completa
    function updateRecipeStatus(f){
		var checkLifes=god.checkIngredient(currentRecipe, f);
		if(checkLifes==false){     	//si es false significa que el ingrediente es incorrecto 
									//pierde vida
			var l = player.getLifes();
			l--;
			if(l == 0){
				player.setLifes(l);
				lifes.setLifes(l);
				lifes.setDying(true);
				lose = true;
			}else{
				player.setLifes(l);
				lifes.setLifes(l);
				lifes.setDying(true);
			}
		}else{
			if(checkLifes==true){ //Si es true significa que el ingrediente es un topo
				lose=true;		
								  //pierde todas las vidas   
				player.setLifes(0);
				lifes.setLifes(0);
				lifes.setDying(true);
			}else{
				currentRecipe = checkLifes;
			}

		}

          //actualiza la receta
		//Si a la receta no le quedan ingredientes, guarda la siguiente
		if(currentRecipe.getRecipe().length == 0){
			recipesLeft--;
			nextRecipe();
		}
		//--
		console.log(currentRecipe.showInConsole());
    }
	
	function nextRecipe(){
		recIndex++;
		if(recIndex == recipes.length){
			currentRecipe = new Recipe();
			win = true;
		}else{
			currentRecipe = recipes[recIndex];
		}
	}
	
	function drawQuantity(){		
		var posx=90;
		//pinta las cantidades de los ingredientes
		if(currentRecipe.getRecipe().length > 3){
			for(var i = 0; i < 3; i++){				
				UIController.drawQuantity(posx,110,currentRecipe.getIngredient(i).getQuantity())
				//UIcontroller.drawQuantity(posx,200,currentRecipe.getIngredient[i].getQuantity());
				posx+=70;
			}
		}else{
			for(var i = 0; i < currentRecipe.getRecipe().length; i++){				
				UIController.drawQuantity(posx,110,currentRecipe.getIngredient(i).getQuantity())
				//UIcontroller.drawQuantity(posx,200,currentRecipe.getIngredient[i].getQuantity());
				posx+=70;
			}	
		}		
	}
	
	function drawHUD()
	{
		//-- pintar el level
		lifes.draw(context);
		//-- pintar vidas
		//vidas.draw.
		
		var x = 130 - levelSprites[level-1].width/2;
        var y = 450 - levelSprites[level-1].height/2;
        
        //--Posiblemente se deban añadir mas cosas

        context.drawImage(levelSprites[level-1],x,y);
		
	}


    //Detecta el cambio de nivel y inicializa este
    function nextLevel()
    {					
        level++;
		resetValues();
		initWorld(level);		
    }

    //Maneja el raton
    function mouseManage(e)
    {
        console.log("mouse");
        if (e.type == "mousedown"){
            if(win){
				nextLevel();
			}else if(lose){
				restart();
			}else{
				if(!player.getThrowing()){
					player.setThrowing(true); //cambio variable para elegir la animacion
					for(var i = 0; i<foods.length; i++){ //recorre las comidas
						if(player.getX() <= foods[i].getX() + 30 && player.getX() >= foods[i].getX() - 30){ //si el granjero está en la hitbox de alguna
							
							var f = foods[i]; //saca la comida del array de las que se mueven
							f.setThrown(true); //lo cambia a la lanzada
							foods.splice(i,1);
							fThrown.push(f); //la mete en el otro array;
							break;
						}
					}
				}
			}
        
			
		}
    }

    //Reinicia el mundo tras un GameOver
    function restart()
    {
		resetValues();
		initWorld(level);		
    }
    
    //Reduce el numero de childs(vidas) de farmer en la cantidad indicada "q"
    function killChilds(q){
        //--
    }
    
    //Chequea si e ha ganado el nivel (Ha completado todas las recetas)
    function getWin(){
        if(win){
			play = false;
			UIController.drawWin(640, 360, 0);
		}
    }

    //Comprueba si se ha llegado a game over, (Se ha quedado farmer sin vidas)
    function gameOver()
    {
		if(lose){
			play=false;
			UIController.drawGameOver(640,360,0);
		}
    }
    
    //Reestablece los valores de inicio para reiniciar nivel
    function resetValues(){
        win=false;
		lose=false;
		play=true;
		recIndex=0;
		foodGen.restart();
		foods = [];
		fThrown = [];
		//--
    }


    //Dibuja la escena cada frame
    function drawScene(context)
    {
        //-- Activa la funcion draw de todos los elementos que se deban mostrar por pantalla.
		
		context.clearRect(0, 0, canvas.width, canvas.height);//primero se limpia el canvas
		//se pinta el fondo y el caldero
		drawBackground();		
		
		for(var i = 0; i < sceneElements.length; i++){ //pinta los elementos de la escena
			sceneElements[i].draw(context);
		}
			
		//pinta el nivel en el que nos encontramos y las vidas.
		drawHUD();
			
		
			
		//*************************
			
				
		for(var i = 0; i < foods.length; i++){ //pinta las comidas que van saliendo
			foods[i].draw(context);
		}			
		
		for(var i = 0; i < fThrown.length; i++){ //pinta los las comidas que han sido lanzadas
			fThrown[i].draw(context);
		}
		for(var i = 0; i < lifes.length; i++){ //pinta los las vidas 
			lifes[i].draw(context);
		}
		currentRecipe.draw(context); //pinta las recetas
		drawQuantity();
			
		UIController.drawRecipesLeft(10,160, recipesLeft);
		
		//pinta la barra de separacion del cielo y la tierra
		animatorM.play(animMiddle, context, 640, 340);
		
		//*************
		//Pinta el suelo por encima de todos
		
		var m = 640 - floorSpr.width/2;
        var n = 740 - floorSpr.height/2;
		
        context.drawImage(floorSpr,m,n);	
		
		if(win){
			UIController.drawWin(640, 360, 0);
		}else if (lose){
			UIController.drawGameOver(640, 360, 0);
		}
    }
	
	//Actualiza todos los elementos
	function updateElements()
	{
		if(play){
			foods = foodGen.update(level);
			lifes.update();
			for(var i = 0; i < sceneElements.length; i++)
			{
				sceneElements[i].update();
			}
			for(var i = 0; i < fThrown.length; i++)
			{
				fThrown[i].update();
				if(fThrown[i].getY() <=150){
					//player.setThrowing(false);
					var f = fThrown.splice(i, 1);
					updateRecipeStatus(f);
				}
			}
		}
	}
	
	function inicializarCanvas(){ 
  		if (canvas && canvas.getContext) {
    		var ctx = canvas.getContext("2d");
        	if (ctx) {
			 var s = getComputedStyle(canvas);
			 var w = /*s.width*/1280;
			 var h = /*s.height*/720;
					
			 W = canvas.width =w/* w.split("px")[0]*/;
			 H = canvas.height =h /*h.split("px")[0]*/;
			 
			
			   
			 }
		}
	}

    /*function resizeCanvas(){
		var canv = $('Canvas');
		canv.css("width",$(window).width());
		canv.css("height",$(window).height());
		 console.log("Resize");
	}*/

    //Actualiza la escena
    function updateScene()
    {        
	
        getWin();
        gameOver();
		updateElements();
        drawScene(context);
        requestAnimationFrame(updateScene);
    }

}