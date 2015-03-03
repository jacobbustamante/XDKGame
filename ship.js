function PlasmaShip(x, y) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y);
    Ship.call(this, this.SPAWN_HEALTH, this.BULLET_FACTORY);
    AnimatedImage.call(this, this.props.sprite, this.props.frameCount, this.props.framesPerSecond);
    this.others.push(this);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
}

function PowerShip(x, y) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y);
    Ship.call(this, this.SPAWN_HEALTH, this.BULLET_FACTORY);
    AnimatedImage.call(this, this.props.sprite, this.props.frameCount, this.props.framesPerSecond);
    this.others.push(this);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
}

function SpreadShip(x, y) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y);
    Ship.call(this, this.SPAWN_HEALTH, this.BULLET_FACTORY);
    AnimatedImage.call(this, this.props.sprite, this.props.frameCount, this.props.framesPerSecond);
    this.others.push(this);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
}
function WaveShip(x, y) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y);
    Ship.call(this, this.SPAWN_HEALTH, this.BULLET_FACTORY);
    AnimatedImage.call(this, this.props.sprite, this.props.frameCount, this.props.framesPerSecond);
    this.others.push(this);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
}



function initShipPrototypes() {
    PlasmaShip.prototype = new ShipPrototype({
        typeName: "PLASMA_SHIP",
        hp: 50,
        bullet: PlasmaShot,
        sprite: app.cache["asset/PlasmaShip.png"],
        frameCount: 8,
        framesPerSecond: 10,
        topSpeed: 12,
        bulletFactory: function(origin) {
            new PlasmaShot(origin);
            app.cache["asset/PlasmaShotSound.wav"].play();
        }
    });
    PowerShip.prototype = new ShipPrototype({
        typeName: "POWER_SHIP",
        hp: 100,
        bullet: PowerShot,
        sprite: app.cache["asset/PowerShip.png"],
        frameCount: 6,
        framesPerSecond: 10,
        topSpeed: 12
    });
    SpreadShip.prototype = new ShipPrototype({
        typeName: "SPREAD_SHIP",
        hp: 70,
        bullet: SpreadShot,
        sprite: app.cache["asset/SpreadShip.png"],
        frameCount: 6,
        framesPerSecond: 10,
        topSpeed: 12
    });
    WaveShip.prototype = new ShipPrototype({
        typeName: "WAVE_SHIP",
        hp: 60,
        bullet: WaveShot,
        sprite: app.cache["asset/WaveShip.png"],
        frameCount: 8,
        framesPerSecond: 10,
        topSpeed: 12
    });

}

function updateAiShip() {
    this.fireWeapon();
}



function Ship(hp, bulletFactory) {
    var _health = hp;
    function _fireWeapon(){
        if (!this.lastShotTime || app.now() - this.lastShotTime > this.fireRate) {
            this.BULLET_FACTORY(this);
            this.lastShotTime = app.now();
        }
    }
    this.damage = function (object) {
        if (--_health <= 0) {
            app.cache["asset/DestroyShip.wav"].play();
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
    this.fireRate = 500;
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