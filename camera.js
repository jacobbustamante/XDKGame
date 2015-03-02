function Camera() {
    GameType.call(this, "CAMERA");
    app.actors.pop(this);
    this.isRendered = false;
    var bodyDef = new b2BodyDef();
    bodyDef.set_type(b2_dynamicBody);
    bodyDef.set_position(new b2Vec2(0, 0));
    SpaceObject.call(this, bodyDef);
    
    var _body = this.body;
    var _fixture = null;
    var _PTM = 48;
    var _canvasOffset = null;
    var _centerCanvas = null;
    var _fieldOfView = null;
    
    this.minZoom = _PTM*2;//_mToPx/0.75;
    this.maxZoom = _PTM/2;//_mToPx/2;
    this.defaultZoom = _PTM;
    
    var _cam = this;
    
    var _worldPointFromPixelPoint = function(pixelPoint) {
        return {                
            x: (pixelPoint.x - _canvasOffset.x)/(_PTM),
            y: (pixelPoint.y - (app.canvas.height - _canvasOffset.y))/(_PTM)
        };
    };
    
    Object.defineProperty(this, "fov", {
        get: function() {
            return {
                h:_fieldOfView.h, v: _fieldOfView.v
            };
        },
        enumerable: true,
        configurable: false
    });
    
    
    function _move(x, y) {
        var pos = null;
        if (_followPlayer) {
            pos = {
                x: app.player.x,
                y: app.player.y
            }
        }
        else {
            pos = _worldPointFromPixelPoint(_centerCanvas);
        }
        
        
        var destX = x - pos.x;
        var destY = y - pos.y;
        _canvasOffset.x -= destX * (_PTM);
        _canvasOffset.y += destY * (_PTM);
        _body.GetPosition().set_x(x);
        _body.GetPosition().set_y(y);
    }
    
    var _followPlayer = false;
    Object.defineProperty(this, "followPlayer", {
        get: function() {
            return _followPlayer;
        },
        set: function(b) {
            if (b === true || b === false) {
                _followPlayer = b;
            }
        },
        enumerable: true,
        configurable: false
    });
    
    this.update = function(){
        if (_followPlayer) {
            _move(app.player.x, app.player.y);
        }
    };
    
    var _resizeCanvas = (function () {
        var pos = _body.GetPosition();
        resetCanvasCenterPoint();
        resetFOV();
        resetCanvasOffset();
        resetFixture();
        _move(pos.get_x(), pos.get_y());
    }).bind(this);
    _resizeCanvas();
    
     
    
    Object.defineProperty(this, "move", {
        value: _move,
        writable: false,
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "x", {
        get: function() {
            return _body.GetPosition().get_x();
        },
        set: function(newX) {
            _move(newX, _body.GetPosition().get_y());
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(this, "y", {
        get: function() {
            return _body.GetPosition().get_y();
        },
        set: function(newY) {
            _move(_body.GetPosition().get_x(), newY);
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(this, "offsetX", {
        get: function() {
            return _canvasOffset.x;
            //return centerCanvas.x;
        },
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "offsetY", {
        get: function() {
            return _canvasOffset.y;
            //return centerCanvas.y;
        },
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "MetersPerPixel", {
        get: function() {
            return 1/_PTM;
        },
        set: function(scale) {
            var camPos = _worldPointFromPixelPoint(_centerCanvas);
            _PTM = 1/scale;
            _resizeCanvas();
            _move(camPos.x, camPos.y);
        },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "PixelsPerMeter", {
        get: function() {
            return _PTM;
        },
        set: function(scale) {
            var camPos = _worldPointFromPixelPoint(_centerCanvas);
            _PTM = scale;
            _resizeCanvas();
            _move(camPos.x, camPos.y);
            //if (scale < this.minZoom && scale > this.maxZoom) {
                
            //}
        },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "resizeCanvas", {
        value: _resizeCanvas,
        writable: false,
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "screenToWorld", {
        value: _worldPointFromPixelPoint,
        writable: false,
        configurable: false,
        enumerable: true
    });
    
    function resetFOV() {
        _fieldOfView = {
            h: app.canvas.width/_PTM,
            v: app.canvas.height/_PTM
        };
    }
    
    function resetCanvasCenterPoint() {
        _centerCanvas = {
            x: app.canvas.width/2,
            y: app.canvas.height/2
        };
    }
    
    function resetCanvasOffset() {
        _canvasOffset = {
            x: app.canvas.width/2,
            y: app.canvas.height/2
        };
    }
    
    function resetFixture() {
        if (_fixture) {
            _body.DestroyFixture(_fixture);
        }
        var fixtureDef = new b2FixtureDef();
        var shape = makeBoxShape(_fieldOfView.h, _fieldOfView.v, 0, 0, 0);
        fixtureDef.set_shape(shape);
        fixtureDef.set_density(0);
        fixtureDef.set_friction(0);
        fixtureDef.set_isSensor(true);
        _fixture = _body.CreateFixture(fixtureDef);
    }
}