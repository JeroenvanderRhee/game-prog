class Camera{
    private height:number
    private width:number
    private positionx :number
    private positiony :number
    private translatedtotal :number
    private afgelegd :number
    private elementpath:HTMLElement = document.createElement("div")
    
    constructor(){
        this.height = 100
        this.width = window.innerWidth * this.height
        this.positionx = 0
        this.positiony = 0
        this.translatedtotal = 0
        this.afgelegd = 0
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
        element.id = "container"
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }

    public update(speed:number){
        let element = this.elementpath
        this.positionx -= speed
        this.translatedtotal += speed
        this.afgelegd += speed
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"

        if(window.innerWidth <= this.afgelegd){
            this.width += window.innerWidth
            this.elementpath.style.width = this.width + "px"
            this.afgelegd = 0
        }
    }

    public getTranslate(){
        return this.translatedtotal
    }
}

