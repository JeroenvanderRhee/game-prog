"use strict";
var Camera = (function () {
    function Camera() {
        this.elementpath = document.createElement("decor");
        this.height = 100;
        this.width = window.innerWidth * this.height;
        this.positionx = 0;
        this.positiony = 0;
        this.translated = 0;
        this.decor();
    }
    Camera.prototype.decor = function () {
        var childElement = document.body;
        var element = this.elementpath;
        childElement.appendChild(element);
        element.innerHTML = " ";
        element.style.position = "absolute";
        element.style.width = this.width + "px";
        element.style.height = this.height + "%";
        element.innerHTML = "";
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)";
    };
    Camera.prototype.update = function (speed) {
        var element = this.elementpath;
        this.positionx -= speed;
        this.translated += speed;
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)";
        if (window.innerWidth <= this.translated) {
            this.width += window.innerWidth;
            this.elementpath.style.width = this.width + "px";
            this.translated = 0;
        }
    };
    return Camera;
}());
var Ground = (function () {
    function Ground(width, positionX, positionY) {
        this.elementpath = document.createElement("gravitybar");
        this.width = width;
        this.height = 2;
        this.positionx = positionX;
        this.positiony = positionY - this.height;
        this.Create();
    }
    Ground.prototype.Create = function () {
        var childElement = document.body;
        var element = this.elementpath;
        childElement.appendChild(element);
        element.innerHTML = " ";
        this.Opmaak();
    };
    Ground.prototype.Opmaak = function () {
        var element = this.elementpath;
        element.style.position = "absolute";
        element.style.width = this.width + "%";
        element.style.height = this.height + "px";
        element.innerHTML = "";
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)";
    };
    Ground.prototype.getRectangle = function () {
        return this.elementpath.getBoundingClientRect();
    };
    Ground.prototype.getvalues = function () {
        var xbegin;
        var xeind;
        var y;
        var height;
        var width;
        var bar;
        return {
            element: this.elementpath,
            xbegin: this.positionx,
            xeind: this.positionx + this.width,
            y: this.positiony,
            height: this.height,
            width: this.width
        };
    };
    return Ground;
}());
var Game = (function () {
    function Game() {
        this.camera = new Camera();
        this.level = new Level();
        this.gameloop();
    }
    Game.prototype.gameloop = function () {
        var _this = this;
        this.level.Flyingman.Update();
        this.level.checkGravityCollision();
        this.camera.update(0);
        requestAnimationFrame(function () { return _this.gameloop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game; });
var Level = (function () {
    function Level() {
        this.Flyingman = new Superman();
        this.Gravitybar = new Ground(100, 0, window.innerHeight);
    }
    Level.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Level.prototype.checkGravityCollision = function () {
        var barhit;
        var positioncharacter = this.Flyingman.getvalues();
        var positionbar = this.Gravitybar.getvalues();
        barhit = this.checkCollision(this.Gravitybar.getRectangle(), this.Flyingman.getRectangle());
        if (barhit != true) {
            this.Flyingman.gravity(0, 3);
        }
        if (barhit == true) {
        }
    };
    return Level;
}());
var Superman = (function () {
    function Superman() {
        var _this = this;
        this.elementpath = document.createElement("superman");
        this.width = 200;
        this.height = 125;
        this.positionx = 100;
        this.positiony = (window.innerHeight / 2) - (this.height / 2);
        this.spacekeycode = 32;
        this.spacePress = 0;
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.Create();
    }
    Superman.prototype.onKeyDown = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case this.spacekeycode:
                this.spacePress = 0;
                break;
        }
    };
    Superman.prototype.onKeyUp = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case this.spacekeycode:
                this.spacePress = 1;
                break;
        }
    };
    Superman.prototype.Create = function () {
        var childElement = document.body;
        var element = this.elementpath;
        childElement.appendChild(element);
        element.innerHTML = " ";
        this.Opmaak();
    };
    Superman.prototype.Opmaak = function () {
        var element = this.elementpath;
        element.style.position = "absolute";
        element.style.width = this.width + "px";
        element.style.height = this.height + "px";
        element.innerHTML = "";
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)";
    };
    Superman.prototype.Update = function () {
        var element = this.elementpath;
        if (this.spacePress == 1) {
            this.positiony -= 100;
            this.spacePress = 0;
        }
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)";
        console.log(this.positiony);
        if (this.positiony <= (0 - this.height)) {
            alert("je bent dood gevallen");
        }
    };
    Superman.prototype.getRectangle = function () {
        return this.elementpath.getBoundingClientRect();
    };
    Superman.prototype.getvalues = function () {
        var xbegin;
        var xeind;
        var y;
        var height;
        var width;
        var bar;
        return {
            element: this.elementpath,
            xbegin: this.positionx,
            xeind: this.positionx + this.width,
            y: this.positiony,
            height: this.height,
            width: this.width
        };
    };
    Superman.prototype.gravity = function (strengthx, strengthy) {
        var element = this.elementpath;
        this.positiony += strengthy;
        this.positionx += strengthx;
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)";
    };
    return Superman;
}());
//# sourceMappingURL=main.js.map