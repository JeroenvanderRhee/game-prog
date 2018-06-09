class Camera{
    private height:number
    private width:number
    private positionx :number
    private positiony :number
    private translated :number
    private elementpath:HTMLElement = document.createElement("decor")
    
    constructor(){
        this.height = 100
        this.width = window.innerWidth * this.height
        this.positionx = 0
        this.positiony = 0
        this.translated = 0
        this.decor()
    }
    
    private decor(){
        let childElement = document.body
        let element = this.elementpath
        childElement.appendChild(element)
        element.innerHTML = " "
        element.style.position = "absolute"
        element.style.width = this.width + "px"
        element.style.height = this.height + "%"
        element.innerHTML = ""
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }

    public update(speed:number){
        let element = this.elementpath
        this.positionx -= speed
        this.translated += speed
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"

        if(window.innerWidth <= this.translated){
            this.width += window.innerWidth
            this.elementpath.style.width = this.width + "px"
            this.translated = 0
        }
    }
}

