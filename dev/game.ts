/// <reference path="../docs/js/music.js"/>

class Game{
    private Screen:any

    constructor(){
        this.Screen = new Startscreen(this)
        this.gameloop()
    }

    private gameloop(){
        this.Screen.loop()
        requestAnimationFrame(() =>this.gameloop())
    }

    public startNewGame(){
        let body:HTMLElement = document.body
        body.innerHTML = ""
        Background.play()
        this.Screen = new Spel(this)
    }

    public endGame(score:number, highscore:number){
        Background.stop()
        let body:HTMLElement = document.body
        body.innerHTML = ""
        End.play()
        this.Screen = new EndScreen(this, score, highscore)
    }
}
window.addEventListener("load", () => new Game)