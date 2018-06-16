class EndScreen{
    private element:HTMLElement
    private spacekeycode:number
    private spacePress:number
    private Game : Game
    private Score :number
    private click:boolean

    constructor(g:Game, score:number){
        this.Score = score
        let body = document.body
        body.innerHTML = ""

        this.Game = g
        this.element = document.createElement("eindscherm")
        //toevoegen van eventlisteners voor de spatie
        this.spacekeycode = 32 
        this.spacePress = 0
        this.click = false
        window.addEventListener("click", () => this.checkClick())

        this.create()
    }

    public loop():void{
        console.log(this.click)
        if(this.click == true){
            this.Game.startNewGame()
        }
    }

    private create():void{
        let childelement:HTMLElement = document.body
        childelement.appendChild(this.element)
        let textElement:HTMLElement = document.createElement("h1")
        let buttonElement:HTMLElement = document.createElement("button")
        this.element.appendChild(textElement)
        this.element.appendChild(buttonElement)
        let opbouw:String = this.checkScore()
        textElement.innerHTML = "Game over...<br> You have earned " +opbouw + "."
        buttonElement.innerHTML = "Click here to start the game again."
    }

    private checkScore(){
        let opbouw:String = 0 + "points"
        if(this.Score == 1){
            opbouw = 1 + " point"
        }
        else{
            opbouw = this.Score + " points"
        }

        return opbouw
    }

    private checkClick():void{
        this.click = true
    }

}
