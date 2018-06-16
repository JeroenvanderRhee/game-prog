class Superman{
    private positionx:number
    private positiony:number
    private spacekeycode:number
    private spacePress:number
    private elementpath:HTMLElement = document.createElement("superman")    


    constructor(){
        //declareren van variabelen
        this.positionx = 100
        this.positiony = (window.innerHeight / 2) //- (this.height / 2)

        //toevoegen van eventlisteners voor de spatie
        this.spacekeycode = 32 
        this.spacePress = 0
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("click", () => this.checkClick())

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

    //Wanneer een toets weer omhoog is gekomen
    private checkClick(): void {
        this.spacePress = 1
    }

     //Hier word superman aangemaakt
     private Create():void{
        let childElement:HTMLElement = document.body
        let element:HTMLElement = this.elementpath
        childElement.appendChild(element)
        element.innerHTML = " "
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }

    //De vlieg functie. Plaatsen in de gameloop
    public Update():void{
        let element:HTMLElement = this.elementpath
        if(this.spacePress == 1){
            this.positiony -= 100;
            this.spacePress = 0
        }

        if(this.positiony <= 0){
            this.positiony = 0
        }

        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }


    //Geeft waardes terug voor de collision
    public getRectangle() {
        return this.elementpath.getBoundingClientRect()
    }

    // De zwaarte kracht
    public gravity (strengthx:number, strengthy:number):void{
        let element:HTMLElement = this.elementpath
        this.positiony += strengthy
        this.positionx += strengthx
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)"
    }

    public positiex(){
        return this.positionx
    }
}