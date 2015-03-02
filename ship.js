function PlasmaShip(x, y) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y);
    Ship.call(this, this.SPAWN_HEALTH, this.BULLET_FACTORY);
    AnimatedImage.call(this, this.props.sprite, this.props.frameCount, this.props.framesPerSecond);
    this.others.push(this);
    
    var fixtureDef = new b2FixtureDef();
    fixtureDef.set_shape(makeBoxShape(1/2, 1.1/2, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
}

function PowerShip(x, y) {
    this.init("POWER_SHIP", x, y);
    this.initAnimatedImage(app.cache["asset/PowerShip.png"], 6, 10);
    this.circleShape(5);
}

function SpreadShip(x, y) {
    this.init("SPREAD_SHIP", x, y);
    this.initAnimatedImage(app.cache["asset/SpreadShip.png"], 6, 10);
    this.circleShape(7.25);
}

function WaveShip() {
    this.init("WAVE_SHIP", x, y);
    this.initAnimatedImage(app.cache["asset/WaveShip.png"], 8, 10);
    this.circleShape(7.5);
}

function initShipPrototypes() {
    PlasmaShip.prototype = new ShipPrototype({
        typeName: "PLASMA_SHIP",
        hp: 50,
        bullet: PlasmaShot,
        sprite: app.cache["asset/PlasmaShip.png"],
        frameCount: 8,
        framesPerSecond: 10,
        topSpeed: 12
    });
    PowerShip.prototype = new ShipPrototype("Power Ship", 100, PowerShot);
    SpreadShip.prototype = new ShipPrototype("Spread Ship", 70, SpreadShot);
    WaveShip.prototype = new ShipPrototype("Wave Ship", 60, WaveShot);
}

function updateAiShip() {
    this.fireWeapon();
}



function Ship(hp, bulletFactory) {
    var _health = hp;
    function _fireWeapon(){
        if (!this.lastShotTime || app.now() - this.lastShot > this.fireRate) {
            //var bullet = new bulletFactory.create(this);
            this.lastShotTime = app.now();
        }
    }
    this.damage = function (object) {
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

function ShipPrototype(props) {
    this.topSpeed = props.topSpeed ? props.topSpeed : 150;
    this.props = props;
    var _init = function(x, y) {

    };
    
    Object.defineProperty(this, "init", {
        value: _init,
        writable: false,
        enumerable: false,
        configurable: false
    });
    
    Object.defineProperty(this, "SPAWN_HEALTH", {
        value: props.hp,
        writable: true,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "BULLET_FACTORY", {
        value: props.bulletFactory,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "others", {
        get: function() {
            return app.ships[this.TYPE];
        },
        enumerable: true,
        configurable: false
    });
}

Object.defineProperty(ShipPrototype.prototype, "DEFAULT_DENSITY", {
    value: 5,
    writable: true,
    enumerable: true,
    configurable: false
});