class Game{
    private Flyingman:Superman
    private Gravitybar:Ground
    private camera: Camera
    private Tower:Tower[] = []
    
    constructor(){
        this.camera = new Camera()
        this.Flyingman = new Superman()
        this.Gravitybar = new Ground(100, 0, window.innerHeight)
        this.createTowers(10)
        this.gameloop()
    }

    private gameloop(){
        this.camera.update(2)
        this.Flyingman.Update()
        this.checkGravityCollision()
        this.checkTowerCollision()
        requestAnimationFrame(() =>this.gameloop())
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
        let positioncharacter = this.Flyingman.getvalues()
        let positionbar = this.Gravitybar.getvalues()
        let barhit = this.checkCollision(this.Gravitybar.getRectangle(), this.Flyingman.getRectangle())

        if (barhit != true){
            this.Flyingman.gravity(0,3)
        }

        if(barhit == true){
            alert("Je bent dood gevallen")
        }
    }

    //Check Collision voor de Torens
    private checkTowerCollision(){
        let barhit
        let positionCharacter
        
        this.Tower.forEach(ReadOut =>{
            positionCharacter = this.Flyingman.getvalues()
            let positionTower = ReadOut.getvalues()
            let translate = this.camera.getTranslate()
            
            if(((positionCharacter.xeind) >= (positionTower.xbegin - translate)) && ((positionCharacter.xeind) <= (positionTower.xeind - translate))){
                if((positionCharacter.y <= positionTower.gapbegin) || (positionCharacter.y >= positionTower.gapeind)){
                    alert("Je vloog tegen een paal aan")
                }
            }
        })
    }


    private createTowers(hoeveelheid:number){
        for(let i = 1; i<= hoeveelheid; i++){
            this.Tower.push(new Tower(i))
        }
    }
}

window.addEventListener("load", () => new Game)