

class Startscreen{
    private element:HTMLElement
    private spacekeycode:number
    private spacePress:number
    private Game : Game

    constructor(g:Game){
        this.Game = g
        this.element = document.createElement("startscherm")
        //toevoegen van eventlisteners voor de spatie
        this.spacekeycode = 32 
        this.spacePress = 0
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))

        this.create()
    }

    public loop(){
        if(this.spacePress == 1){
            this.Game.startNewGame()
        }
    }

    private create(){
        let childelement = document.body
        childelement.appendChild(this.element)
        let textelement = document.createElement("h1")
        this.element.appendChild(textelement)
        textelement.innerHTML = "Touch the spacebar to start the game!"
    }

    //wanneer de toetsen laag zijn.
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.spacekeycode:
                this.spacePress = 0
            break
        }
    }
    
    //Wanneer een toets weer omhoog is gekomen
    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.spacekeycode:
                this.spacePress = 1
            break
        }
    }

}
