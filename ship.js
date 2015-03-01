function PlasmaShip(x, y) {
    this.init(x,y);
    this.initAnimatedImage(app.cache["asset/PlasmaShip.png"], 8, 10);
    this.circleShape(26);
}

function PowerShip(x, y) {
    this.init(x,y);
    this.initAnimatedImage(app.cache["asset/PowerShip.png"], 6, 10);
    this.circleShape(20);
}

function SpreadShip(x, y) {
    this.init(x,y);
    this.initAnimatedImage(app.cache["asset/SpreadShip.png"], 6, 10);
    this.circleShape(29);
}

function WaveShip() {
    this.init(x,y);
    this.initAnimatedImage(app.cache["asset/WaveShip.png"], 8, 10);
    this.circleShape(30);
}

function initShipPrototypes() {
    PlasmaShip.prototype = new ShipPrototype("Plasma Ship", 50, PlasmaShot);
    PowerShip.prototype = new ShipPrototype("Power Ship", 100, PowerShot);
    SpreadShip.prototype = new ShipPrototype("Spread Ship", 70, SpreadShot);
    WaveShip.prototype = new ShipPrototype("Wave Ship", 60, WaveShot);
}

function updateAiShip() {
    this.fireWeapon();
}

function updatePlayerShip() {
    
}

function SpaceObject(x, y) {
    AnimatedImage.call(this);
    var DEFAULT_DENSITY = 5;
    
    var _boxShape = (function(w, h, d) {
        if (d === undefined) {
            d = DEFAULT_DENSITY;
        }
        var shape = new b2PolygonShape();
        shape.SetAsBox(w, h);
        this.body.CreateFixture(shape, d);
    }).bind(this);
    
    var _circleShape = (function(r, d) {
        if (d === undefined) {
            d = DEFAULT_DENSITY;
        }
        var shape = new b2CircleShape();
        shape.set_m_radius(r);
        this.body.CreateFixture(shape, d);
    }).bind(this);
    
    var _draw = (function() {
        this.drawSprite(this.x, this.y);
    }).bind(this);
    
    if (x === undefined) {
        x = 0;
    }    
    if (y === undefined) {
        y = 0;
    }
    var bodyDef = new Box2D.b2BodyDef();
    bodyDef.set_type(Box2D.b2_dynamicBody);
    bodyDef.set_position(new b2Vec2(x, y));
    
    Object.defineProperty(this, "body", {
        value: app.world.CreateBody(bodyDef),
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "boxShape", {
        value: _boxShape,
        writable: false,
        enumerable: false,
        configurable: false    
    });
    
    Object.defineProperty(this, "circleShape", {
        value: _circleShape,
        writable: false,
        enumerable: false,
        configurable: false    
    });
    
    Object.defineProperty(this, "render", {
        value: _draw,
        writable: true,
        enumerable: true,
        configurable: false    
    });
}

function Ship(hp, bulletFactory, x, y) {
    SpaceObject.call(this, x, y);
    var _health = hp;
    
    function _fireWeapon(){
        if (!this.lastShotTime || app.now() - this.lastShot > this.fireRate) {
            //var bullet = new bulletFactory.create(this);
            this.lastShotTime = app.now();
        }
    }
    
    function _takeDamage(object) {
        if (--_health <= 0) {
            this.onDeath();
        }
    }
    
    function _explode() {
        
    }
    
    Object.defineProperty(this, "health", {
        get: function() { return _health; },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "isShip", {
        value: true,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    this.lastShotTime = null;
    this.fireRate = 50;
    this.update = updateAiShip.bind(this);
    this.fireWeapon = _fireWeapon.bind(this);
    this.onDeath = _explode.bind(this);
}

function ShipPrototype(name, hp, bulletFactory) {
    var _init = (function(x,y) {
        Ship.call(this, this.SPAWN_HEALTH, this.BULLET_FACTORY, x, y);
        this.others.push(this);
    }).bind(this);
    
    Object.defineProperty(this, "init", {
        value: _init,
        writable: false,
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(this, "SHIP_TYPE", {
        value: name,
        writable: false,
        enumerable: true,
        configurable: false
    });
    Object.defineProperty(this, "SPAWN_HEALTH", {
        value: hp,
        writable: true,
        enumerable: true,
        configurable: false
    });
    Object.defineProperty(this, "BULLET_FACTORY", {
        value: bulletFactory,
        writable: false,
        enumerable: true,
        configurable: false
    });
    Object.defineProperty(this, "others", {
        get: function() {
            return app.ships[this.SHIP_TYPE];
        },
        enumerable: true,
        configurable: false
    });
}
