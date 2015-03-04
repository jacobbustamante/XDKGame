function Camera() {
    GameType.call(this, "CAMERA");
    this.isRendered = false;
    var bodyDef = new b2BodyDef();
    bodyDef.set_type(b2_dynamicBody);
    bodyDef.set_position(new b2Vec2(0, 0));
    SpaceObject.call(this, bodyDef);
    
    var _body = this.body;
    var _fixture = null;
    var _PTM = app.defaultPixelsPerMeter*.75;
    var _centerCanvas = null;
    var _fieldOfView = null;
    
    this.minZoom = _PTM*2;//_mToPx/0.75;
    this.maxZoom = _PTM/2;//_mToPx/2;
    this.defaultZoom = _PTM;
    
    var _cam = this;
    
    var _worldPointFromPixelPoint = function(pixelPoint) {
        var dyScreen = (app.canvas.height/2 - pixelPoint.y)/_PTM;
        var dxScreen = (pixelPoint.x - app.canvas.width/2)/_PTM;
        var d = Math.sqrt(dyScreen*dyScreen + dxScreen*dxScreen);
        var phi = Math.atan2(dyScreen, dxScreen) - _body.GetAngle();
        var pos = _body.GetPosition();
        return {
            x: pos.get_x() + d*Math.cos(phi),
            y: pos.get_y() + d*Math.sin(phi)
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
        resetFixture();
    }).bind(this);
    _resizeCanvas();
    
     
    
    Object.defineProperty(this, "move", {
        value: _move,
        writable: false,
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "center", {
        get: function() {
            return { x: _centerCanvas.x, y: _centerCanvas.y };
        },
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "x", {
        get: function() {
            if (_followPlayer) {
                return app.player.body.GetPosition().get_x();
            }
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
            if (_followPlayer) {
                app.player.body.GetPosition().get_y();
            }
            return _body.GetPosition().get_y();
        },
        set: function(newY) {
            _move(_body.GetPosition().get_x(), newY);
        },
        enumerable: true,
        configurable: true
    });
    /*
    
    Object.defineProperty(this, "vx", {
        get: function() {
            return _body.GetLinearVelocity().get_x();
        },
        set: function(newVX) {
            var v = new b2Vec2(newVX, _body.GetLinearVelocity().get_y())
            _body.SetLinearVelocity(v);
        },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "vy", {
        get: function() {
            return _body.GetLinearVelocity().get_y();
        },
        set: function(newVY) {
            var v = new b2Vec2(_body.GetLinearVelocity().get_x(), newVY);
            _body.SetLinearVelocity(v);
        },
        enumerable: true,
        configurable: false
    });
    */
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