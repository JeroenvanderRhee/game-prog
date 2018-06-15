class Superman{
    private width:number
    private positionx:number
    private positiony:number
    private spacekeycode:number
    private spacePress:number
    private elementpath:HTMLElement = document.createElement("superman")    
    private height:number


    constructor(){
        //declareren van variabelen
        this.width = 82
        this.height = 125
        this.positionx = 100
        this.positiony = (window.innerHeight / 2) - (this.height / 2)

        //toevoegen van eventlisteners voor de spatie
        this.spacekeycode = 32 
        this.spacePress = 0
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))

        //het poppetje aanmaken
        this.Create()
    }

    //wanneer de toetsen laag zijn.
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.spacekeycode:
                this.spacePress = 0
                break
        }
    }

    //Wanneer een toets weer omhoog is gekomen
    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.spacekeycode:
                this.spacePress = 1
                break
        }
    }

     //Hier word superman aangemaakt
     private Create(){
        let childElement:HTMLElement = document.body
        let element = this.elementpath
        childElement.appendChild(element)
        element.innerHTML = " "
        this.Opmaak()
    }

    //Hier word superman opgemaakt
    private Opmaak(){
        let element = this.elementpath
        element.style.position = "absolute"
        element.style.width = this.width + "px"
        element.style.height = this.height + "px"
        element.innerHTML = ""
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }

    //De vlieg functie. Plaatsen in de gameloop
    public Update(){
        let element = this.elementpath
        if(this.spacePress == 1){
            this.positiony -= 100;
            this.spacePress = 0
        }

        if(this.positiony <= (0 - (this.height / 2))){
            this.positiony += this.height
        }

        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }


    //Geeft waardes terug voor de collision
    public getRectangle() {
        return this.elementpath.getBoundingClientRect()
    }

    // De zwaarte kracht
    public gravity (strengthx:number, strengthy:number){
        let element = this.elementpath
        this.positiony += strengthy
        this.positionx += strengthx
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }

    public positiex(){
        return this.positionx
    }

    public showHit(){
        this.elementpath.style.backgroundColor = "red"
    }
}