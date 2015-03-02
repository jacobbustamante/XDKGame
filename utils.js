(using.bind(window))(Box2D);

function GameType(typeName) {
    this.update = function(){};
    Object.defineProperty(this, "TYPE", {
        value: typeName,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "TYPE_HASH", {
        value: hashString(typeName),
        writable: false,
        enumerable: true,
        configurable: false
    });
    app.actors.push(this);
}



function hashString(s) {
    var h = 0, i, c, len;
    if (s.length == 0)
        return h;
    for (i = 0, len = s.length; i < len; i++) {
        c   = s.charCodeAt(i);
        h  = ((h << 5) - h) + c;
        h = h | 0; // convert to int32
    }
    return h;
}

function guaranteeNumber(n, otherwise) {
    return !isNaN(parseFloat(n)) && isFinite(n) ? parseFloat(n) : (otherwise | 0);
}

function makeBoxShape(width, height, centerX, centerY, theta) {
    var shape = new b2PolygonShape();
    shape.SetAsBox(width, height, new b2Vec2(guaranteeNumber(centerX), guaranteeNumber(centerY)), guaranteeNumber(theta));
    return shape;
};
    
function makeCircleShape(r, x, y) {
    var shape = new b2CircleShape();
    shape.set_m_radius(r);
    shape.set_m_p(new b2Vec2(guaranteeNumber(x), guaranteeNumber(y)));
    return shape;
};

function windowCoordinatesToMathCoordinates(windowX, windowY) {
    var canvasBounds = app.canvas.getBoundingClientRect();
    return {
        x: windowX - canvasBounds.left, 
        y: app.canvas.height - (windowY - canvasBounds.top)
    };
}

function SpaceObject() {
    if (arguments.length == 2) {
        var bodyDef = new b2BodyDef();
        var x = guaranteeNumber(arguments[0], 0);
        var y = guaranteeNumber(arguments[1], 0)
        bodyDef.set_type(b2_dynamicBody);
        bodyDef.set_position(new b2Vec2(x, y));
        Object.defineProperty(this, "body", {
            value: app.world.CreateBody(bodyDef),
            writable: false,
            enumerable: true,
            configurable: true
        });
    }
    else if (arguments.length == 1) {
        Object.defineProperty(this, "body", {
            value: app.world.CreateBody(arguments[0]),
            writable: false,
            enumerable: true,
            configurable: true
        });
    }
    else {
        var bodyDef = new b2BodyDef();
        bodyDef.set_type(b2_dynamicBody);
        bodyDef.set_position(new b2Vec2(0, 0));
        Object.defineProperty(this, "body", {
            value: app.world.CreateBody(bodyDef),
            writable: false,
            enumerable: true,
            configurable: true
        });
    }
    this.body.actor = this;
    var _body = this.body;
    
    Object.defineProperty(this, "angle", {
        get: function() {
            return _body.GetAngle();
        },
        set: function(rotation) {
            var pos = _body.GetPosition();
            _body.SetTransform(pos, rotation);
        },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "x", {
        get: function() {
            return _body.GetPosition().get_x();
        },
        set: function(newX) {
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
            _body.GetPosition().set_y(newY);
        },
        enumerable: true,
        configurable: true
    });
    
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
    
}
