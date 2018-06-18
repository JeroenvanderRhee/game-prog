class Score{
    private element:HTMLElement
    private textElement:HTMLElement
    private highScoreElement:HTMLElement
    public points:number
    public highscore:any
    constructor(){
        this.highscore = 0
        this.element = document.createElement("score")
        this.textElement = document.createElement("h4")
        this.highScoreElement = document.createElement("h4")
        this.points = 0
        this.createScoreField()
        this.getHighscore()
    }

    private getHighscore():void{
        if(localStorage.getItem("points")){
            this.highscore = localStorage.getItem("points")
        }
        console.log("highscore: "+this.highscore)
    }

    private createScoreField():void{
        let childelement:HTMLElement = document.body
        childelement.appendChild(this.element)

        this.element.appendChild(this.textElement)
        this.textElement.classList.add("scorefield")
        this.textElement.id = "pointfield"

        this.element.appendChild(this.highScoreElement)
        this.highScoreElement.classList.add("scorefield")
        this.highScoreElement.id = "highscorefield"
    }

    public update(score:number):void{
        this.points = score
        this.textElement.innerHTML = "Score: " + score

        if(this.points > this.highscore){
            this.highscore ++
        }

        this.highScoreElement.innerHTML = "Highscore: " + this.highscore
    }
}