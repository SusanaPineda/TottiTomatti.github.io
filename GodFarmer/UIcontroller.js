function UIcontroller(cont){
    //Inicialializa la posicion y decide que tipo de vegetal será
        //--
    var context = cont;
    var color = "#ffcc99";
	var whiteColor = "#ffffff";
	var blackColor = "#000000";

    //Muestra por pantalla la puntuación del jugador
    this.drawScore = function(px,py,score)
    {
        //Si está disponible la fuente de nuestra elección se usa esa, si no una genérica (Arial)
        if (isFontAvailable('NI7SEG')){
            context.fillStyle=color;
            context.font="18px NI7SEG";
            context.fillText("Score:" + score,px,py);
        }else{
            context.fillStyle=color;
            context.font="18px Arial";
            context.fillText("Score:" + score,px,py);
        }						
    }

    //Muestra por pantalla las vidas que le quedan al jugador
    this.drawLifes = function(px,py,lifes)
    {
        if (isFontAvailable('NI7SEG')){
            context.fillStyle=color;
            context.font="18px NI7SEG";
            context.fillText("Lifes:" + lifes,px,py);
        }else{
            context.fillStyle=color;
            context.font="18px Arial";
            context.fillText("Lifes:" + lifes,px,py);
        }						
    }

    //Muestra por pantalla el nivel en el que te encuentras
    this.drawLevel = function(px,py,level)
    {
        if (isFontAvailable('NI7SEG')){
            context.fillStyle=whiteColor;
            context.font="18px NI7SEG";
            context.fillText("Level:" + level,px,py);
        }else{
            context.fillStyle=whiteColor;
            context.font="18px Arial";
            context.fillText("Level:" + level,px,py);
        }						
    }

    //Muestra por pantalla el score del jugador y las instrucciones para empezar nueva partida
    this.drawGameOver = function(px,py,score)
    {
        if (isFontAvailable('NI7SEG')){
            context.fillStyle=blackColor;
            context.font="35px NI7SEG";
            context.fillText("GAME OVER!",px,py);
            context.font="20px NI7SEG";
            context.fillText("Score: "+score,px,py);
            context.font="15px NI7SEG";
            context.fillText("Presiona el boton de click izquierdo para reiniciar.",px-110,py+100);
        }else{
            context.fillStyle=blackColor;
            context.font="75px Arial";
            context.fillText("GAME OVER!",px,py);
            context.font="30px Arial";
            context.fillText("Score: "+score,px,py+50);
            context.font="25px Arial";
            context.fillText("Presiona el boton de click izquierdo para reiniciar.",px-45,py+100);
        }						
    }
	
	this.drawWin = function(px,py,score)
    {
        if (isFontAvailable('NI7SEG')){
            context.fillStyle=blackColor;
            context.font="35px NI7SEG";
            context.fillText("VICTORY!",px,py);
            context.font="20px NI7SEG";
            context.fillText("Score: "+score,px,py);
            context.font="15px NI7SEG";
            context.fillText("Presiona el boton de click izquierdo para ir al siguiente nivel.",px-110,py+100);
        }else{
            context.fillStyle=blackColor;
            context.font="75px Arial";
            context.fillText("VICTORY!",px,py);
            context.font="30px Arial";
            context.fillText("Score: "+score,px,py+50);
            context.font="25px Arial";
            context.fillText("Presiona el boton de click izquierdo para ir al siguiente nivel.",px-45,py+100);
        }						
    }
	this.drawQuantity = function(px,py,q)
    {    
        var str1="x";
        var str2=q.toString();
        str1=str1+str2;

         if (isFontAvailable('NI7SEG')){
            context.fillStyle=blackColor;
            context.font="15px NI7SEG";
            context.fillText(str1,px,py);
            
        }else{
            context.fillStyle=blackColor;
            context.font="11px mySecondFont";
            context.fillText(str1,px,py);
           
        }							
    }
	
	this.drawRecipesLeft = function(px, py, r)
	{
		if (isFontAvailable('NI7SEG')){
            context.fillStyle=whiteColor;
            context.font="15px NI7SEG";
            context.fillText("Recipes left: "+r.toString(),px,py);
            
        }else{
            context.fillStyle=whiteColor;
            context.font="15px mySecondFont";
            context.fillText("Recipes left: "+r.toString(),px,py);
           
        }
	}
    
    
    
}