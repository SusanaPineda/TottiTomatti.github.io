function Lifes(l) {
    //Inicialializa la posicion y decide que tipo de vegetal será
    var x = 1100;
    var y = 184;
    //var index=id;
	var lifes = l;
	var dying = false;
	var sprites = [];
	var animator = new Animator();
    //var anim = new Animation(sprites,true,3);
	
	//************************
    //Sprites y animacion de 3 vidas.
	//************************
	var L3HP = [];
	L3HP[0] = new Image();
	L3HP[0].src = "./Lifes/3HP/3vid_Frame1.png"
	
	L3HP[1] = new Image();
	L3HP[1].src = "./Lifes/3HP/3vid_Frame2.png"
	
	var anim3hp = new Animation(L3HP, true, 3);
	
	//************************
	//Sprites y animacion de transicion de 3 a 2
	//************************
	var L3to2 = [];
	L3to2[0] = new Image();
	L3to2[0].src = "./Lifes/3To2/3-2tran_Frame1.png";
	
	L3to2[1] = new Image();
	L3to2[1].src = "./Lifes/3To2/3-2tran_Frame2.png";
	
	L3to2[2] = new Image();
	L3to2[2].src = "./Lifes/3To2/3-2tran_Frame3.png";
	
	L3to2[3] = new Image();
	L3to2[3].src = "./Lifes/3To2/3-2tran_Frame4.png";
	
	L3to2[4] = new Image();
	L3to2[4].src = "./Lifes/3To2/3-2tran_Frame5.png";
	
	L3to2[5] = new Image();
	L3to2[5].src = "./Lifes/3To2/3-2tran_Frame6.png";
	
	L3to2[6] = new Image();
	L3to2[6].src = "./Lifes/3To2/3-2tran_Frame7.png";
	
	L3to2[7] = new Image();
	L3to2[7].src = "./Lifes/3To2/3-2tran_Frame8.png";
	
	var anim3to2 = new Animation(L3to2, false, 20);
	
	//************************
	//Sprites y animacion de 2 vidas
	//************************
	var L2HP = [];
	L2HP[0] = new Image();
	L2HP[0].src = "./Lifes/2HP/2vid_Frame1.png"
	
	L2HP[1] = new Image();
	L2HP[1].src = "./Lifes/2HP/2vid_Frame2.png"
	
	var anim2hp = new Animation(L2HP, true, 3);
	
	//***********************
	//Sprites y animacion de transicion de 2 a 1 
	//***********************
	var L2to1 = [];
	L2to1[0] = new Image();
	L2to1[0].src = "./Lifes/2To1/2-1tran_Frame1.png";
	
	L2to1[1] = new Image();
	L2to1[1].src = "./Lifes/2To1/2-1tran_Frame2.png";
	
	L2to1[2] = new Image();
	L2to1[2].src = "./Lifes/2To1/2-1tran_Frame3.png";
	
	L2to1[3] = new Image();
	L2to1[3].src = "./Lifes/2To1/2-1tran_Frame4.png";
	
	L2to1[4] = new Image();
	L2to1[4].src = "./Lifes/2To1/2-1tran_Frame5.png";
	
	L2to1[5] = new Image();
	L2to1[5].src = "./Lifes/2To1/2-1tran_Frame6.png";
	
	L2to1[6] = new Image();
	L2to1[6].src = "./Lifes/2To1/2-1tran_Frame7.png";
	
	L2to1[7] = new Image();
	L2to1[7].src = "./Lifes/2To1/2-1tran_Frame8.png";
	
	var anim2to1 = new Animation(L2to1, false, 20); 
	
	//************************
	//Sprites y animacion de 1 vidas
	//************************
	var L1HP = [];
	L1HP[0] = new Image();
	L1HP[0].src = "./Lifes/1HP/1vid_Frame1.png"
	
	L1HP[1] = new Image();
	L1HP[1].src = "./Lifes/1HP/1vid_Frame2.png"
	
	var anim1hp = new Animation(L1HP, true, 3);
	
	//***********************
	//Sprites y animacion de transicion de 1 a 0 
	//***********************
	var L1to0 = [];
	L1to0[0] = new Image();
	L1to0[0].src = "./Lifes/1To0/1-0tran_Frame1.png";
	
	L1to0[1] = new Image();
	L1to0[1].src = "./Lifes/1To0/1-0tran_Frame2.png";
	
	L1to0[2] = new Image();
	L1to0[2].src = "./Lifes/1To0/1-0tran_Frame3.png";
	
	L1to0[3] = new Image();
	L1to0[3].src = "./Lifes/1To0/1-0tran_Frame4.png";
	
	L1to0[4] = new Image();
	L1to0[4].src = "./Lifes/1To0/1-0tran_Frame5.png";
	
	L1to0[5] = new Image();
	L1to0[5].src = "./Lifes/1To0/1-0tran_Frame6.png";
	
	L1to0[6] = new Image();
	L1to0[6].src = "./Lifes/1To0/1-0tran_Frame7.png";
	
	L1to0[7] = new Image();
	L1to0[7].src = "./Lifes/1To0/1-0tran_Frame8.png";
	
	L1to0[8] = new Image();
	L1to0[8].src = "./Lifes/1To0/1-0tran_Frame9.png";
	
	var anim1to0 = new Animation(L1to0, false, 20); 
    
    //Atributos
    var spawnRate;
    var speed = 5;
    

    
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
	this.getLifes = function(){
		return lifes;
	}
	this.setLifes = function(l){
		lifes = l;
	}
	this.setDying = function(d){
		dying = d;
	}
	
	
	this.destroy = function(){
		//--
	}

    //Dibuja el sprite del suelo
    this.draw = function(context)//count es la posicion para pintar la vida
    {	
        if(lifes == 3){
			animator.play(anim3hp, context, x, y);
		}else if(lifes == 2){
			if(dying){
				animator.play(anim3to2, context, x, y);
			}else{
				animator.play(anim2hp, context, x, y);
			}
		}else if(lifes == 1){
			if(dying){
				animator.play(anim2to1, context, x, y);
			}else{
				animator.play(anim1hp, context, x, y);
			}
		}else if (lifes == 0){
			animator.play(anim1to0, context, x, y);
		}
    }

    //Actuliza el estado del suelo
    //El atributo e es el evento de control de raton o teclado si fuera necesario
    this.update = function(e)
    {       
        if((anim3to2.getCurrentPosition() >= L3to2.length-1)||
			(anim2to1.getCurrentPosition() >= L2to1.length-1)||
			(anim1to0.getCurrentPosition() >= L1to0.length-1)){
			dying = false;
		}        
    }

}