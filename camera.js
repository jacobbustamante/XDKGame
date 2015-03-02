function Camera() {
    GameType.call(this, "CAMERA");
    this.isRendered = false;
    var bodyDef = new b2BodyDef();
    bodyDef.set_type(b2_dynamicBody);
    bodyDef.set_position(new b2Vec2(0, 0));
    SpaceObject.call(this, bodyDef);
    
    var _body = this.body;
    var _fixture = null;
    var _mToPx = 1/52;
    var _canvasOffset = null;
    var _centerCanvas = null;
    var _fieldOfView = null;
    
    function _worldPointFromPixelPoint(pixelPoint) {
        return {                
            x: (pixelPoint.x - _canvasOffset.x)/(1/_mToPx),
            y: (pixelPoint.y - (app.canvas.height - _canvasOffset.y))/(1/_mToPx)
        };
    }
    
    function _move(x, y) {
        var pos = _worldPointFromPixelPoint(_centerCanvas);
        _body.GetPosition().set_x(x);
        _body.GetPosition().set_y(y);
        var destX = x - pos.x;
        var destY = y - pos.y;
        _canvasOffset.x -= destX * (1/_mToPx);
        _canvasOffset.y += destY * (1/_mToPx);
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
        },
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "offsetY", {
        get: function() {
            return _canvasOffset.y;
        },
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "MetersToPixels", {
        get: function() {
            return _mToPx;
        },
        set: function(scale) {
            var camPos = _worldPointFromPixelPoint(_centerCanvas);
            _mToPx = scale;
            _resizeCanvas();
            _move(camPos.x, camPos.y);
        },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "PixelsToMeters", {
        get: function() {
            return 1/_mToPx;
        },
        set: function(scale) {
            var camPos = _worldPointFromPixelPoint(_centerCanvas);
            _mToPx = 1/scale;
            _resizeCanvas();
            _move(camPos.x, camPos.y);
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
    
    function resetFOV() {
        _fieldOfView = {
            h: app.canvas.width/_mToPx,
            v: app.canvas.height/_mToPx
        };
    }
    
    function resetCanvasCenterPoint() {
        var pos = _body.GetPosition();
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