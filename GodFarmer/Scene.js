function Scene() {
    
    //Atributos
    var elements; //Array de los elementos que forman parte de la escena y se tienen que instanciar
    
    //Getters y Setters
    this.getLength = function(){
        return elements.length;
    }
    
    this.getAllElements = function(){
        return elements;
    }
    
    this.setAllElements = function(e){
        elements = e;
    }
    
    this.addElementLast = function(e){
        elements.push(e);
    }
    
    this.popLastElement = function(){
        elements.pop();
    }
}