function PlasmaShot(origin) {
    GameType.call(this, "PLASMA_SHOT", false);
    AnimatedImage.call(this, app.cache["asset/PlasmaShot.png"], 3, 10);
    Bullet.call(this, origin);
}

function PowerShot(origin) {
    GameType.call(this, "POWER_SHOT", false);
    AnimatedImage.call(this, app.cache["asset/PowerShot.png"], 3, 10);
    Bullet.call(this, origin);
}

function SpreadShot (origin) {
    GameType.call(this, "SPREAD_SHOT", false);
    AnimatedImage.call(this, app.cache["asset/SpreadShot.png"], 3, 10);
    Bullet.call(this, origin);
}

function WaveShot(origin) {
    GameType.call(this, "WAVE_SHOT", false);
    AnimatedImage.call(this, app.cache["asset/WaveShot.png"], 3, 10);
    Bullet.call(this, origin);
}

function Bullet(origin) {
    app.bullets.push(this);
    var bodyDef = new b2BodyDef();
    bodyDef.set_type(b2_dynamicBody);
    bodyDef.set_bullet(false);
    bodyDef.set_position(new b2Vec2(origin.x, origin.y));
    SpaceObject.call(this, origin.x, origin.y);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(0);
    fixtureDef.set_friction(0);
    fixtureDef.set_isSensor(true);
    this.body.CreateFixture(fixtureDef);
    this.topSpeed = 40;
    this.angle = origin.angle;
    var vec = new b2Vec2(-Math.sin(this.angle), Math.cos(this.angle));
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
    
    Object.defineProperty(this, "TTL", {
        value: 2000,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "CREATED_TIMESTAMP", {
        value: app.now(),
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
        if (app.now() - this.CREATED_TIMESTAMP > this.TTL) {
            app.removeBullet(this);
            return;
        }
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
        
    };
    this.update = _updateFunc.bind(this);
    
    function _handleSensorContact(gameObj, bullet) {
        if (gameObj === bullet) {
            return;
        }
        if (_isGameObjectHitable(gameObj, bullet.ORIGIN)) {
            if (gameObj.damage) {
                gameObj.damage(bullet.ORIGIN);
                app.removeBullet(bullet);
            }
        }
    }
    
    function _isGameObjectHitable(gameObj, originShip) {
        return gameObj.TYPE !== originShip.TYPE && 
            !gameObj.isBullet && gameObj.TYPE !== app.camera.TYPE;
    }   
}

function BulletPrototype(){}

Object.defineProperty(BulletPrototype.prototype, "DEFAULT_DENSITY", {
    value: 5,
    writable: true,
    enumerable: true,
    configurable: false
});
