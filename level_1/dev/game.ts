
class Game{
    private level: Level
    private camera: Camera
    
    constructor(){
        this.camera = new Camera()
        this.level = new Level()
        
        this.gameloop()
    }

    private gameloop(){
        this.level.Flyingman.Update()
        this.level.checkGravityCollision()
        this.camera.update(0)
        requestAnimationFrame(() =>this.gameloop())
    }
}

window.addEventListener("load", () => new Game)