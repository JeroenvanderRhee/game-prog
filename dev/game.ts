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
        this.Screen = new Spel(this)
    }

    public endGame(score:number){
        let body:HTMLElement = document.body
        body.innerHTML = ""
        this.Screen = new EndScreen(this, score)
    }
}
window.addEventListener("load", () => new Game)