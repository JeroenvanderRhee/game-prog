/// <reference path="Score.ts"/>

class Spel extends Score{
    private Flyingman:Superman
    private Gravitybar:Ground
    private camera: Camera
    private Tower:Tower[] = []
    private howMuchTowers:number
    private Game:Game
    
    constructor(g:Game){
        super()
        this.Game = g
        this.camera = new Camera()
        this.Flyingman = new Superman()
        this.Gravitybar = new Ground(0, window.innerHeight)
        this.howMuchTowers = 0
        this.createTowers(2)
    }

    public loop():void{
        this.camera.update(2)
        this.Flyingman.Update()
        this.checkTowerCollision()
        this.checkGravityCollision()
        this.setScore()
        this.checkTowers()
    }

    private createTowers(hoeveelheid:number):void{
        for(let i = 1; i<= hoeveelheid; i++){
            this.howMuchTowers ++
            this.Tower.push(new Tower(this.howMuchTowers))
        }
    }

    //Algemene functie collision
    private checkCollision(a: ClientRect, b: ClientRect){
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    //checken of er gravity nodig is.
    private checkGravityCollision():void{
        let barhit:boolean = this.checkCollision(this.Gravitybar.getRectangle(), this.Flyingman.getRectangle())

        if (barhit != true){
            this.Flyingman.gravity(0,3)
        }
    }


    //Check Collision voor de Torens
    private checkTowerCollision():void{
        let positionCharacter:ClientRect
        
        this.Tower.forEach(ReadOut =>{
            positionCharacter = this.Flyingman.getRectangle()
            let positionTopTower:ClientRect = ReadOut.getRectangle()
            let positionUnderTower:ClientRect = ReadOut.getRectangleUnderTower()
            let translate:number = this.camera.getTranslate()
            let barhitTopTower:boolean = this.checkCollision(positionCharacter, positionTopTower)
            let barhitUnderTower:boolean = this.checkCollision(positionCharacter, positionUnderTower)
    
            if((barhitTopTower == true) || (barhitUnderTower == true)){
                //alert("Je bent tegen een paal aan gevlogen")
                //console.log("Je raakt de paal")
                this.Game.endGame(this.points)
            }
        })
    }

    private setScore():void{
        let score:number = 0
        this.Tower.forEach(ReadOut =>{
            let correctie:number = this.camera.getTranslate()
            let positietower:number = ReadOut.positionx() - correctie
            let positioncharacter:number = this.Flyingman.positiex()
            
            if (positietower <= positioncharacter){
                score ++
            }
        })
        this.update(score)
    }

    private checkTowers():void{
        let checkHowMuchTowers:number = this.howMuchTowers - 2
        if (this.points >= checkHowMuchTowers){
            this.createTowers(2)
        }
    }
}
