class Score{
    private element:HTMLElement
    private textElement:HTMLElement
    public points:number
    constructor(){
        this.element = document.createElement("score")
        this.textElement = document.createElement("h4")
        this.points = 0
        this.createScoreField()
    }

    private createScoreField(){
        let childelement = document.body
        childelement.appendChild(this.element)

        this.element.appendChild(this.textElement)
        this.textElement.id = "scorefield"
    }

    public update(score:number){
        this.points = score
        this.textElement.innerHTML = "Score: " + score
    }
}