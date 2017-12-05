function GameController(cont,canv){
    
    //Atributos
    var play = false;
    var level = 0;
    var context = cont;
    var player;
	var god;
	var initTime;
	var finalTime;
	var crono;
	var timeLimit;
	var UIController = new UIcontroller(context);
	var lifes;
	
	//canvas values
    var canvas = canv;
	var rect = canvas.getBoundingClientRect();
	
	var factorResize = 1;
	
	var currentCanvW;
	var currentCanvH;
	
	//Video introduccion
	var video = document.getElementById('video');
	var ngButtonPressed = false;
	var videoP = false;	
	
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
	
	//Controles sprites
	var spritesControls = [];
	
	spritesControls[0] = new Image();
	spritesControls[0].src = "./Controles/Controles_F1.png";
	
	spritesControls[1] = new Image();
	spritesControls[1].src = "./Controles/Controles_F2.png";
	
	var animControls = new Animation(spritesControls, true, 3);
	var animatorControls = new Animator();
	
	var firstClick = false; //cuando el jugador pulse por primera vez la pantalla se pondra a true
							//y dejara de aparecer los sprites.
	
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
   
    initWorld(level);
    //Habilitamos un temporizador que se activará a la velocidad del monitor
    requestAnimationFrame(updateScene);	
	
	//Listeners
	window.addEventListener("keypress", spaceBarManage, false);
    canvas.addEventListener("mousedown", mouseManage, false);
    

    //Video reproduccion
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
	
	//Crea las vidas
	function createLifes(){
		lifes = new Lifes(3);
		player.setLifes(3);
    }
	
	//Crea las recetas
	function createRecipes(level){
		recipes1 = [];
		for(var i = 0; i < 3; i++){
			recipes1[i] = new Recipe();
			recipes1[i].createRecipe(level);
		}
		recipesLeft = 2;
		return recipes1;
	}
	
	//Dibujar fondo, caldeor y cartel de las recetas
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
	
	//Dibuja la pantalla de GameOver
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
	
	//Pinta los sprites de las vidas, el nivel actual y los controles al principio de la partida
	function drawHUD()
	{
		//Pinta las vidas
		lifes.draw(context);
		
		//Pinta el nivel en el que estamos
		var x = 130 - levelSprites[level-1].width/2;
        var y = 450 - levelSprites[level-1].height/2;

        context.drawImage(levelSprites[level-1],x,y);
		
		//Pinta los controles si aun no hemos tocado la pantalla
		if(!firstClick){
			animatorControls.play(animControls, context, 500, 500);
		}		
	}
	
	//Pinta el nivel de juego
	function drawLevelScene(context){
		//se pinta el fondo y el caldero		
		drawBackground();		
		
		//pinta los elementos de la escena
		for(var i = 0; i < sceneElements.length; i++){ 
			sceneElements[i].draw(context);
		}
			
		//pinta el nivel en el que nos encontramos y las vidas.
		drawHUD();			
		
		//pinta las comidas que del suelo		
		for(var i = 0; i < foods.length; i++){ 
			foods[i].draw(context);
		}			
		
		//pinta los las comidas que han sido lanzadas
		for(var i = 0; i < fThrown.length; i++){ 
			fThrown[i].draw(context);
		}
		
		//pinta las recetas y la cantidad de ingredientes
		currentRecipe.draw(context); 
		drawQuantity();
		
		//pinta el numero de recetas restantes y el contador de tiempo
		UIController.drawRecipesLeft(10,160, recipesLeft);		
		UIController.drawTime(1150,450,timeLimit-Math.floor(crono));
		
		//pinta la barra de separacion del cielo y la tierra
		animatorM.play(animMiddle, context, 640, 340);
		
		//*************
		//Pinta el suelo por encima de todo
		
		var m = 640 - floorSpr.width/2;
        var n = 740 - floorSpr.height/2;
		
        context.drawImage(floorSpr,m,n);	
		
		//Si has perdido o ganado pinta sus respectivos menus
		if(win){
			drawWin();
		}else if (lose){
			drawGameOver();
		}
	}
	
	//Dibuja el menu principal
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
	
	//Pinta la cantidad de ingredientes que quedan de la receta actual
	function drawQuantity(){		
		var posx=90;
		//pinta las cantidades de los ingredientes
		if(currentRecipe.getRecipe().length > 3){
			for(var i = 0; i < 3; i++){				
				UIController.drawQuantity(posx,110,currentRecipe.getIngredient(i).getQuantity())
				posx+=60;
			}
		}else{
			for(var i = 0; i < currentRecipe.getRecipe().length; i++){				
				UIController.drawQuantity(posx,110,currentRecipe.getIngredient(i).getQuantity())
				posx+=60;
			}	
		}		
	}

    //Dibuja la escena cada frame
    function drawScene(context)
    {		
		if(level==0 && !ngButtonPressed){ //si es el menu y no se esta reproduciendo el video se pinta el menu
			context.clearRect(0, 0, canvas.width, canvas.height);//primero se limpia el canvas
			drawMainMenu(context);
		}else if(level > 0){ //se pinta el nivel
			context.clearRect(0, 0, canvas.width, canvas.height);//primero se limpia el canvas
			drawLevelScene(context);
		}		
    }
	
	//Dibuja la pantalla de victoria
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
	
	//Prepara el canvas
	function inicializarCanvas(){ 
  		if (canvas && canvas.getContext) {
    		var ctx = canvas.getContext("2d");
        	if (ctx) {
				var s = getComputedStyle(canvas);
				var w = 1280;
				var h = 720;
					
				W = canvas.width =w;
				H = canvas.height =h;			   
			}
		}
	}

    //Inicializa el mundo
    function initWorld(level)
    {    
		inicializarCanvas(); //primero de todo prepara el canvas
		
		if(level == 0 && !ngButtonPressed){ //si es level 0 es el menu
			video.pause();
			currentScene = allScenes[0];
			sceneManager.buildScene(currentScene, context); //construye el nivel
			sceneElements = currentScene.getAllElements();	
			
			music.volume = backgroundVolume;
			music.pause();
			music.currentTime = 0
			music.play();
		}else if (level == 0 && ngButtonPressed){ //si es level 0 y has pulsado el boton de jugar reproduce el video
			music.pause();
			play = false;
			video.play();				
		}else{			//si no es nada de eso es un nivel de juego
			var dateinit = new Date();
		    initTime = dateinit.getTime();
			music.volume = backgroundVolume;
			music.pause();
			music.currentTime = 0
			music.play();
			
			currentScene = allScenes[1]; //recupera la escena
			sceneManager.buildScene(currentScene, context); //construye el nivel
			sceneElements = currentScene.getAllElements(); //guarda sus elementos
			player = sceneElements[0]; //El jugador siempre en primera posicion 
			god = sceneElements[1];	//y dios en la segunda
			createLifes(); //crea las vidas
			recipes=createRecipes(level); //crea las recetas segun el nivel
			currentRecipe = recipes[recIndex]; //guarda la primera receta
		}
    }
	
	//Comprueba si el raton esta encima de un objeto dado
	function itsInside(obj,px,py,oX,oY)
	{
		var semiWidth = (obj.width/2) * factorResize;
		var semiHeight = (obj.height/2) * factorResize;
		//Variables boton
		var topO =  (oY* factorResize)-semiHeight;
		var botO =  (oY* factorResize)+semiHeight;
		var rightO = (oX* factorResize)+semiWidth;
		var leftO = (oX* factorResize)-semiWidth;
		
		if (px > leftO && px < rightO && py < botO && py > topO){
			return true;
		}else{
			return false;
		}		
	}
	
	//Maneja el raton
    function mouseManage(e)
    {
		var mouseX = e.clientX- rect.left;
		var mouseY = e.clientY - rect.top;
		
        if (e.type == "mousedown"){ //solo entra si el click es del raton
			if(!firstClick){ //la primera vez que hagas click pondra el bool a true para hacer desaparecer los controles
				firstClick = true;
			}
			if(level==0){ //funciones del menu
				if(videoP){ //si se esta reproduciendo el video se salta
					videoP = false;
					video.pause();
					video.currentTime = 0;
					nextLevel();
				}else{					
					if(sceneElements[4]){ //si estan abiertos los contactos los oculta
						sceneElements[4] = false;
						playButtonSound();
					}else{
						
						//check click on new game
						if(itsInside(sceneElements[1], mouseX, mouseY, 640, 400) && !videoP){ //si pulsa new game 				
							ngButtonPressed = true;
							videoP = true;
							playButtonSound();
							initWorld(level);
						}else if(itsInside(sceneElements[2], mouseX, mouseY, 640, 550) && !videoP){ //si pulsa los contactos
							sceneElements[4] = true;
							playButtonSound();
						}
					}
				}
			}else{ //cualquier nivel
				if(win && itsInside(winButton, mouseX, mouseY, 640, 550)){ //si has ganado y pulsas el boton
					if(level != 3){ //si es el nivel 1 o 2 pasa de nivel
						playButtonSound();
						nextLevel();						
					}else{ //si es el nivel 3 vuelve a empezar el juego
						playButtonSound();
						restartFullGame();						
					}
				}else if(lose && itsInside(retryButton, mouseX, mouseY, 640, 550)){ //si has perdido y pulsas el boton resetea el nivel
					playButtonSound();
					restart();
				}else{
					if(!player.getThrowing()){ //si el granjero no esta lanzando
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
	
	//Detecta el cambio de nivel y inicializa este
    function nextLevel()
    {	
        level++;
		resetValues();
		initWorld(level);		
    }
	
	//Guarda la siguiente receta guardada
	function nextRecipe(){
		recIndex++;
		if(recIndex == recipes.length){
			currentRecipe = new Recipe();
			win = true;
		}else{
			currentRecipe = recipes[recIndex];
		}
	}
	
	//Reproduce el sonido de los botones
	function playButtonSound(){
		btnSound.volume = volume;
        btnSound.pause();
        btnSound.currentTime = 0
        btnSound.play();
	}
	
	//Reestablece los valores de inicio para reiniciar nivel
    function resetValues(){
        win=false;
		lose=false;
		play=true;
		firstClick = false;
		recIndex=0;
		foodGen.restart();
		foods = [];
		fThrown = [];
		crono=0;
    }
	
	//Reinicia el nivel tras un GameOver
    function restart()
    {
		resetValues();
		initWorld(level);		
    }
	
	//Resetea el juego completo
	function restartFullGame(){
		resetValues();
		ngButtonPressed = false;
		play = false;
		level = 0;
		initWorld(level);
	}
	
	//Funciones de la barra espaciadora
	function spaceBarManage(e)
    {		
        if (e.keyCode == 32){ //solo ejecuta acciones si es la spacebar;
			if(!firstClick){
				firstClick = true;
			}
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
	
	//Comprueba el tiempo que te queda para jugar
	function timeCheck(){	
		var datefinal = new Date();
		finalTime=datefinal.getTime();
		crono=(finalTime-initTime)/1000;
	 
		switch(level){
			case 1:
				timeLimit=120;
				break;
			case 2:
				timeLimit=180;
				break;
			case 3:
				timeLimit=240;
				break;
		}
		//si el tiempo llega a 0 pierdes
		if(crono>=timeLimit){			
			lose=true;
		}
	}
	
	//Actualiza el tamaño del canvas para el control de raton a cualquier resolucion
	function updateCanvasvalues(){
		rect = canvas.getBoundingClientRect();
		var s = getComputedStyle(canvas);
		var cW = s.width;
		var cH = s.height;
		currentCanvH = cH.split("px")[0];
		currentCanvW = cW.split("px")[0];		
		
		factorResize = currentCanvW / 1280;		
	}
	
	//Actualiza todos los elementos
	function updateElements()
	{
		if(play){
			foods = foodGen.update(level); //Recibe un array actualizado de verduras
			lifes.update(); //Actualiza las vidas
			
			//Actualiza al granjero porque dios no necesita update
			sceneElements[0].update();
			//Actualiza las verduras lanzadas
			for(var i = 0; i < fThrown.length; i++)
			{
				fThrown[i].update();
				if(fThrown[i].getY() <=150){ //si alguna llega a la altura de Dios
					if(fThrown[i].getType() == "mole" || fThrown[i].getType() == "moleExp"){//Si es un topo
						if(!fThrown[i].getExploding() && !fThrown[i].getExploded()){ //Si no ha explotado le dice que explote
							fThrown[i].setExploding(true);
						}else if(fThrown[i].getExploding() && fThrown[i].getExploded()){//Si ha explotado lo borra
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
    
    //Comprueba si la receta esta completa
    function updateRecipeStatus(f){
		var checkLifes=god.checkIngredient(currentRecipe, f);
		if(checkLifes==false){     	//si es false significa que el ingrediente es incorrecto 
									//pierde vida
			var l = player.getLifes();
			l--;
			if(l == 0){ //si las vidas son 0, el juegador pierde
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
				player.setLifes(0); //pierde todas las vidas 
				lifes.setLifes(0);
				lifes.setDying(true);
			}else{
				currentRecipe = checkLifes;
			}
		}

		//Si a la receta no le quedan ingredientes, guarda la siguiente
		if(currentRecipe.getRecipe().length == 0){
			recipesLeft--;
			nextRecipe();
			
			//Sonido receta completada
			cmpltRecipeSound.volume = volume;
			cmpltRecipeSound.pause();
			cmpltRecipeSound.currentTime = 0
			cmpltRecipeSound.play();
		}
    }	

    //Actualiza la escena
    function updateScene()
    {        
		if(video.ended && ngButtonPressed && level==0 && videoP){ //si el video ha terminado pasa de nivel
			videoP =false;
			nextLevel();
		}
		
		updateCanvasvalues(); //actualiza el canvas
		
		if(level!=0 && play){ //solo entra aqui si no es el menu y si la partida esta activa.			
			timeCheck(); //comprueba el tiempo
			getWin();	//comprueba si has ganado
			gameOver();	//comprueba si has perdido
			updateElements(); //actualiza la escena
		}
        drawScene(context); //pinta la escena
        requestAnimationFrame(updateScene); //se llama a si mismo con la velocidad de refresco del monitor
    }
}