class Spel{
    private Flyingman:Superman
    private Gravitybar:Ground
    private camera: Camera
    private Tower:Tower[] = []
    private howMuchTowers:number
    private Score:Score
    private Game:Game
    
    constructor(g:Game){
        this.Game = g
        this.camera = new Camera()
        this.Flyingman = new Superman()
        this.Gravitybar = new Ground(100, 0, window.innerHeight)
        this.Score = new Score()
        this.howMuchTowers = 0
        this.createTowers(2)
    }

    public loop(){
        this.camera.update(2)
        this.Flyingman.Update()
        this.checkTowerCollision()
        this.checkGravityCollision()
        this.setScore()
        this.checkTowers()
        console.log(this.Score)
    }

    private createTowers(hoeveelheid:number){
        for(let i = 1; i<= hoeveelheid; i++){
            this.howMuchTowers ++
            this.Tower.push(new Tower(this.howMuchTowers))
        }
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
        let positionbar = this.Gravitybar.getvalues()
        let barhit = this.checkCollision(this.Gravitybar.getRectangle(), this.Flyingman.getRectangle())

        if (barhit != true){
            this.Flyingman.gravity(0,3)
        }

        if(barhit == true){
            //alert("Je bent dood gevallen")
        }
    }


    //Check Collision voor de Torens
    private checkTowerCollision(){
        let positionCharacter
        
        this.Tower.forEach(ReadOut =>{
            positionCharacter = this.Flyingman.getRectangle()
            let positionTopTower = ReadOut.getRectangle()
            let positionUnderTower = ReadOut.getRectangleUnderTower()
            let translate = this.camera.getTranslate()
            let barhitTopTower = this.checkCollision(positionCharacter, positionTopTower)
            let barhitUnderTower = this.checkCollision(positionCharacter, positionUnderTower)
    
            if((barhitTopTower == true) || (barhitUnderTower == true)){
                //alert("Je bent tegen een paal aan gevlogen")
                //console.log("Je raakt de paal")
                this.Game.endGame(this.Score.points)
            }
        })
    }

    private setScore(){
        let score = 0
        this.Tower.forEach(ReadOut =>{
            let correctie = this.camera.getTranslate()
            let positietower = ReadOut.positionx() - correctie
            let positioncharacter = this.Flyingman.positiex()
            
            if (positietower <= positioncharacter){
                score ++
            }
        })
        this.Score.update(score)
    }

    private checkTowers(){
        let checkHowMuchTowers = this.howMuchTowers - 2
        if (this.Score.points >= checkHowMuchTowers){
            this.createTowers(2)
        }
    }
}
