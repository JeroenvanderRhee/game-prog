"use strict";
var Camera = (function () {
    function Camera() {
        this.elementpath = document.createElement("div");
        this.height = 100;
        this.width = window.innerWidth * 5;
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
var Spel = (function () {
    function Spel(g) {
        this.Tower = [];
        this.Game = g;
        this.camera = new Camera();
        this.Flyingman = new Superman();
        this.Gravitybar = new Ground(100, 0, window.innerHeight);
        this.Score = new Score();
        this.howMuchTowers = 0;
        this.createTowers(2);
    }
    Spel.prototype.loop = function () {
        this.camera.update(2);
        this.Flyingman.Update();
        this.checkTowerCollision();
        this.checkGravityCollision();
        this.setScore();
        this.checkTowers();
        console.log(this.Score);
    };
    Spel.prototype.createTowers = function (hoeveelheid) {
        for (var i = 1; i <= hoeveelheid; i++) {
            this.howMuchTowers++;
            this.Tower.push(new Tower(this.howMuchTowers));
        }
    };
    Spel.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Spel.prototype.checkGravityCollision = function () {
        var positionbar = this.Gravitybar.getvalues();
        var barhit = this.checkCollision(this.Gravitybar.getRectangle(), this.Flyingman.getRectangle());
        if (barhit != true) {
            this.Flyingman.gravity(0, 3);
        }
        if (barhit == true) {
        }
    };
    Spel.prototype.checkTowerCollision = function () {
        var _this = this;
        var positionCharacter;
        this.Tower.forEach(function (ReadOut) {
            positionCharacter = _this.Flyingman.getRectangle();
            var positionTopTower = ReadOut.getRectangle();
            var positionUnderTower = ReadOut.getRectangleUnderTower();
            var translate = _this.camera.getTranslate();
            var barhitTopTower = _this.checkCollision(positionCharacter, positionTopTower);
            var barhitUnderTower = _this.checkCollision(positionCharacter, positionUnderTower);
            if ((barhitTopTower == true) || (barhitUnderTower == true)) {
                _this.Game.endGame(_this.Score.points);
            }
        });
    };
    Spel.prototype.setScore = function () {
        var _this = this;
        var score = 0;
        this.Tower.forEach(function (ReadOut) {
            var correctie = _this.camera.getTranslate();
            var positietower = ReadOut.positionx() - correctie;
            var positioncharacter = _this.Flyingman.positiex();
            if (positietower <= positioncharacter) {
                score++;
            }
        });
        this.Score.update(score);
    };
    Spel.prototype.checkTowers = function () {
        var checkHowMuchTowers = this.howMuchTowers - 2;
        if (this.Score.points >= checkHowMuchTowers) {
            this.createTowers(2);
        }
    };
    return Spel;
}());
var EndScreen = (function () {
    function EndScreen(g, score) {
        this.Score = score;
        var body = document.body;
        body.innerHTML = "";
        this.Game = g;
        this.element = document.createElement("eindscherm");
        this.spacekeycode = 32;
        this.spacePress = 0;
        this.click = false;
        window.addEventListener("click", this.checkClick);
        this.create();
    }
    EndScreen.prototype.loop = function () {
        console.log();
        if (this.click == true) {
            this.Game.startNewGame();
        }
    };
    EndScreen.prototype.create = function () {
        var childelement = document.body;
        childelement.appendChild(this.element);
        var textElement = document.createElement("h1");
        var buttonElement = document.createElement("button");
        this.element.appendChild(textElement);
        this.element.appendChild(buttonElement);
        var opbouw = this.checkScore();
        textElement.innerHTML = "Game over...<br> You have earned " + opbouw + ".";
        buttonElement.innerHTML = "Click here to start the game again.";
    };
    EndScreen.prototype.checkScore = function () {
        var opbouw = 0 + "points";
        if (this.Score == 1) {
            opbouw = 1 + " point";
        }
        else {
            opbouw = this.Score + " points";
        }
        return opbouw;
    };
    EndScreen.prototype.checkClick = function () {
        this.click = true;
    };
    return EndScreen;
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
var Score = (function () {
    function Score() {
        this.element = document.createElement("score");
        this.textElement = document.createElement("h4");
        this.points = 0;
        this.createScoreField();
    }
    Score.prototype.createScoreField = function () {
        var childelement = document.body;
        childelement.appendChild(this.element);
        this.element.appendChild(this.textElement);
        this.textElement.id = "scorefield";
    };
    Score.prototype.update = function (score) {
        this.points = score;
        this.textElement.innerHTML = "Score: " + score;
    };
    return Score;
}());
var Startscreen = (function () {
    function Startscreen(g) {
        var _this = this;
        this.Game = g;
        this.element = document.createElement("startscherm");
        this.spacekeycode = 32;
        this.spacePress = 0;
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.create();
    }
    Startscreen.prototype.loop = function () {
        if (this.spacePress == 1) {
            this.Game.startNewGame();
        }
    };
    Startscreen.prototype.create = function () {
        var childelement = document.body;
        childelement.appendChild(this.element);
        var textelement = document.createElement("h1");
        this.element.appendChild(textelement);
        textelement.innerHTML = "Touch the spacebar to start the game!";
    };
    Startscreen.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.spacekeycode:
                this.spacePress = 0;
                break;
        }
    };
    Startscreen.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.spacekeycode:
                this.spacePress = 1;
                break;
        }
    };
    return Startscreen;
}());
var Tower = (function () {
    function Tower(numbertower) {
        this.elementpath = document.createElement("tower");
        this.elementpathUnderTower = document.createElement("tower");
        this.width = 100;
        this.height = this.getRandomNumber(window.innerHeight);
        this.height -= 400;
        if (this.height <= 50) {
            this.height = 200;
        }
        this.gap = 250;
        this.positionY = 0;
        this.postitionX = numbertower * 800;
        this.underTowerheight = ((window.innerHeight - this.height) - this.gap);
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
    Tower.prototype.getRectangleUnderTower = function () {
        return this.elementpathUnderTower.getBoundingClientRect();
    };
    Tower.prototype.positionx = function () {
        var scorelijn = this.postitionX + this.width;
        return scorelijn;
    };
    return Tower;
}());
var Game = (function () {
    function Game() {
        this.Screen = new Startscreen(this);
        this.gameloop();
    }
    Game.prototype.gameloop = function () {
        var _this = this;
        this.Screen.loop();
        requestAnimationFrame(function () { return _this.gameloop(); });
    };
    Game.prototype.startNewGame = function () {
        var body = document.body;
        body.innerHTML = "";
        this.Screen = new Spel(this);
    };
    Game.prototype.endGame = function (score) {
        var body = document.body;
        body.innerHTML = "";
        this.Screen = new EndScreen(this, score);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game; });
var Superman = (function () {
    function Superman() {
        var _this = this;
        this.elementpath = document.createElement("superman");
        this.width = 82;
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
        switch (e.keyCode) {
            case this.spacekeycode:
                this.spacePress = 0;
                break;
        }
    };
    Superman.prototype.onKeyUp = function (e) {
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
    Superman.prototype.gravity = function (strengthx, strengthy) {
        var element = this.elementpath;
        this.positiony += strengthy;
        this.positionx += strengthx;
        element.style.transform = "translate(" + this.positionx + "px," + this.positiony + "px)";
    };
    Superman.prototype.positiex = function () {
        return this.positionx;
    };
    Superman.prototype.showHit = function () {
        this.elementpath.style.backgroundColor = "red";
    };
    return Superman;
}());
//# sourceMappingURL=main.js.map