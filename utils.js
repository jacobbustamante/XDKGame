(using.bind(window))(Box2D);

function GameType(typeName) {
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

function SpaceObject(x, y) {
    var bodyDef = new b2BodyDef();
    bodyDef.set_type(b2_dynamicBody);
    bodyDef.set_position(new b2Vec2(guaranteeNumber(x), guaranteeNumber(y)));
    Object.defineProperty(this, "body", {
        value: app.world.CreateBody(bodyDef),
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    var _body = this.body;
    function _getPos() {
        return _body.GetPosition();
    }
    
    Object.defineProperty(this, "theta", {
        get: function(){ return _body.GetAngle(); },
        set: function(t){ _body.SetTransform(new b2Vec2(_body.GetPosition().get_x(),_body.GetPosition().get_y()), t); },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "x", {
        get: function(){return _getPos().get_x()},
        set: function(n){ _getPos().set_x(n); },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "y", {
        get: function(){ return _getPos().get_y(); },
        set: function(n){ _getPos().set_y(n); },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "vx", {
        get: function(){ return _body.GetLinearVelocity().get_x(); },
        set: function(n){ _body.SetLinearVelocity(new b2Vec2(n, _body.GetLinearVelocity().get_y())); },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "vy", {
        get: function(){ return _body.GetLinearVelocity().get_y(); },
        set: function(n){ _body.SetLinearVelocity(new b2Vec2(_body.GetLinearVelocity().get_x(),n)); },
        enumerable: true,
        configurable: false
    });
    
}
