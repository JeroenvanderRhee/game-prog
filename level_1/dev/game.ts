class Game{
    private width:number
    private height:number
    Flyingman:Superman
    Gravitybar:Ground

    constructor(){
        this.width = 100
        this.height = 100

        this.Flyingman = new Superman()
        this.Gravitybar = new Ground(100, 0, window.innerHeight)

        this.gameloop()
    }

    //Algemene functie collision
    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
     }

    //checken of er gravity nodig is.
    private checkGravityCollision(){
        let barhit
        
        let positioncharacter = this.Flyingman.getvalues()
        let positionbar = this.Gravitybar.getvalues()
       
        barhit = this.checkCollision(this.Gravitybar.getRectangle(), this.Flyingman.getRectangle())
        if (barhit != true){
            //console.log("hit")
            this.Flyingman.gravity(0,2)
        }
        if(barhit == true){
            alert("je bent dood gevallen")
        }
    }

    private gameloop(){
        this.Flyingman.Update()
        this.checkGravityCollision()
        requestAnimationFrame(() =>this.gameloop())
    }
}

window.addEventListener("load", () => new Game)