function initAi() {
    app.ai = {};
    initVisionField();
    function initVisionField() {
        var visionRange = 5; //meters
        var visionFOV = 100; //degrees
        var theta = ((180-visionFOV)/2)*(Math.PI/180);
        var x = visionRange*Math.cos(theta);
        var y = visionRange*Math.sin(theta);
        
        var visionShape = createPolygonShape([new b2Vec2(0,0),new b2Vec2(x,y),new b2Vec2(-x,y)]);
        var fixtureDef = new b2FixtureDef();
        fixtureDef.set_shape(visionShape);
        fixtureDef.set_density(0);
        fixtureDef.set_friction(0);
        fixtureDef.set_isSensor(true);
        app.ai.visionFieldFixtureDef = fixtureDef;
    }
}

function ShipAi() {
    this.enemyTargets = [];
    this.friendTargets = [];
    this.searchForEnemy = searchForEnemy.bind(this);
    this.aimAndFireAtEnemy = aimAndFireAtEnemy(this);
    this.beginSensorCallback = onSense.bind(this);
    this.endSensorCallback = onEndSense.bind(this);
}

function onSense(otherActor) {
    if (otherActor.TYPE === "WALL") {
        if (this.isVerticle) {
            if (otherActor.x > this.x) {
                //this.vx =
            }
        }
        else {
            
        }
        
    }
    if (otherActor.isShip && !otherActor.isDead) {
        if (otherActor.TYPE !== this.TYPE) {
            this.enemyTargets.push(otherActor);
            this.update = (function(){
                aimAndFireAtEnemy.call(this, otherActor);
                if (this.health > 20)
                    followEnemy.call(this);
                else
                    fleeEnemy.call(this);
            }).bind(this);
        }
        else {
            this.FRIEND_DETECTED = true;
        }
    }
}

function onEndSense(otherActor) {
    if (otherActor.isShip && !otherActor.isDead) {
        if (otherActor.TYPE !== this.TYPE) {
            this.enemyTargets.push(otherActor);
            this.update = (function(){
                aimAndFireAtEnemy.call(this, otherActor);
                if (this.health > 20)
                    followEnemy.call(this);
                else
                    fleeEnemy.call(this);
            }).bind(this);
        }
        else {
            this.FRIEND_DETECTED = true;
        }
    }
}

function searchForEnemy() {
    this.ai.SEARCH_FOR_ENEMY = true;
    if (!this.visionSensor) {
        this.visionSensor = this.body.CreateFixture( app.ai.visionFieldFixtureDef );
    }
}

function followEnemy() {
    
}

function fleeEnemy() {
    
}

function aimAndFireAtEnemy(otherShip) {
    if (!this.ENEMY_DETECTED) {
        this.update = searchForEnemy.bind(this);
        return;
    }
    if (!this.ANGLE_THRESHOLD) {
        this.ANGLE_THRESHOLD = 5*Math.PI/180; //5 degrees
    }
    if (!this.IDEAL_ANGLE_VELOCITY) {
        this.IDEAL_ANGLE_VELOCITY = 15*Math.PI/180; //15 degrees per second
    }
    var deltaAngle = otherShip.angle - this.angle;
    var idealAngularVel = Math.sign(deltaAngle)*this.IDEAL_ANGLE_VELOCITY;
    
    if (deltaAngle < this.ANGLE_THRESHOLD) {
        this.body.SetAngularVelocity(0.05*this.body.GetAngularVelocity());
        this.fireWeapon();
    }
    else if (this.body.GetAngularVelocity() - idealAngularVel > this.ANGLE_THRESHOLD) {
        this.body.SetAngularVelocity(idealAngularVel*(1 - Math.random()*0.15));
    }
}