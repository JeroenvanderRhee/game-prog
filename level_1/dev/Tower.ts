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
        this.height = this.getRandomNumber((window.innerHeight - 400))
        this.gap = 250
        this.positionY = 0
        this.postitionX = numbertower * 800
        this.underTowerheight = ((window.innerHeight - this.height) - this.gap)
        console.log(this.height)

        this.CreateTower()
        this.createUnderTower()
    }

     //Aanmaak functie
     private CreateTower(){
        let childElement = document.getElementsByTagName("div")[0]
        let element = this.elementpath
        childElement.appendChild(element)
        element.innerHTML = " "
        this.OpmaakTower()
    }

    //Opmaak functie
    private OpmaakTower(){
        let element = this.elementpath
        element.style.position = "absolute"
        element.style.width = this.width + "px"
        element.style.height = this.height + "px"
        element.innerHTML = ""
        element.style.transform = "translate(" + this.postitionX + "px," + this.positionY + "px)"
    }

    //Create functie voor onder toren
    private createUnderTower(){
        let childElement = document.getElementsByTagName("div")[0]
        let element = this.elementpathUnderTower
        childElement.appendChild(element)
        element.innerHTML = " "
        this.OpmaakUnderTower()
    }
    
    //Opmaak functie voor onder toren
    private OpmaakUnderTower(){
        let element = this.elementpathUnderTower
        element.style.position = "absolute"
        element.style.width = this.width + "px"
        element.style.height = this.underTowerheight + "px"
        element.innerHTML = ""
        let yUnderTower = window.innerHeight - this.underTowerheight
        element.style.transform = "translate(" + this.postitionX + "px," + yUnderTower + "px)"
    }

    //Create random integers
    private getRandomNumber(max:number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

        //Geeft waardes terug voor de collision
        public getRectangle() {
            return this.elementpath.getBoundingClientRect()
        }
    
        // geeft nog meer waardes terug voor de collision
        public getvalues(){
            let xbegin : number
            let xeind : number
            let y :number
            let height:number
            let width:number
            let bar : HTMLElement
            return {
                element : this.elementpath,
                xbegin : this.postitionX,
                xeind : this.postitionX + this.width,
                gapbegin : this.height,
                gapeind: this.height + this.gap,
                height : this.height,
                width : this.width
            }
        }
}



