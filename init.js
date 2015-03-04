function InitGame() {
    var _ctx;
    var _removed = [];
    var _removedBullets = [];
    var _actors = [];
    var _bullets = [];
    var _numUnloaded = 0;
    
    function App() {
        this.score = 0;
        Object.defineProperty(this, "CANVAS_ID", {
            value: "game-canvas",
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "canvas", {
            get: function() { return document.getElementById(app.CANVAS_ID); },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "GAME_NAME", {
            value: window.document.head.firstElementChild.firstChild,
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "actors", {
            get: function() { return _actors; },
            enumerable: true,
            configurable: false
        });
        
        Object.defineProperty(this, "bullets", {
            get: function() { return _bullets; },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "kill", {
            value: function(actor) {
                if (actor) {
                    _removed.push(actor);
                }
            },
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "removeKilled", {
            value: _removeKilled,
            writable: false,
            enumerable: true,
            configurable: false
        });
        
        Object.defineProperty(this, "removeBullet", {
            value: _removeBullet,
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "ctx", {
            get: function() { return _ctx; },
            enumerable: true,
            configurable: false
        });
        
        Object.defineProperty(this, "world", {
            value: new Box2D.b2World(new Box2D.b2Vec2(0, 0), true),
            enumerable: true,
            writable: false,
            configurable: false
        });

        Object.defineProperty(this, "resetGraphics", {
            value: resetGraphicsContexts,
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "iOS", {
            value: navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false,
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "defaultPixelsPerMeter", {
            value: 48,
            enumerable: true,
            writeable: false,
            configureable: false
        });
        
        Object.defineProperty(this, "toMeters", {
            value: function(x) { return x/4; },
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "toPixels", {
            value: function(x) { return 4*x; },
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "now", {
            value: timeNow,
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "ships", {
            value: {
                "PLASMA_SHIP": [],
                "POWER_SHIP": [],
                "SPREAD_SHIP": [],
                "WAVE_SHIP": []
            },
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "cache", {
            value: {},
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "loadImage", {
            value: loadImageAsset,
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        
        Object.defineProperty(this, "loadAudio", {
            value: loadAudioAsset,
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "inMenu", {
            value: true,
            enumerable: true,
            writable: true,
            configurable: false
        });
        
        Object.defineProperty(this, "curMenu", {
            value: 0,
            enumerable: true,
            writable: true,
            configurable: false
        });
    }
    
    function timeNow() {
        return (new Date()).getTime();
    }

    function getWindowDimension(dim) {
        dim = dim.charAt(0).toUpperCase() + dim.slice(1).toLowerCase();
        var tmp = document.documentElement["client" + dim];
        return Math.max(tmp , window["inner"+dim] || 0);
    }

    function resetCanvas() {
        var canvas = document.getElementById(app.CANVAS_ID);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
        
        canvas = document.createElement("canvas");
        canvas.id = app.CANVAS_ID;
        canvas.width = getWindowDimension("width");
        canvas.height = getWindowDimension("height");
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        document.body.appendChild(canvas);
        _ctx = canvas.getContext("2d");
        resetGraphicsContexts();
        
        if (app.camera) {
            app.camera.resizeCanvas();
        }
    }
    
    function _removeKilled() {
        var len = 0;
        var newLength = 0;
        var next = null;
        if (_removed.length) {
            len = _actors.length;
            newLength = len - _removed.length;
            var i = 0;
            for (next = _removed.pop(); next; next = _removed.pop()) {
                for (;i < len; ++i) {
                    if (_actors[i] === next) {
                        if (_actors[i].body) {
                            app.world.DestroyBody(_actors[i].body);
                        }
                        if (_actors[i].isShip === true) {
                            var toRemove = _actors[i];
                            var index = toRemove.others.indexOf(toRemove);
                            toRemove.others.splice(index, 1);
                        }
                        if (_actors[i] === app.player) {
                           onPlayerDeath();
                        }
                        _actors[i] = null;
                    }
                }
            }
            var n = 0;
            var tmp = new Array(newLength);
            for (i = 0; i < len; ++i) {
                if (_actors[i]) {
                    tmp[n++] = _actors[i];
                }
            }
            _actors = tmp;
        }
        if (_removedBullets.length) {
            len = _bullets.length;
            newLength = len - _removedBullets.length;
            for (next = _removedBullets.pop(); next; next = _removedBullets.pop()) {
                for (var i = 0; i < len; ++i) {
                    if (_bullets[i] === next) {
                        _bullets[i].remove();
                        _bullets[i] = _bullets[0];
                        _bullets.shift();
                    }
                }
            }
            /*
            var n = 0;
            var tmp = new Array(newLength);
            for (var i = 0; i < len; ++i) {
                if (_bullets[i]) {
                    tmp[n++] = _bullets[i];
                }
            }
            _bullets = tmp;
            */
        }
    }
    
    function _removeBullet(bullet) {
        if (bullet) {
            _removedBullets.push(bullet);
        }
    }
    
    function resetGraphicsContexts() {
        _ctx.fillStyle = "#000000";
        _ctx.font = "20px sans-serif";
        _ctx.globalAlpha = 1;
        _ctx.globalCompositeOperation = "source-over";
        _ctx.imageSmoothingEnabled = true;
        _ctx.lineCap = "butt";
        _ctx.lineDashOffset = 0;
        _ctx.lineJoin = "miter";
        _ctx.lineWidth = 1;
        _ctx.miterLimit = 10;
        _ctx.shadowBlur = 0;
        _ctx.shadowColor = "rgba(0, 0, 0, 0)";
        _ctx.shadowOffsetX = 0;
        _ctx.shadowOffsetY = 0;
        _ctx.strokeStyle = "#000000";
        _ctx.textAlign = "start";
        _ctx.textBaseline = "alphabetic";
        _ctx.setTransform(1, 0, 0, 1, 0, 0);
        Object.defineProperty(app, "camera", {
            value: new Camera(),
            enumerable: true,
            writable: true,
            configurable: false
        });
    }
    
    function loadImageAsset(path) {
        ++_numUnloaded;
        var i = new Image();
        i.addEventListener("load", function(e){
            app.cache[path] = i;
            if (--_numUnloaded === 0) {    
                afterAssetsLoad();
            }
        });
        i.src = path;
    }
    
    function loadAudioAsset(path, loop){
        ++_numUnloaded;
        var j = new Audio();
        j.addEventListener("loadeddata", function(e){
            app.cache[path] = j;
            if(--_numUnloaded === 0) {
                afterAssetsLoad();
            }
        });
        j.src = path;
        j.loop = loop;
    }
    
    window.app = new App();
    
    window.addEventListener("resize", resetCanvas);
    
    window.addEventListener('orientationchange', resetCanvas);
    resetCanvas();
};

function loadAssets() {
    //app.loadImage("asset/bg.png");
    app.loadImage("asset/debris.png");
    app.loadImage("asset/dpadBase.png");
    app.loadImage("asset/dpadMove.png");
    app.loadImage("asset/moon.png");
    app.loadImage("asset/obstacle.png");
    app.loadImage("asset/obstacle2.png");
    app.loadImage("asset/obstacle3.png");
    app.loadImage("asset/PlasmaShip.png");
    app.loadImage("asset/PlasmaShot.png");
    app.loadImage("asset/PlasmaChange.png");
    app.loadImage("asset/PowerShip.png");
    app.loadImage("asset/PowerShot.png");
    app.loadImage("asset/PowerChange.png");
    app.loadImage("asset/SpreadShip.png");
    app.loadImage("asset/SpreadShot.png");
    app.loadImage("asset/SpreadChange.png");
    app.loadImage("asset/WaveShip.png");
    app.loadImage("asset/WaveShot.png");
    app.loadImage("asset/WaveChange.png");
    app.loadImage("asset/Explosion.png")
   
    app.loadAudio("asset/BaseShotSound.wav", false);
    app.loadAudio("asset/PlasmaShotSound.wav", false);
    app.loadAudio("asset/TripleShotSound.wav", false);
    app.loadAudio("asset/WaveShotSound.wav", false);
    
    app.loadAudio("asset/ControlNewShip.wav", false);
    app.loadAudio("asset/DestroyShip.wav", false);
    app.loadAudio("asset/StunBomb.wav", false);
    
    app.loadAudio("asset/MainMenuIntro_small.wav", false);
    app.loadAudio("asset/MainMenuLoop_small.wav", true);
    app.loadAudio("asset/FirstShipLoop_small.wav", true);
    
}

function afterAssetsLoad() {
    initShipPrototypes();
    initObstaclePrototypes();
    initAi();
    setupInput();
    showMenu();
    start();
}

function drawScore() {
            app.ctx.save();
                app.ctx.fillStyle = "White";
                app.ctx.scale(3, 3);
                var scoreText = "" + app.score;
                //console.log(scoreText);
                app.ctx.fillText(scoreText,5, 20);
            app.ctx.restore();
}

