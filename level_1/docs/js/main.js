"use strict";
var Camera = (function () {
    function Camera() {
        this.elementpath = document.createElement("div");
        this.height = 100;
        this.width = window.innerWidth * this.height;
        this.positionx = 0;
        this.positiony = 0;
        this.translatedtotal = 0;
        this.afgelegd = 0;
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
        element.id = "container";
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)";
    };
    Camera.prototype.update = function (speed) {
        var element = this.elementpath;
        this.positionx -= speed;
        this.translatedtotal += speed;
        this.afgelegd += speed;
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)";
        if (window.innerWidth <= this.afgelegd) {
            this.width += window.innerWidth;
            this.elementpath.style.width = this.width + "px";
            this.afgelegd = 0;
        }
    };
    Camera.prototype.getTranslate = function () {
        return this.translatedtotal;
    };
    return Camera;
}());
var Game = (function () {
    function Game() {
        this.Tower = [];
        this.camera = new Camera();
        this.Flyingman = new Superman();
        this.Gravitybar = new Ground(100, 0, window.innerHeight);
        this.createTowers(10);
        this.gameloop();
    }
    Game.prototype.gameloop = function () {
        var _this = this;
        this.camera.update(2);
        this.Flyingman.Update();
        this.checkGravityCollision();
        this.checkTowerCollision();
        requestAnimationFrame(function () { return _this.gameloop(); });
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Game.prototype.checkGravityCollision = function () {
        var positioncharacter = this.Flyingman.getvalues();
        var positionbar = this.Gravitybar.getvalues();
        var barhit = this.checkCollision(this.Gravitybar.getRectangle(), this.Flyingman.getRectangle());
        if (barhit != true) {
            this.Flyingman.gravity(0, 3);
        }
        if (barhit == true) {
            alert("Je bent dood gevallen");
        }
    };
    Game.prototype.checkTowerCollision = function () {
        var _this = this;
        var barhit;
        var positionCharacter;
        this.Tower.forEach(function (ReadOut) {
            positionCharacter = _this.Flyingman.getvalues();
            var positionTower = ReadOut.getvalues();
            var translate = _this.camera.getTranslate();
            if (((positionCharacter.xeind) >= (positionTower.xbegin - translate)) && ((positionCharacter.xeind) <= (positionTower.xeind - translate))) {
                if ((positionCharacter.y <= positionTower.gapbegin) || (positionCharacter.y >= positionTower.gapeind)) {
                    alert("Je vloog tegen een paal aan");
                }
            }
        });
    };
    Game.prototype.createTowers = function (hoeveelheid) {
        for (var i = 1; i <= hoeveelheid; i++) {
            this.Tower.push(new Tower(i));
        }
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game; });
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
        if (this.positiony <= (0 - (this.height / 2))) {
            this.positiony += this.height;
        }
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)";
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
var Tower = (function () {
    function Tower(numbertower) {
        this.elementpath = document.createElement("tower");
        this.elementpathUnderTower = document.createElement("tower");
        this.width = 100;
        this.height = this.getRandomNumber((window.innerHeight - 400));
        this.gap = 250;
        this.positionY = 0;
        this.postitionX = numbertower * 800;
        this.underTowerheight = ((window.innerHeight - this.height) - this.gap);
        console.log(this.height);
        this.CreateTower();
        this.createUnderTower();
    }
    Tower.prototype.CreateTower = function () {
        var childElement = document.getElementsByTagName("div")[0];
        var element = this.elementpath;
        childElement.appendChild(element);
        element.innerHTML = " ";
        this.OpmaakTower();
    };
    Tower.prototype.OpmaakTower = function () {
        var element = this.elementpath;
        element.style.position = "absolute";
        element.style.width = this.width + "px";
        element.style.height = this.height + "px";
        element.innerHTML = "";
        element.style.transform = "translate(" + this.postitionX + "px," + this.positionY + "px)";
    };
    Tower.prototype.createUnderTower = function () {
        var childElement = document.getElementsByTagName("div")[0];
        var element = this.elementpathUnderTower;
        childElement.appendChild(element);
        element.innerHTML = " ";
        this.OpmaakUnderTower();
    };
    Tower.prototype.OpmaakUnderTower = function () {
        var element = this.elementpathUnderTower;
        element.style.position = "absolute";
        element.style.width = this.width + "px";
        element.style.height = this.underTowerheight + "px";
        element.innerHTML = "";
        var yUnderTower = window.innerHeight - this.underTowerheight;
        element.style.transform = "translate(" + this.postitionX + "px," + yUnderTower + "px)";
    };
    Tower.prototype.getRandomNumber = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    };
    Tower.prototype.getRectangle = function () {
        return this.elementpath.getBoundingClientRect();
    };
    Tower.prototype.getvalues = function () {
        var xbegin;
        var xeind;
        var y;
        var height;
        var width;
        var bar;
        return {
            element: this.elementpath,
            xbegin: this.postitionX,
            xeind: this.postitionX + this.width,
            gapbegin: this.height,
            gapeind: this.height + this.gap,
            height: this.height,
            width: this.width
        };
    };
    return Tower;
}());
//# sourceMappingURL=main.js.map