var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// &lt;reference path=”phaser.d.ts”/&gt;
window.onload = function () {
    console.log('game tries to launch');
    var game = new Sunny.Game();
};
var Sunny;
(function (Sunny) {
    var Bood = /** @class */ (function (_super) {
        __extends(Bood, _super);
        function Bood() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Bood.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Bood.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            //console.log('initiate');
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                //this.scale.pageAlignHorizontally = true;
            }
            else {
                //  Same goes for mobile settings.
            }
            this.game.state.start('Preloader', true, false);
        };
        return Bood;
    }(Phaser.State));
    Sunny.Bood = Bood;
})(Sunny || (Sunny = {}));
var Sunny;
(function (Sunny) {
    var PlayerPos = /** @class */ (function () {
        function PlayerPos(x1, y1, time1) {
            this.x = x1;
            this.y = y1;
            this.time = new Date(time1).getTime();
        }
        return PlayerPos;
    }());
    Sunny.PlayerPos = PlayerPos;
})(Sunny || (Sunny = {}));
var Sunny;
(function (Sunny) {
    var PlayerModel = /** @class */ (function (_super) {
        __extends(PlayerModel, _super);
        function PlayerModel(game, name1, isControlableP, initialPositions) {
            if (isControlableP === void 0) { isControlableP = false; }
            if (initialPositions === void 0) { initialPositions = null; }
            var _this = _super.call(this, game, 0, 0) || this;
            _this.msInTick = 3000;
            _this.playerName = name1;
            _this.isControlable = isControlableP;
            _this.graphics = new Phaser.Graphics(game, -15, -15);
            _this.graphics.beginFill(0xFF0000);
            _this.graphics.lineStyle(1, 0x000000, 1);
            _this.graphics.moveTo(0, 0);
            _this.graphics.lineTo(30, 0);
            _this.graphics.lineTo(15, 30);
            _this.graphics.lineTo(0, 0);
            _this.graphics.endFill();
            _this.addChild(_this.graphics);
            game.add.existing(_this);
            _this.anchor.setTo(0.5, 1);
            _this.playerPositions = new Array();
            _this.playerPositions[0] = new Sunny.PlayerPos(Math.random() * 7000, Math.random() * 7000, 0);
            for (var i = 1; i < 20 + Math.random() * 100; i++) {
                var pp = _this.playerPositions[i - 1];
                _this.playerPositions[i] = new Sunny.PlayerPos(pp.x + (0.5 - Math.random()) * 400, pp.y + (0.5 - Math.random()) * 400, pp.time + Math.random() * 2);
            }
            _this.x = _this.playerPositions[0].x;
            _this.y = _this.playerPositions[0].y;
            _this.trail = new Phaser.Graphics(game, 0, 0);
            _this.trail.moveTo(_this.x, _this.y);
            _this.trail.visible = false;
            game.add.existing(_this.trail);
            return _this;
            //this.playerPositions[0] = new PlayerPos(0, 100, 0);
            //this.playerPositions[1] = new PlayerPos(3000, 120, 2);
            // this.playerPositions[2] = new PlayerPos(2000, 400, 3);
            //initialPositions[2] = new PlayerPos(100, 200, 500);
        }
        PlayerModel.prototype.reDraw = function (col) {
            this.select = col;
            this.graphics.destroy();
            this.graphics = new Phaser.Graphics(this.game, -15, -15);
            if (col == 0)
                this.graphics.beginFill(0x0000FF);
            if (col == 1)
                this.graphics.beginFill(0x00FF00);
            if (col == 2)
                this.graphics.beginFill(0xFF0000);
            this.graphics.lineStyle(1, 0x000000, 1);
            this.graphics.moveTo(0, 0);
            this.graphics.lineTo(30, 0);
            this.graphics.lineTo(15, 30);
            this.graphics.lineTo(0, 0);
            this.graphics.endFill();
            this.addChild(this.graphics);
        };
        PlayerModel.prototype.updatePlayer = function (deltaTime, currTick) {
            if (!this.isControlable) {
                var currPoint = 0;
                for (var i = 0; i < this.playerPositions.length; i++) {
                    if (currTick - deltaTime * 10 > this.playerPositions[i].time) {
                        currPoint = i;
                    }
                }
                if (currPoint != this.playerPositions.length - 1) {
                    var pos0 = this.playerPositions[currPoint];
                    var pos1 = this.playerPositions[currPoint + 1];
                    this.trail.beginFill(0xFF0000);
                    this.trail.lineStyle(1, 0x0000FF, 1);
                    // this.trail.moveTo(this.x.valueOf(), this.y.valueOf());
                    this.x = pos0.x + (pos1.x - pos0.x) * (currTick - pos0.time) / (pos1.time - pos0.time);
                    this.y = pos0.y + (pos1.y - pos0.y) * (currTick - pos0.time) / (pos1.time - pos0.time);
                    this.trail.lineTo(this.x, this.y);
                    this.trail.endFill();
                }
            }
            //this.game.camera.follow(this);
            // var speedX = (pos1.x - pos0.x) / (pos1.time - pos0.time)*(deltaTime/this.msInTick);
            // this.x += (pos1.x-this.x)/((pos1.time - currTick) * (deltaTime / this.msInTick));
            //this.x += (this.playerPositions[0].x - this.x) * delta;
        };
        return PlayerModel;
    }(Phaser.Sprite));
    Sunny.PlayerModel = PlayerModel;
})(Sunny || (Sunny = {}));
var Sunny;
(function (Sunny) {
    var ColSquare = /** @class */ (function (_super) {
        __extends(ColSquare, _super);
        function ColSquare(game, x1, y1, callBack, cont) {
            var _this = _super.call(this, game, 175 + x1 * Sunny.Config.squareSize, 50 + y1 * Sunny.Config.squareSize, '', callBack, cont) || this;
            _this.currPlayer = 0;
            _this.posX = x1;
            _this.posY = y1;
            _this.anchor.setTo(0.5, 0.5);
            _this.currCol = Math.floor(Math.random() * Sunny.Config.colors.length);
            _this.graphics = new Phaser.Graphics(game, -15, -15);
            _this.graphics.beginFill(Sunny.Config.colors[_this.currCol]);
            _this.graphics.lineStyle(1, 0x000000, 1);
            _this.graphics.moveTo(0, 0);
            _this.graphics.lineTo(30, 0);
            _this.graphics.lineTo(30, 30);
            _this.graphics.lineTo(0, 30);
            _this.graphics.lineTo(0, 0);
            _this.graphics.endFill();
            _this.addChild(_this.graphics);
            game.add.existing(_this);
            return _this;
        }
        ColSquare.prototype.reDraw = function (col) {
            this.currCol = col;
            this.graphics.destroy();
            this.graphics = new Phaser.Graphics(this.game, -15, -15);
            this.graphics.beginFill(Sunny.Config.colors[col]);
            this.graphics.lineStyle(1, 0x000000, 1);
            this.graphics.moveTo(0, 0);
            this.graphics.lineTo(30, 0);
            this.graphics.lineTo(30, 30);
            this.graphics.lineTo(0, 30);
            this.graphics.lineTo(0, 0);
            this.graphics.endFill();
            this.addChild(this.graphics);
            if (this.tween != null) {
                this.tween.resume();
                this.tween.repeatAll(-1);
            }
        };
        ColSquare.prototype.activate = function (playerNum) {
            this.currPlayer = playerNum;
            this.tween = this.game.add.tween(this).to({ alpha: 0.8 }, 300, Phaser.Easing.Linear.None, true);
            this.tween.repeatAll(-1);
        };
        return ColSquare;
    }(Phaser.Button));
    Sunny.ColSquare = ColSquare;
})(Sunny || (Sunny = {}));
var Sunny;
(function (Sunny) {
    var Config = /** @class */ (function () {
        function Config() {
        }
        return Config;
    }());
    Sunny.Config = Config;
})(Sunny || (Sunny = {}));
var Sunny;
(function (Sunny) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 1024, 768, Phaser.AUTO, 'content', null) || this;
            setTimeout(function () {
                console.log('НУ Я ПОДОЖДАЛ');
                _this.state.add('Booty', Sunny.Bood, false);
                console.log(_this.state.checkState('Booty'));
            }, 100);
            _this.state.add('Booty', Sunny.Bood, false);
            console.log('game made');
            _this.state.add('Preloader', Sunny.Preloader, false);
            //this.state.add('MainMenu', MainMenu, false);
            //this.state.add('Level', Level, false);
            _this.state.add('ReplayViewer', Sunny.ReplayViewer, false);
            setTimeout(function () {
                console.log('НУ Я ПОДОЖДАЛ2');
                console.log(_this.state.checkState('Booty'));
                _this.state.start('Booty');
            }, 100);
            return _this;
        }
        return Game;
    }(Phaser.Game));
    Sunny.Game = Game;
})(Sunny || (Sunny = {}));
var Sunny;
(function (Sunny) {
    var ReplayViewer = /** @class */ (function (_super) {
        __extends(ReplayViewer, _super);
        function ReplayViewer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.msInTick = 3000;
            return _this;
            /*
    
            private onSquareClick(sqr : ColSquare): void
            {
                if (this.currPlayer == 1&&sqr.currCol!=this.player1Squares[0].currCol&&sqr.currCol!=this.player2Squares[0].currCol)
                {
                    this.player1Stats.reDraw(sqr.currCol);
                }
                if (this.currPlayer == 2 && sqr.currCol != this.player1Squares[0].currCol && sqr.currCol != this.player2Squares[0].currCol) {
                    this.player2Stats.reDraw(sqr.currCol);
                }
            }
    
            private onBtnClick(btn: PlayerStats): void {
                if (btn.num == 1 && this.currPlayer == 1 && btn.color != this.player1Squares[0].currCol)
                {
                    for (var i: number = 0; i < this.player1Squares.length; i++) {
                        this.player1Squares[i].reDraw(btn.color);
                        
                    }
                    this.checkForEat();
                    this.currPlayer = 2;
                    this.turn.x = 650;
                    this.score1.text = ''+this.player1Squares.length;
                }
                if (btn.num == 2 && this.currPlayer == 2 && btn.color != this.player2Squares[0].currCol) {
                    for (var i: number = 0; i < this.player2Squares.length; i++) {
                        this.player2Squares[i].reDraw(btn.color);
    
                    }
                    this.checkForEat();
                    this.currPlayer = 1;
                    this.turn.x = 10;
                    this.score2.text = '' + this.player2Squares.length;
                }
            }
    
            private checkForEat(): void
            {
                for (var i: number = 0; i < this.player1Squares.length; i++)
                {
                    this.eatNear(this.player1Squares[i]);
                }
                for (var i: number = 0; i < this.player2Squares.length; i++)
                {
                    this.eatNear(this.player2Squares[i]);
                }
            }
            private eatNear(sq : ColSquare): void
            {
                if (sq.posX > 0)
                {
                    var tempSq: ColSquare = this.squares[sq.posX - 1][sq.posY];
                    if (tempSq.currPlayer == 0 && tempSq.currCol ==sq.currCol)
                    {
                        if (sq.currPlayer == 1)
                        {
                            this.player1Squares.push(tempSq);
                        }
                        else
                        {
                            this.player2Squares.push(tempSq);
                        }
                        tempSq.activate(sq.currPlayer);
                        this.eatNear(tempSq);
                    }
                }
                if (sq.posX < 15) {
                    var tempSq: ColSquare = this.squares[sq.posX + 1][sq.posY];
                    if (tempSq.currPlayer == 0 && tempSq.currCol == sq.currCol) {
                        if (sq.currPlayer == 1) {
                            this.player1Squares.push(tempSq);
                        }
                        else {
                            this.player2Squares.push(tempSq);
                        }
                        tempSq.activate(sq.currPlayer);
                        this.eatNear(tempSq);
                    }
                }
                if (sq.posY > 0) {
                    var tempSq: ColSquare = this.squares[sq.posX][sq.posY-1];
                    if (tempSq.currPlayer == 0 && tempSq.currCol == sq.currCol) {
                        if (sq.currPlayer == 1) {
                            this.player1Squares.push(tempSq);
                        }
                        else {
                            this.player2Squares.push(tempSq);
                        }
    
                        tempSq.activate(sq.currPlayer);
                        this.eatNear(tempSq);
                    }
                }
                if (sq.posY <15) {
                    var tempSq: ColSquare = this.squares[sq.posX][sq.posY + 1];
                    if (tempSq.currPlayer == 0 && tempSq.currCol == sq.currCol) {
                        if (sq.currPlayer == 1) {
                            this.player1Squares.push(tempSq);
                        }
                        else {
                            this.player2Squares.push(tempSq);
                        }
                        tempSq.activate(sq.currPlayer);
                        this.eatNear(tempSq);
                    }
                }
            }*/
        }
        ReplayViewer.prototype.create = function () {
            //this.mapSprite = new Phaser.Sprite(this.game, 0, 0, 'miramarMap');
            this.mapSprite = this.game.add.sprite(0, 0, 'miramarMap');
            this.mapSprite.width = 700;
            this.mapSprite.height = 700;
            this.game.world.setBounds(0, 0, 700, 700);
            this.players = new Array();
            for (var i = 0; i < 70; i++) {
                this.players[i] = new Sunny.PlayerModel(this.game, '');
                this.players[i].reDraw(2);
            }
            this.player = new Sunny.PlayerModel(this.game, '', true);
            this.player.reDraw(0);
            //this.player.width = 10;
            //this.player.height = 10;
            //this.game.physics.arcade.enable(this.player);
            this.game.camera.follow(this.player);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            console.log('keky');
            var telej = this.game.cache.getJSON('telem');
            var num = 0;
            var forthis = this;
            var curTick;
            telej.forEach(function (value) {
                if (value._T == 'LogPlayerPosition') {
                    var isPlayerExists = false;
                    for (var i = 0; i < forthis.players.length; i++) {
                        if (forthis.players[i].playerName == value.character.name) {
                            forthis.players[i].playerPositions.push(new Sunny.PlayerPos(value.character.location.x / 1000, value.character.location.y / 1000, value._D));
                            isPlayerExists = true;
                        }
                    }
                    if (!isPlayerExists) {
                        var p = new Sunny.PlayerModel(forthis.game, value.character.name);
                        forthis.players.push(p);
                        p.playerPositions.push(new Sunny.PlayerPos(value.character.location.x / 1000, value.character.location.y / 1000, value._D));
                    }
                    //value.character.name
                    //this.game.debug.text(value._D as String, 302, 300);
                    //this.game.debug.text('ultrakek', 302, 300);
                    num++;
                }
                ;
                if (value._T == 'LogMatchStart') {
                    curTick = value._D;
                }
            });
            this.currTick = (new Date(curTick)).getTime();
            /*
            Config.colors = new Array<number>();
            Config.colors.push(0xFF0000);
            Config.colors.push(0x00FF00);
            Config.colors.push(0x0000FF);
            Config.colors.push(0xFFFF00);
            Config.colors.push(0xFF00FF);
            Config.colors.push(0x00FFFF);
            Config.colors.push(0xFF6600);
            Config.colors.push(0x114F2F);
            Config.squareSize = 30;
            this.currPlayer = 1;
            this.squares = new Array<Array<ColSquare>>(16);
            for (var i = 0; i < this.squares.length; i++)
            {
                this.squares[i] = new Array<ColSquare>(16);
            }
            for (var i = 0; i < this.squares.length; i++) {
                for (var j = 0; j < this.squares.length; j++) {
                    this.squares[i][j] = new ColSquare(this.game, i, j,this.onSquareClick,this);
                }
            }
            this.player1Stats = new PlayerStats(this.game, 0, 0,1,this.onBtnClick,this);
            this.player2Stats = new PlayerStats(this.game, 640, 0,2,this.onBtnClick,this);
            this.player1Stats.reDraw(0);
            this.player2Stats.reDraw(1);



            this.name1 = this.game.add.text(10, 50, 'Player 1', {
                font: "35px Arial",
                fill: "#FFFFFF",
                align: "center"
            });
            this.name2 = this.game.add.text(650, 50, 'Player 2', {
                font: "35px Arial",
                fill: "#FFFFFF",
                align: "center"
            });

            this.player1Squares = new Array<ColSquare>();
            this.player1Squares.push(this.squares[0][0]);
            this.player1Squares[0].reDraw(0);
            this.player1Squares[0].activate(1);
            this.player2Squares = new Array<ColSquare>();
            this.player2Squares.push(this.squares[15][15])
            this.player2Squares[0].reDraw(1);
            this.player2Squares[0].activate(2);
            this.checkForEat();


            this.score1 = this.game.add.text(240, 530, ''+this.player1Squares.length, {
                font: "35px Arial",
                fill: "#FFFFFF",
                align: "left"
            });
            this.score2 = this.game.add.text(560, 530, ''+this.player2Squares.length, {
                font: "35px Arial",
                fill: "#FFFFFF",
                align: "left"
            });
            this.turn = this.game.add.text(10, 400, 'Your Turn', {
                font: "33px Arial",
                fill: "#FFFFFF",
                align: "center"
            });*/
        };
        ReplayViewer.prototype.update = function () {
            if (this.cursors.up.isDown) {
                this.player.y -= 10;
            }
            else if (this.cursors.down.isDown) {
                this.player.y += 10;
            }
            if (this.cursors.left.isDown) {
                this.player.x -= 10;
            }
            else if (this.cursors.right.isDown) {
                this.player.x += 10;
            }
            var deltaTime = this.game.time.elapsed;
            this.currTick += 10 * deltaTime;
            this.player.updatePlayer(deltaTime, this.currTick);
            for (var i = 0; i < this.players.length; i++) {
                this.players[i].updatePlayer(deltaTime, this.currTick);
            }
        };
        ReplayViewer.prototype.render = function () {
            var game = this.game;
            var player = this.player;
            game.debug.cameraInfo(game.camera, 32, 32);
            game.debug.spriteCoords(player, 32, 500);
            game.debug.text(this.currTick.toString(), 102, 200);
        };
        return ReplayViewer;
    }(Phaser.State));
    Sunny.ReplayViewer = ReplayViewer;
})(Sunny || (Sunny = {}));
var Sunny;
(function (Sunny) {
    var Level = /** @class */ (function (_super) {
        __extends(Level, _super);
        function Level() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level.prototype.create = function () {
            Sunny.Config.colors = new Array();
            Sunny.Config.colors.push(0xFF0000);
            Sunny.Config.colors.push(0x00FF00);
            Sunny.Config.colors.push(0x0000FF);
            Sunny.Config.colors.push(0xFFFF00);
            Sunny.Config.colors.push(0xFF00FF);
            Sunny.Config.colors.push(0x00FFFF);
            Sunny.Config.colors.push(0xFF6600);
            Sunny.Config.colors.push(0x114F2F);
            Sunny.Config.squareSize = 30;
            this.currPlayer = 1;
            this.squares = new Array(16);
            for (var i = 0; i < this.squares.length; i++) {
                this.squares[i] = new Array(16);
            }
            for (var i = 0; i < this.squares.length; i++) {
                for (var j = 0; j < this.squares.length; j++) {
                    this.squares[i][j] = new Sunny.ColSquare(this.game, i, j, this.onSquareClick, this);
                }
            }
            this.player1Stats = new Sunny.PlayerStats(this.game, 0, 0, 1, this.onBtnClick, this);
            this.player2Stats = new Sunny.PlayerStats(this.game, 640, 0, 2, this.onBtnClick, this);
            this.player1Stats.reDraw(0);
            this.player2Stats.reDraw(1);
            this.name1 = this.game.add.text(10, 50, 'Player 1', {
                font: "35px Arial",
                fill: "#FFFFFF",
                align: "center"
            });
            this.name2 = this.game.add.text(650, 50, 'Player 2', {
                font: "35px Arial",
                fill: "#FFFFFF",
                align: "center"
            });
            this.player1Squares = new Array();
            this.player1Squares.push(this.squares[0][0]);
            this.player1Squares[0].reDraw(0);
            this.player1Squares[0].activate(1);
            this.player2Squares = new Array();
            this.player2Squares.push(this.squares[15][15]);
            this.player2Squares[0].reDraw(1);
            this.player2Squares[0].activate(2);
            this.checkForEat();
            this.score1 = this.game.add.text(240, 530, '' + this.player1Squares.length, {
                font: "35px Arial",
                fill: "#FFFFFF",
                align: "left"
            });
            this.score2 = this.game.add.text(560, 530, '' + this.player2Squares.length, {
                font: "35px Arial",
                fill: "#FFFFFF",
                align: "left"
            });
            this.turn = this.game.add.text(10, 400, 'Your Turn', {
                font: "33px Arial",
                fill: "#FFFFFF",
                align: "center"
            });
        };
        Level.prototype.onSquareClick = function (sqr) {
            if (this.currPlayer == 1 && sqr.currCol != this.player1Squares[0].currCol && sqr.currCol != this.player2Squares[0].currCol) {
                this.player1Stats.reDraw(sqr.currCol);
            }
            if (this.currPlayer == 2 && sqr.currCol != this.player1Squares[0].currCol && sqr.currCol != this.player2Squares[0].currCol) {
                this.player2Stats.reDraw(sqr.currCol);
            }
        };
        Level.prototype.onBtnClick = function (btn) {
            if (btn.num == 1 && this.currPlayer == 1 && btn.color != this.player1Squares[0].currCol) {
                for (var i = 0; i < this.player1Squares.length; i++) {
                    this.player1Squares[i].reDraw(btn.color);
                }
                this.checkForEat();
                this.currPlayer = 2;
                this.turn.x = 650;
                this.score1.text = '' + this.player1Squares.length;
            }
            if (btn.num == 2 && this.currPlayer == 2 && btn.color != this.player2Squares[0].currCol) {
                for (var i = 0; i < this.player2Squares.length; i++) {
                    this.player2Squares[i].reDraw(btn.color);
                }
                this.checkForEat();
                this.currPlayer = 1;
                this.turn.x = 10;
                this.score2.text = '' + this.player2Squares.length;
            }
        };
        Level.prototype.checkForEat = function () {
            for (var i = 0; i < this.player1Squares.length; i++) {
                this.eatNear(this.player1Squares[i]);
            }
            for (var i = 0; i < this.player2Squares.length; i++) {
                this.eatNear(this.player2Squares[i]);
            }
        };
        Level.prototype.eatNear = function (sq) {
            if (sq.posX > 0) {
                var tempSq = this.squares[sq.posX - 1][sq.posY];
                if (tempSq.currPlayer == 0 && tempSq.currCol == sq.currCol) {
                    if (sq.currPlayer == 1) {
                        this.player1Squares.push(tempSq);
                    }
                    else {
                        this.player2Squares.push(tempSq);
                    }
                    tempSq.activate(sq.currPlayer);
                    this.eatNear(tempSq);
                }
            }
            if (sq.posX < 15) {
                var tempSq = this.squares[sq.posX + 1][sq.posY];
                if (tempSq.currPlayer == 0 && tempSq.currCol == sq.currCol) {
                    if (sq.currPlayer == 1) {
                        this.player1Squares.push(tempSq);
                    }
                    else {
                        this.player2Squares.push(tempSq);
                    }
                    tempSq.activate(sq.currPlayer);
                    this.eatNear(tempSq);
                }
            }
            if (sq.posY > 0) {
                var tempSq = this.squares[sq.posX][sq.posY - 1];
                if (tempSq.currPlayer == 0 && tempSq.currCol == sq.currCol) {
                    if (sq.currPlayer == 1) {
                        this.player1Squares.push(tempSq);
                    }
                    else {
                        this.player2Squares.push(tempSq);
                    }
                    tempSq.activate(sq.currPlayer);
                    this.eatNear(tempSq);
                }
            }
            if (sq.posY < 15) {
                var tempSq = this.squares[sq.posX][sq.posY + 1];
                if (tempSq.currPlayer == 0 && tempSq.currCol == sq.currCol) {
                    if (sq.currPlayer == 1) {
                        this.player1Squares.push(tempSq);
                    }
                    else {
                        this.player2Squares.push(tempSq);
                    }
                    tempSq.activate(sq.currPlayer);
                    this.eatNear(tempSq);
                }
            }
        };
        return Level;
    }(Phaser.State));
    Sunny.Level = Level;
})(Sunny || (Sunny = {}));
var Sunny;
(function (Sunny) {
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            this.playBtn = this.game.add.button(this.game.width / 2, this.game.height * 2 / 3, 'playBtn', this.fadeOut, this);
            this.playBtn.anchor = new Phaser.Point(0.5, 0.5);
            this.playBtn.alpha = 0;
            this.add.tween(this.playBtn).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        };
        MainMenu.prototype.fadeOut = function () {
            var tween = this.add.tween(this.playBtn).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('ReplayViewer', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Sunny.MainMenu = MainMenu;
})(Sunny || (Sunny = {}));
var Sunny;
(function (Sunny) {
    var PlayerStats = /** @class */ (function (_super) {
        __extends(PlayerStats, _super);
        function PlayerStats(game, x1, y1, curPlayer, callBack, cont) {
            var _this = _super.call(this, game, x1, y1, '', callBack, cont) || this;
            _this.num = curPlayer;
            _this.graphics = new Phaser.Graphics(_this.game, 10, 150);
            _this.addChild(_this.graphics);
            game.add.existing(_this);
            return _this;
        }
        PlayerStats.prototype.reDraw = function (col) {
            this.color = col;
            this.graphics.destroy();
            this.graphics = new Phaser.Graphics(this.game, 10, 150);
            this.graphics.beginFill(Sunny.Config.colors[col]);
            this.graphics.lineStyle(1, 0x000000, 1);
            this.graphics.moveTo(0, 0);
            this.graphics.lineTo(140, 0);
            this.graphics.lineTo(140, 140);
            this.graphics.lineTo(0, 140);
            this.graphics.lineTo(0, 0);
            this.graphics.endFill();
            this.addChild(this.graphics);
        };
        return PlayerStats;
    }(Phaser.Button));
    Sunny.PlayerStats = PlayerStats;
})(Sunny || (Sunny = {}));
var Sunny;
(function (Sunny) {
    var Preloader = /** @class */ (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloadBar');
            this.preloadBar.anchor = new Phaser.Point(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            //this.load.audio('music', 'assets/title.mp3', true);
            this.load.image('mainBG', 'assets/MainBG.png');
            this.load.image('player', 'assets/Wood_0.png');
            this.load.image('miramarMap', 'assets/miramar.jpg');
            this.load.image('playBtn', 'assets/PlayButton.png');
            this.load.spritesheet('cutter', 'assets/cutter.png', 200, 200, 2);
            this.load.json('telem', 'assets/telem.json');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('ReplayViewer', true, false);
        };
        return Preloader;
    }(Phaser.State));
    Sunny.Preloader = Preloader;
})(Sunny || (Sunny = {}));
//# sourceMappingURL=game.js.map