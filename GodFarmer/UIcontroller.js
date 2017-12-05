function UIcontroller(cont){
    //Inicialializa la posicion y decide que tipo de vegetal será
        //--
    var context = cont;
    var color = "#ffcc99";
	var whiteColor = "#ffffff";
	var blackColor = "#000000";	
	
	//Pinta el tiempo que te queda 
	this.drawTime = function(px,py,time)
    {
        str1=time;

         if (isFontAvailable('NI7SEG')){
            context.fillStyle=whiteColor;
            context.font="35px NI7SEG";
            context.fillText(str1,px,py);
            
        }else{
            context.fillStyle=whiteColor;
            context.font="35px mySecondFont";
            context.fillText(str1,px,py);
           
        }													
    }
	
	//Pinta las cantidades de los ingredientes
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
	
	//Pinta el numero de recetas restantes
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