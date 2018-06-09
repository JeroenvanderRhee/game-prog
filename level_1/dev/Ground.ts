class Ground{
    private width:number
    private height:number
    private positionx:number
    private positiony:number
    private elementpath:HTMLElement = document.createElement("gravitybar")

    //Geef bij het declareren het volgende mee Lengte, positie x en y
    constructor(width:number,  positionX:number, positionY:number){
        this.width = width
        this.height = 2
        this.positionx = positionX
        this.positiony = positionY - this.height
        
        this.Create()
    }

    //Aanmaak functie
    private Create(){
        let childElement = document.body
        let element = this.elementpath
        childElement.appendChild(element)
        element.innerHTML = " "
        this.Opmaak()
    }

    //Opmaak functie
    private Opmaak(){
        let element = this.elementpath
        element.style.position = "absolute"
        element.style.width = this.width + "%"
        element.style.height = this.height + "px"
        element.innerHTML = ""
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }

    //Geef waardes terug voor Collision
    public getRectangle() {
        return this.elementpath.getBoundingClientRect()
    }

    //geef nog meer waardes terug voor collision
    public getvalues(){
        let xbegin : number
        let xeind : number
        let y :number
        let height:number
        let width:number
        let bar : HTMLElement
        return {
            element : this.elementpath,
            xbegin : this.positionx,
            xeind : this.positionx + this.width,
            y : this.positiony,
            height : this.height,
            width : this.width
        }
    }
}