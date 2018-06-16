class Camera{
    private width:number
    private positionx :number
    private positiony :number
    private translatedtotal :number
    private afgelegd :number
    private elementpath:HTMLElement = document.createElement("div")
    
    constructor(){
        this.width = window.innerWidth * 5
        this.positionx = 0
        this.positiony = 0
        this.translatedtotal = 0
        this.afgelegd = 0
        this.decor()
    }
    
    private decor():void{
        let childElement:HTMLElement = document.body
        let element:HTMLElement = this.elementpath
        childElement.appendChild(element)
        element.innerHTML = " "
        element.style.position = "absolute"
        element.style.width = this.width + "px"
        element.innerHTML = ""
        element.id = "container"
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }

    public update(speed:number):void{
        let element:HTMLElement = this.elementpath
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

