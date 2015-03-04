function PlasmaChange(x, y) {
    GameType.call(this, "PLASMA_CHANGE");
    AnimatedImage.call(this, app.cache["asset/PlasmaChange.png"], 10, 10);
    Change.call(this, x, y);
}

function PowerChange(x, y) {
    GameType.call(this, "POWER_CHANGE");
    AnimatedImage.call(this, app.cache["asset/PowerChange.png"], 10, 10);
    Change.call(this, x, y);
}

function SpreadChange(x, y) {
    GameType.call(this, "SPREAD_CHANGE");
    AnimatedImage.call(this, app.cache["asset/SpreadChange.png"], 10, 10);
    Change.call(this, x, y);
}

function WaveChange(x, y) {
    GameType.call(this, "WAVE_CHANGE");
    AnimatedImage.call(this, app.cache["asset/WaveChange.png"], 10, 10);
    Change.call(this, x, y);
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
    
    var _updateFunc = function() {
        if (app.now() - this.CREATED_TIMESTAMP > this.TTL) {
            //app.removeBullet(this);
            //return;
        }
        /*
        // hit other ships or objects except ships of same type
        var list = this.body.GetContactList();
        while (list.e !== 0) {
            var contact = list.get_contact();
            if(contact.IsTouching()) {
                _handleSensorContact(contact.GetFixtureA().GetBody().actor, this);
                _handleSensorContact(contact.GetFixtureB().GetBody().actor, this);
            }
            list = list.get_next();
            
        }*/
        
    };
    this.update = _updateFunc.bind(this);
    
    this.contactCallback = (function(otherActor) {
            _handleSensorContact(otherActor, this);
    }).bind(this);
    
    function _handleSensorContact(gameObj, changeOrb) {
        if (gameObj == app.player) {
            //app.kill(this);
            //console.log("got changed!");
            //console.log(gameObj);
            //player._health = 0;
            //player.damage();
            //app.player = new PowerShip(app.player.x, app.player.y);
            
            //window.changePlayer("Plasma");
            //app.player = new WaveShip(0, 0);
            //app.player.update = updatePlayerShip;
            //_lastPlayer.update = function(){};
        }
        if (_isGameObjectHitable(gameObj, changeOrb)) {
            //if (gameObj.damage) {
                //gameObj.damage(bullet.ORIGIN);
                //app.removeBullet(bullet);
                //app.kill(changeOrb);
            //}
            //app.kill(this);    
        }
        
    }
    
    function _isGameObjectHitable(gameObj, changeOrb) {
        return !gameObj.isBullet && gameObj.TYPE !== app.camera.TYPE && !(gameObj.isDead);
        //return gameObj.TYPE !== changeOrb.TYPE && 
          //  !gameObj.isBullet && gameObj.TYPE !== app.camera.TYPE && !(gameObj.isDead);
    }   
}

function ChangePrototype(){}

Object.defineProperty(ChangePrototype.prototype, "DEFAULT_DENSITY", {
    value: 5,
    writable: true,
    enumerable: true,
    configurable: false
});
