class Ground{
    private positionx:number
    private positiony:number
    private elementpath:HTMLElement = document.createElement("gravitybar")

    //Geef bij het declareren het volgende mee Lengte, positie x en y
    constructor(  positionX:number, positionY:number){
        this.positionx = positionX
        this.positiony = positionY
        
        this.Create()
    }
    //Aanmaak functie
    private Create():void{
        let childElement:HTMLElement = document.body
        let element:HTMLElement = this.elementpath
        childElement.appendChild(element)
        element.innerHTML = ""
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }

    //Geef waardes terug voor Collision
    public getRectangle(){
        return this.elementpath.getBoundingClientRect()
    }
}