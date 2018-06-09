class Level{
    Flyingman:Superman
    Gravitybar:Ground


    constructor(){
        this.Flyingman = new Superman()
        this.Gravitybar = new Ground(100, 0, window.innerHeight)

    }

    //Algemene functie collision
    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    //checken of er gravity nodig is.
    public checkGravityCollision(){
        let barhit
        
        let positioncharacter = this.Flyingman.getvalues()
        let positionbar = this.Gravitybar.getvalues()
    
        barhit = this.checkCollision(this.Gravitybar.getRectangle(), this.Flyingman.getRectangle())
        if (barhit != true){
            this.Flyingman.gravity(0,3)
        }

        if(barhit == true){
            //alert("Je bent dood gevallen")
        }
    }
}