function GameController(cont,canv){
    
    //Atributos
    var play = false;
    var score = 0;
    var level = 0;
    var context = cont;
    var player;
	var god;
	
	//canvas values
    var canvas = canv;
	var rect = canvas.getBoundingClientRect();
	//var c = getComputedStyle(canvas);
	//var iniw = c.width;
	//var inih = c.height;
	//var initialCanvW = iniw.split("px")[0];
	//var initialCanvH = inih.split("px")[0];
	
	//console.log("canvas: H " + initialCanvH+" W "+initialCanvW);
	
	var factorResize = 1;
	
	var currentCanvW;
	var currentCanvH;
	
	var video = document.getElementById('video');
	var ngButtonPressed = false;
	var videoP = false;
	
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
	var currentScene;
	
	//Controlador verduras
	var foodGen = new FoodGenerator(1280, 700);
	var foods = [];
	var fThrown = [];
    
    //Array que contiene todas las recetas
	var recipesLeft;
    var recipes;
	var recIndex = 0; //index de la recipe actual
	
	//GameOver Sprites
	var gameOverPanel = new Image();
	gameOverPanel.src = "./GameOver/GameOver.png";
	
	var retryButton = new Image();
	retryButton.src = "./GameOver/Retry_Button.png";
	
	//Win-NextLevel sprites
	var winPanel = new Image();
	var winButton = new Image();
	
	//Sounds
	var volume = 0.3;
	var backgroundVolume = 0.2;
	var music = document.getElementById("music");
	var pickVSound = document.getElementById("pickVegetable");
	var btnSound = document.getElementById("buttonClick");
	var winSound = document.getElementById("winSound");
	var loseSound = document.getElementById("loseSound");
	var cmpltRecipeSound = document.getElementById("completeRecipe");
	
    
    

    //Receta actual
    var currentRecipe = new Recipe();
    //-- Inicializar
    
    //--Inicializar escena antes de que se inicie el loop updateScene
    initWorld(level);
    //Habilitamos un temporizador que se active 30 veces por segundo
    //var temporizador = setInterval(updateWorld, 1000/60);
    //Habilitamos un temporizador que se activará a la velocidad del monitor
    requestAnimationFrame(updateScene);

	window.addEventListener("keypress", spaceBarManage, false);
    canvas.addEventListener("mousedown", mouseManage, false);
	
	//window.addEventListener('resize',resizeCanvas,false);
    

    //Video
	$(function() {
	  video.addEventListener('play', function() {
		var $this = this; //cache
		(function loop() {
		  if (!$this.paused && !$this.ended) {
			context.drawImage($this, 0, 0);
			setTimeout(loop, 1000 / 30); // drawing at 30fps
		  }
		})();
	  }, 0);
	});
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
		
		if(level == 0 && !ngButtonPressed){
			video.pause();
			currentScene = allScenes[0];
			sceneManager.buildScene(currentScene, context); //construye el nivel
			sceneElements = currentScene.getAllElements();	
			
			music.volume = backgroundVolume;
			music.pause();
			music.currentTime = 0
			music.play();
		}else if (level == 0 && ngButtonPressed){
			music.pause();
			play = false;
			video.play();				
		}else{
			
			music.volume = backgroundVolume;
			music.pause();
			music.currentTime = 0
			music.play();
			
			currentScene = allScenes[1];
			sceneManager.buildScene(currentScene, context); //construye el nivel
			sceneElements = currentScene.getAllElements();
			player = sceneElements[0]; //El jugador siempre en primera posicion 
			god = sceneElements[1];	//y dios en la segunda
			createLifes(); //crea las vidas
			recipes=createRecipes(level); //crea las recetas segun el nivel
			currentRecipe = recipes[recIndex]; //guarda la primera receta
			console.log(currentRecipe.showInConsole());
		}
		
		
		

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
		recipesLeft = 2;
		return recipes1;
	}
	
	//Reproduce el sonido de los botones
	function playButtonSound(){
		btnSound.volume = volume;
        btnSound.pause();
        btnSound.currentTime = 0
        btnSound.play();
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
			
			cmpltRecipeSound.volume = volume;
			cmpltRecipeSound.pause();
			cmpltRecipeSound.currentTime = 0
			cmpltRecipeSound.play();
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
				posx+=60;
			}
		}else{
			for(var i = 0; i < currentRecipe.getRecipe().length; i++){				
				UIController.drawQuantity(posx,110,currentRecipe.getIngredient(i).getQuantity())
				//UIcontroller.drawQuantity(posx,200,currentRecipe.getIngredient[i].getQuantity());
				posx+=60;
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
	
	function itsInside(obj,px,py,oX,oY)
		{
			var semiWidth = (obj.width/2) * factorResize;
			var semiHeight = (obj.height/2) * factorResize;
			//Variables barra
			var topO =  (oY* factorResize)-semiHeight;
			var botO =  (oY* factorResize)+semiHeight;
			var rightO = (oX* factorResize)+semiWidth;
			var leftO = (oX* factorResize)-semiWidth;
			
			console.log("canvas: H " + currentCanvH+" W "+currentCanvW);
			console.log(factorResize.toString());
			console.log("mouse ("+px.toString()+","+py.toString()+")");
			console.log("button: L-"+leftO+" R-"+rightO+" T-"+topO+" B-"+botO);
			
			if (px > leftO && px < rightO && py < botO && py > topO){
				console.log("pulsado");
				return true;
			}else{
				console.log("no entro");
				return false;
			}
			
		}

    //Maneja el raton
    function mouseManage(e)
    {
		var mouseX = e.clientX- rect.left;
		var mouseY = e.clientY - rect.top;
		
        if (e.type == "mousedown"){
			if(level==0){
				if(videoP){
					videoP = false;
					video.pause();
					video.currentTime = 0;
					nextLevel();
				}else{					
					if(sceneElements[4]){
						sceneElements[4] = false;
						playButtonSound();
					}else{
						
						//check click on new game
						if(itsInside(sceneElements[1], mouseX, mouseY, 640, 400) && !videoP){						
							ngButtonPressed = true;
							videoP = true;
							playButtonSound();
							initWorld(level);
						}else if(itsInside(sceneElements[2], mouseX, mouseY, 640, 550) && !videoP){
							sceneElements[4] = true;
							playButtonSound();
						}
					}
				}
			}else{
				if(win && itsInside(winButton, mouseX, mouseY, 640, 550)){
					if(level != 3){
						playButtonSound();
						nextLevel();						
					}else{
						playButtonSound();
						restartFullGame();						
					}
				}else if(lose && itsInside(retryButton, mouseX, mouseY, 640, 550)){
					playButtonSound();
					restart();
				}else{
					if(!player.getThrowing()){
						player.setThrowing(true); //cambio variable para elegir la animacion
						for(var i = 0; i<foods.length; i++){ //recorre las comidas
							if(player.getX() <= foods[i].getX() + 30 && player.getX() >= foods[i].getX() - 30){ //si el granjero está en la hitbox de alguna
								
								pickVSound.volume = volume;
								pickVSound.pause();
								pickVSound.currentTime = 0
								pickVSound.play();
								
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
    }
	
	function pene(e){
		console.log("sacabao");
	}
	
	function spaceBarManage(e)
    {		
		console.log("entrando");
        if (e.keyCode == 32){
			console.log("es el espacio");
			if(level==0){
				if(videoP){
					videoP = false;
					video.pause();
					video.currentTime = 0;
					nextLevel();
				}
			}else{
				if(win){
					if(level != 3){
						playButtonSound();
						nextLevel();						
					}else{
						playButtonSound();
						restartFullGame();						
					}
				}else if(lose){
					playButtonSound();
					restart();
				}else{
					if(!player.getThrowing()){
						player.setThrowing(true); //cambio variable para elegir la animacion
						for(var i = 0; i<foods.length; i++){ //recorre las comidas
							if(player.getX() <= foods[i].getX() + 30 && player.getX() >= foods[i].getX() - 30){ //si el granjero está en la hitbox de alguna
								
								pickVSound.volume = volume;
								pickVSound.pause();
								pickVSound.currentTime = 0
								pickVSound.play();
								
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
    }

    //Reinicia el mundo tras un GameOver
    function restart()
    {
		resetValues();
		initWorld(level);		
    }
	
	function restartFullGame(){
		resetValues();
		ngButtonPressed = false;
		play = false;
		level = 0;
		initWorld(level);
	}
    
    //Chequea si e ha ganado el nivel (Ha completado todas las recetas)
    function getWin(){
        if(win){
			
			winSound.volume = volume;
			winSound.pause();
			winSound.currentTime = 0
			winSound.play();
			
			play = false;
			if(level == 3){
				winPanel.src = "./Win_Menu/Victoria_Cartel.png";
				winButton.src = "./Win_Menu/Menu_Button.png";
			}else{
				winPanel.src = "./NextLevel_Menu/LevelSucceed_Cartel.png";
				winButton.src = "./NextLevel_Menu/NextLevel_Button.png";
			}
		}
    }

    //Comprueba si se ha llegado a game over, (Se ha quedado farmer sin vidas)
    function gameOver()
    {
		if(lose){
			loseSound.volume = volume;
			loseSound.pause();
			loseSound.currentTime = 0
			loseSound.play();
			
			play=false;
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
	
	function drawLevelScene(context){
		//se pinta el fondo y el caldero
		
		drawBackground();		
		
		for(var i = 0; i < sceneElements.length; i++){ //pinta los elementos de la escena
			sceneElements[i].draw(context);
		}
			
		//pinta el nivel en el que nos encontramos y las vidas.
		drawHUD();			
				
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
			drawWin();
		}else if (lose){
			drawGameOver();
		}
	}
	
	function drawWin(){
		//Panel
		var a = 640 - winPanel.width/2;
		var b = 300 - winPanel.height/2;
		context.drawImage(winPanel,a,b);
			
		//Button
		var c = 640 - winButton.width/2;
		var d = 550 - winButton.height/2;
		context.drawImage(winButton,c,d);
	}
	
	function drawGameOver(){
		//Panel
		var a = 640 - gameOverPanel.width/2;
		var b = 300 - gameOverPanel.height/2;
		context.drawImage(gameOverPanel,a,b);
			
		//Button
		var c = 640 - retryButton.width/2;
		var d = 550 - retryButton.height/2;
		context.drawImage(retryButton,c,d);
	}
	
	function drawMainMenu(context){
		//Background
		var m = 640 - sceneElements[0].width/2;
		var n = 360 - sceneElements[0].height/2;
		
		context.drawImage(sceneElements[0],m,n);
		
		if(sceneElements[4]){
			var g = 640 - sceneElements[3].width/2;
			var j = 360 - sceneElements[3].height/2;
		
			context.drawImage(sceneElements[3],g,j);
		}else{
			//NewGame
			var a = 640 - sceneElements[1].width/2;
			var b = 400 - sceneElements[1].height/2;
		
			context.drawImage(sceneElements[1],a,b);
			
			//ContactUS
			var c = 640 - sceneElements[2].width/2;
			var d = 550 - sceneElements[2].height/2;
		
			context.drawImage(sceneElements[2],c,d);
		}
	}
	


    //Dibuja la escena cada frame
    function drawScene(context)
    {
        //-- Activa la funcion draw de todos los elementos que se deban mostrar por pantalla.
			
			
			if(level==0 && !ngButtonPressed){
				context.clearRect(0, 0, canvas.width, canvas.height);//primero se limpia el canvas
				drawMainMenu(context);
			}else if(level > 0){
				context.clearRect(0, 0, canvas.width, canvas.height);//primero se limpia el canvas
				drawLevelScene(context);
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
					if(fThrown[i].getType() == "mole" || fThrown[i].getType() == "moleExp"){
						if(!fThrown[i].getExploding() && !fThrown[i].getExploded()){
							fThrown[i].setExploding(true);
						}else if(fThrown[i].getExploding() && fThrown[i].getExploded()){
							//player.setThrowing(false);
							var f = fThrown.splice(i, 1);
							updateRecipeStatus(f);
						}
					}else{
						var f = fThrown.splice(i, 1);
						updateRecipeStatus(f);
					}
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
	
	function updateCanvasvalues(){
		rect = canvas.getBoundingClientRect();
		var s = getComputedStyle(canvas);
		var cW = s.width;
		var cH = s.height;
		currentCanvH = cH.split("px")[0];
		currentCanvW = cW.split("px")[0];
		
		
		factorResize = currentCanvW / 1280;
		
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
		if(video.ended && ngButtonPressed && level==0 && videoP){
			console.log("sacabao");
			videoP =false;
			nextLevel();

		}
		updateCanvasvalues();
		if(level!=0 && play){
			getWin();
			gameOver();
			updateElements();
		}
        drawScene(context);
        requestAnimationFrame(updateScene);
    }

}