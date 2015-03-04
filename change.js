function PlasmaChange(x, y) {
    GameType.call(this, "PLASMA_CHANGE");
    AnimatedImage.call(this, app.cache["asset/PlasmaChange.png"], 10, 10);
    Change.call(this, x, y);
    this.newShip = function(x,y){return new PlasmaShip(x,y);}
}

function PowerChange(x, y) {
    GameType.call(this, "POWER_CHANGE");
    AnimatedImage.call(this, app.cache["asset/PowerChange.png"], 10, 10);
    Change.call(this, x, y);
    this.newShip = function(x,y){return new PowerShip(x,y);}
}

function SpreadChange(x, y) {
    GameType.call(this, "SPREAD_CHANGE");
    AnimatedImage.call(this, app.cache["asset/SpreadChange.png"], 10, 10);
    Change.call(this, x, y);
    this.newShip = function(x,y){return new SpreadShip(x,y);}
}

function WaveChange(x, y) {
    GameType.call(this, "WAVE_CHANGE");
    AnimatedImage.call(this, app.cache["asset/WaveChange.png"], 10, 10);
    Change.call(this, x, y);
    this.newShip = function(x,y){return new WaveShip(x,y);}
}

function Change(x, y) {
    
    var bodyDef = new b2BodyDef();
    bodyDef.set_type(b2_dynamicBody);
    bodyDef.set_bullet(false);
    bodyDef.set_position(new b2Vec2(x, y));
    SpaceObject.call(this, x, y);
    
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    fixtureDef.set_isSensor(true);
    this.body.CreateFixture(fixtureDef);
    
    this.topSpeed = 0;
    this.angle = 0;
    var vec = new b2Vec2(-Math.sin(this.angle), Math.cos(this.angle));
    vec.Normalize();
    vec.op_mul(this.topSpeed);
    this.vx = vec.get_x();
    this.vy = vec.get_y();
    

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
    
    Object.defineProperty(this, "isChange", {
        value: true,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "newShip", {
        value: function(x,y){return new PowerShip(x,y);},
        writable: true,
        enumerable: true,
        configurable: false
    });
    
    var collided = false;
    
    var _updateFunc = function() {
        if (app.now() - this.CREATED_TIMESTAMP > this.TTL) {
            this.update = function(){
                app.kill(this);
                this.update = function(){};
            };
            return;
        }
        else if (collided)
        {
            this.update = (function(){
                app.cache["asset/ControlNewShip.wav"].play();
                app.player.onDeath();
                app.player = this.newShip(this.x, this.y);
                app.player.update = updatePlayerShip;
                this.update = function() {
                    app.kill(this);
                    this.update = function(){};
                };
            }).bind(this);
        }
    };
    
    this.contactCallback = (function(otherActor) {
            _handleSensorContact(otherActor, this);
    }).bind(this);
    
    function _handleSensorContact(gameObj, changeOrb) {
        if (gameObj == app.player) {
            collided=true;
        }
        if (_isGameObjectHitable(gameObj, changeOrb)) {

        }
        
    }
    
    function _isGameObjectHitable(gameObj, changeOrb) {
        return !gameObj.isBullet && gameObj.TYPE !== app.camera.TYPE && !(gameObj.isDead);  
    }   
    
    this.update = _updateFunc.bind(this);
}

function ChangePrototype(){}

Object.defineProperty(ChangePrototype.prototype, "DEFAULT_DENSITY", {
    value: 5,
    writable: true,
    enumerable: true,
    configurable: false
});
