function initAi() {
    app.ai = {};
    app.radiansToDegrees = function(a){ return a*180/Math.PI; };
    app.degreesToRadians = function(a){ return a*Math.PI/180; };
    initVisionField();
    initProximityField();
    function initVisionField() {
        var visionRange = 16; //meters
        var visionFOV = 100; //degrees
        var theta = app.degreesToRadians((180-visionFOV)/2);
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
    
    function initProximityField() {
        var proximityShape = makeCircleShape(4.5, 0, 0);
        var fixtureDef = new b2FixtureDef();
        fixtureDef.set_shape(proximityShape);
        fixtureDef.set_density(0);
        fixtureDef.set_friction(0);
        fixtureDef.set_isSensor(true);
        app.ai.proximityFieldFixtureDef = fixtureDef;
    }
}

function ShipAi() {
    this.MIN_DISTANCE_THRESHOLD = 0.25;
    this.MIN_ANGLE_THRESHOLD = app.degreesToRadians(5);
    this.IDEAL_ANGULAR_VELOCITY = app.degreesToRadians(180);
    this.MIN_WALL_DISTANCE = 1.5;
    this.AI_LEADER = Math.sign(app.genNum(-1, 1)) > 0;
    
    this.FOLLOW_OFFSET = {
        x: Math.sign(app.genNum(-1, 1)) * app.genNum(3, 6),
        y: Math.sign(app.genNum(-1, 1)) * app.genNum(3, 6)
    };
    
    
    this.enemyTargets = [];
    this.friendTargets = [];
    this.wallTargets = [];
    
    this.navTarget = null;
    this.aimTarget = null;
    
    this.searchMap = searchMap.bind(this);
    this.aimAtTarget = aimAtTarget.bind(this);
    this.moveToNavTarget = moveToNavTarget.bind(this); 
    this.beginSensorCallback = onSense.bind(this);
    this.endSensorCallback = onEndSense.bind(this);
    this.followShip = followShip.bind(this);
    this.updateAi = updateAi.bind(this);
    this.visionSensor = this.body.CreateFixture(app.ai.visionFieldFixtureDef);
    this.proximitySensor = this.body.CreateFixture(app.ai.proximityFieldFixtureDef);
    
    function onSense(otherActor) {
        if (otherActor.TYPE === "WALL") {
            this.wallTargets.push(otherActor);
        }
        if (otherActor.isShip && !otherActor.isDead) {
            if (otherActor.TYPE !== this.TYPE) {
                this.enemyTargets.push(otherActor);
            }
            else {
                this.friendTargets.push(otherActor);
            }
        }
    }

    function onEndSense(otherActor) {
        if (otherActor.TYPE === "WALL") {
            removeFromArray(this.wallTargets, otherActor);
        }
        if (otherActor.isShip) {
            if (otherActor.TYPE !== this.TYPE) {
                removeFromArray(this.enemyTargets, otherActor);
            }
            else {
                removeFromArray(this.friendTargets, otherActor);
            }
        }
    }
    
}


    
function avoidWall(wall) {
    
    this.navTaget = app.level.randomPos();
    /*
    if (wall.isVerticle) {
        var dx = Math.abs(wall.x) - Math.abs(this.navTaget.x);
        if (dx < this.MIN_WALL_DISTANCE) {
            var idealNavX = -Math.sign(wall.x)*2*this.MIN_WALL_DISTANCE;
            this.navTarget.x = idealNavX*(1 + (Math.random()*0.40 - 0.20));
        }
    }
    else {
        var dy = Math.abs(wall.y) - Math.abs(this.navTaget.y);
        if (dy < this.MIN_WALL_DISTANCE) {
            var idealNavY = -Math.sign(wall.y)*2*this.MIN_WALL_DISTANCE;
            this.navTarget.y = idealNavY*(1 + (Math.random()*0.40 - 0.20));
        }
    }
    */
}



function searchMap() {
    this.moveToNavTarget();
    this.aimTarget = this.navTarget;
    this.aimAtTarget();
}

function updateAi() {
     while (this.friendTargets.length !== 0 && (this.friendTargets[0].isDead || !this.friendTargets[0].AI_LEADER || this.friendTargets[0] !== app.player)) {
        this.friendTargets.shift();
    }
    if (this.friendTargets.length !== 0 && !this.friendTargets[0].AI_LEADER) {
        this.followShip(this.friendTargets[0]);
        while (this.enemyTargets.length !== 0 && this.enemyTargets[0].isDead) {
            this.enemyTargets.shift();
        }
        if (this.enemyTargets.length !== 0) {
            this.aimTarget = {x:this.enemyTargets[0].x, y:this.enemyTargets[0].y}
            this.fireWeapon();
        }
        else {
            this.aimTarget = this.navTarget;
            this.aimAtTarget();
        }
    }
    else if (this.enemyTargets.length !== 0) {
        while (this.enemyTargets.length !== 0 && this.enemyTargets[0].isDead) {
            this.enemyTargets.shift();
        }
        if (this.enemyTargets.length !== 0) {
            this.followShip(this.enemyTargets[0]);
            this.aimTarget = {x:this.enemyTargets[0].x, y:this.enemyTargets[0].y}
            this.aimAtTarget();
            this.fireWeapon();
        }
    } else if (this.wallTargets.length !== 0) {
        this.navTaget = {x: 0, y: 0};
        this.moveToNavTarget();
        this.aimTarget = this.navTarget;
        this.aimAtTarget();
    }
    else {
        this.moveToNavTarget();
        this.aimTarget = this.navTarget;
        this.aimAtTarget();
    }
}

function engageEnemy() {

}

function followShip(other) {
    if (!other.isDead) {
        if (!this.navTarget)
            this.navTarget = {};
        this.navTarget.x = other.x + this.FOLLOW_OFFSET.x;
        this.navTarget.y = other.y + this.FOLLOW_OFFSET.y;
    }
    return moveToNavTarget();
}

function moveToNavTarget() {
    if (!this.navTarget)
        this.navTarget = app.level.randomPos();
    
    var dx = this.x - this.navTarget.x;
    var dy = this.y - this.navTarget.y;
    var d = Math.sqrt(dx*dx + dy*dy);
    
    if (d > this.MIN_DISTANCE_THRESHOLD) {
        var angle = Math.atan2(this.x - this.navTarget.x, this.navTarget.y - this.y);
        var velX = -Math.sin(angle);
        var velY = Math.cos(angle);
        var vec = new b2Vec2(velX, velY);
        vec.Normalize();
        vec.op_mul(this.topSpeed);
        this.vx = vec.get_x();
        this.vy = vec.get_y();
    }
    else {   
        this.vx = 0;
        this.vy = 0;
        this.navTarget = null;
    }
    return d;
}

function aimAtTarget() {
    if (!this.aimTarget)
        this.aimTarget = app.level.randomPos();
    var destAngle = Math.atan2(this.x - this.aimTarget.x, this.aimTarget.y - this.y);
    var deltaAngle = destAngle - this.angle;
    deltaAngle = Math.round(app.radiansToDegrees(deltaAngle + Math.PI)) % 360 - 180;
    deltaAngle = app.radiansToDegrees(deltaAngle);
    
    if (Math.abs(deltaAngle) < this.MIN_ANGLE_THRESHOLD) {
        this.angle = destAngle;
        this.body.SetAngularVelocity(0);
    }
    
    var currentV = this.body.GetAngularVelocity();
    var idealV = Math.sign(deltaAngle)*this.IDEAL_ANGULAR_VELOCITY;
    if (Math.abs(idealV - currentV) > 5*this.MIN_ANGLE_THRESHOLD) {
        var newV = idealV;//*(1 + (Math.random()*0.30 - 0.15));
        this.body.SetAngularVelocity(newV);
    }
    return deltaAngle;
}
