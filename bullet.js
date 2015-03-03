function PlasmaShot(origin) {
    GameType.call(this, "PLASMA_SHOT", false);
    AnimatedImage.call(this, app.cache["asset/PlasmaShot.png"], 3, 10);
    app.bullets.push(this);
    var bodydef = new b2BodyDef();
    bodyDef.set_type(b2_dynamicBody);
    bodyDef.set_isbullet(true);
    bodyDef.set_position(new b2Vec2(origin.x, origin.y));
    SpaceObject.call(this, origin.x, origin.y);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_shape(shape);
    fixtureDef.set_density(0);
    fixtureDef.set_friction(0);
    fixtureDef.set_isSensor(true);
    this.body.CreateFixture(fixtureDef);
    this.topSpeed = 20;
    this.angle = origin.angle;
    var vec = new b2Vec2(Math.sin(this.angle), Math.cos(this.angle));
    vec.Normalize();
    vec.op_mul(this.topSpeed);
    this.vx = vec.get_x();
    this.vy = vec.get_y();
    
    Object.defineProperty(this, "ORIGIN", {
        value: origin,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "isBullet", {
        value: true,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    var _updateFunc = function() {
        // hit other ships or objects except ships of same type
        var list = this.body.GetContactList();
        while (list.e !== 0) {
            var contact = list.get_contact();
            if(contact.IsTouching()) {
                _handleSensorContact(contact.GetFixtureA().GetBody().actor, this);
                _handleSensorContact(contact.GetFixtureB().GetBody().actor, this);
            }
            list = list.get_next();
        }
        
    }
    this.update = _updateFunc.bind(this);
    
    function _handleSensorContact(gameObj, bullet) {
        if (gameObj === bullet) {
            return;
        }
        if (_isGameObjectHitable(gameObj, bullet.ORIGIN)) {
            if (gameObj.damage) {
                gameObj.damage();
                app.removeBullet(bullet);
            }
        }
    }
    
    function _isGameObjectHitable(gameObj, originShip) {
        return gameObj.TYPE !== originShip.TYPE && 
            !gameObj.isBullet && gameObj.TYPE !== app.camera.TYPE;
    }
}

function initBulletConstructors() {
    /*
    //window. = Bullet.bind(null, "Plasma Shot", , 5);
    */
    window.PowerShot = Bullet.bind(null, "Power Shot", app.cache["asset/PowerShot.png"], 20);
    window.SpreadShot = Bullet.bind(null, "Spread Shot", app.cache["asset/SpreadShot.png"], 15);
    window.WaveShot = Bullet.bind(null, "Wave Shot", app.cache["asset/WaveShot.png"], 30);
    
}

function Bullet(bulletType, spriteSheet, attack, velocity, originShip) {
    //GameType..call(this, )
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
