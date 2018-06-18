/// <reference path="../docs/js/music.js"/>

class EndScreen{
    private element:HTMLElement
    private Game : Game
    private Score :number
    private Highscore:any
    private click:boolean

    constructor(g:Game, score:number, highscore:number){
        this.Score = score
        this.Highscore = highscore

        let body = document.body
        body.innerHTML = ""

        this.Game = g
        this.element = document.createElement("eindscherm")
        this.click = false
        window.addEventListener("click", () => this.checkClick())
        this.create()
        localStorage.setItem('points', this.Highscore);
    }

    public loop():void{
        if(this.click == true){
            End.stop()
            Background.play()
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
