function initBulletConstructors() {
    window.PlasmaShot = Bullet.bind(null, "Plasma Shot", app.cache["asset/PlasmaShot.png"], 5);
    window.PowerShot = Bullet.bind(null, "Power Shot", app.cache["asset/PowerShot.png"], 20);
    window.SpreadShot = Bullet.bind(null, "Spread Shot", app.cache["asset/SpreadShot.png"], 15);
    window.WaveShot = Bullet.bind(null, "Wave Shot", app.cache["asset/WaveShot.png"], 30);
}

function Bullet(bulletType, spriteSheet, attack, velocity, originShip) {
    SpaceObject.call(this, originShip.x, originShip.y);
    
    this.initAnimatedImage(spriteSheet, 3, 60);
    this.attack = attack;
    this.velocity = velocity;
    this.position = originShip.position;
    
    Object.defineProperty(this, "isBullet", {
        value: true,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "TYPE", {
        value: bulletType,
        writable: false,
        enumerable: true,
        configurable: false
    });
 
    Object.defineProperty(this, "ORIGIN", {
        value: originShip,
        writable: false,
        enumerable: true,
        configurable: false
    });

    
    function _draw() {
        this.drawSprite(this.x, this.y);
    }
    
    this.update = _update.bind(this);
    this.render = _draw.bind(this);
    this.getVelocity = _getVelocity.bind(this);
    this.updatePosition = _updatePosition.bind(this);
    
}

function BulletPrototype(){}

Object.defineProperty(BulletPrototype.prototype, "DEFAULT_DENSITY", {
    value: 5,
    writable: true,
    enumerable: true,
    configurable: false
});
