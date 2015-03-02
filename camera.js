function Camera() {
    GameType.call(this, "CAMERA");
    this.isRendered = false;
    var bodyDef = new b2BodyDef();
    bodyDef.set_type(b2_kinematicBody);
    //bodyDef.set_type(b2_dynamicBody);
    bodyDef.set_position(new b2Vec2(0, 0));
    SpaceObject.call(this, bodyDef);
    
    var _body = this.body;
    var _fixture = null;
    var _mToPx = 1/52;
    var _canvasOffset = null;
    var _centerCanvas = null;
    var _fieldOfView = null;
    
    var _resizeCanvas = (function () {
        resetCanvasCenterPoint();
        resetFOV();
        resetCanvasOffset();
        resetFixture();
    }).bind(this);
    _resizeCanvas();
    
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
    
    Object.defineProperty(this, "x", {
        get: function() {
            return _body.GetPosition().get_x();
        },
        set: function(newX) {
            var oldX = _body.GetPosition().get_x();
            _canvasOffset.x = _canvasOffset.x - (newX - oldX);
            _body.GetPosition().set_x(newX);
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(this, "y", {
        get: function() {
            return _body.GetPosition().get_y();
        },
        set: function(newY) {
            var oldY = _body.GetPosition().get_y();
            _canvasOffset.y = _canvasOffset.y + (newY - oldY);
            _body.GetPosition().set_y(newY);
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
    
    var _move = (function(x, y) {
        this.x = x;
        this.y = y;
    }).bind(this); 
    
    Object.defineProperty(this, "move", {
        value: _move,
        writable: false,
        configurable: false,
        enumerable: true
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
        }
    }
    
    function resetCanvasCenterPoint() {
        var pos = _body.GetPosition();
        _centerCanvas = {
            x: app.canvas.width/2,
            y: app.canvas.height/2
        }
    }
    
    function resetCanvasOffset() {
        var pos = _body.GetPosition();
        _canvasOffset = {
            x: app.canvas.width/2 - pos.get_x(),
            y: app.canvas.height/2 + pos.get_y()
        }
    }
    
    function resetFixture() {
        if (_fixture) {
            _body.DestroyFixture(_fixture);
        }
        var fixtureDef = new b2FixtureDef();
        var shape = makeBoxShape(_fieldOfView.h, _fieldOfView.v, 0, 0, 0)
        fixtureDef.set_shape(shape);
        fixtureDef.set_density(0);
        fixtureDef.set_friction(0);
        fixtureDef.set_isSensor(true);
        _fixture = _body.CreateFixture(fixtureDef);
    }
    
    function _worldPointFromPixelPoint(pixelPoint) {
        return {                
            x: (pixelPoint.x - _canvasOffset.x)/(1/_mToPx),
            y: (pixelPoint.y - (app.canvas.height - _canvasOffset.y))/(1/_mToPx)
        };
    }
}