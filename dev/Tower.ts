class Tower{
    private width:number
    private height:number
    private postitionX:number
    private positionY:number
    private underTowerheight:number
    private gap:number
    private elementpath:HTMLElement = document.createElement("tower")
    private elementpathUnderTower:HTMLElement = document.createElement("tower")

    constructor(numbertower:number){
        this.width = 100
        this.height = this.getRandomNumber(window.innerHeight)
        this.height -= 400
        
        //Controle of hij niet te laag is.
        if(this.height <= 50){
            this.height = 200
        }

        this.gap = 250
        this.positionY = 0
        this.postitionX = numbertower * 800
        this.underTowerheight = ((window.innerHeight - this.height) - this.gap)

        this.CreateTower()
        this.createUnderTower()
        }

     //Aanmaak functie
     private CreateTower(){
        let childElement:HTMLElement = document.getElementsByTagName("div")[0]
        let element:HTMLElement = this.elementpath
        childElement.appendChild(element)
        element.style.width = this.width + "px"
        element.style.height = this.height + "px"
        element.innerHTML = ""
        element.style.transform = "translate(" + this.postitionX + "px," + this.positionY + "px)"
    }

    //Create functie voor onder toren
    private createUnderTower(){
        let childElement:HTMLElement = document.getElementsByTagName("div")[0]
        let element:HTMLElement = this.elementpathUnderTower
        childElement.appendChild(element)
        element.innerHTML = " "
        element.style.width = this.width + "px"
        element.style.height = this.underTowerheight + "px"
        let yUnderTower:number = window.innerHeight - this.underTowerheight
        element.style.transform = "translate(" + this.postitionX + "px," + yUnderTower + "px)"
    }

    //Create random integers
    private getRandomNumber(max:number){
        return Math.floor(Math.random() * Math.floor(max));
    }

    //Geeft waardes terug voor de collision
    public getRectangle() {
        return this.elementpath.getBoundingClientRect() 
    }

    public getRectangleUnderTower(){
        return this.elementpathUnderTower.getBoundingClientRect()
    }

    public positionx(){
        let scorelijn:number = this.postitionX + this.width
        return scorelijn
    }
}



