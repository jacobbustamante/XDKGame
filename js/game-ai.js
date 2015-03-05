function initAi() {
    app.ai = {};
    app.radiansToDegrees = function(a){ return a*180/Math.PI; };
    app.degreesToRadians = function(a){ return a*Math.PI/180; };
    initVisionField();
    initProximityField();
    function initVisionField() {
        var visionRange = 15; //meters
        var visionFOV = 90; //degrees
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
        var proximityShape = makeCircleShape(9.5, 0, 0);
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
    this.AI_LEADER = 20 < Math.round(app.genNum(0, 100));
    this.STICKY_TARGET_TIMER = 3500;
    this.FOLLOW_OFFSET_TIMER = 1500;
    
    this.FOLLOW_OFFSET = {
        x: Math.sign(app.genNum(-1, 1)) * app.genNum(2, 6),
        y: Math.sign(app.genNum(-1, 1)) * app.genNum(2, 6)
    };
    
    
    this.enemyTargets = [];
    this.friendTargets = [];
    this.wallTargets = [];
    
    this.navTarget = null;
    this.aimTarget = null;
    this.squadLeader = this;
    var _that = this;
    this.lastOffsetTimestamp = 0;
    
    Object.defineProperty(this, "hasSquadLeader", {
        get: (function() {
            return _that.squadLeader !== this && _that.squadLeader.isAlive;
        }).bind(_that),
        
        enumerable: true,
        configurable: true
    });
    
    var _enemyTarget = null;
    var _enemyTargetTimestamp = 0;
    
    Object.defineProperty(this, "hasEnemyTarget", {
        get: (function() {
            return _enemyTarget !== null;// && (app.now() - this.enemyTargetTimestamp < this.STICKY_TARGET_TIMER);
        }).bind(_that),
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(this, "enemyTarget", {
        get: (function() {
            if (!this.hasEnemyTarget) {
                _enemyTarget = null;
                this.aimTarget = null;
            }
            return _enemyTarget;
        }).bind(this),
        set: (function(t) {
            _enemyTarget = t;
            //_enemyTargetTimestamp = app.now();
            
        }).bind(this),
        configurable: true,
        enumerable: true
    });
    
    //this.searchMap = searchMap.bind(this);
    this.aimAtTarget = aimAtTarget.bind(this);
    this.moveToNavTarget = moveToNavTarget.bind(this); 
    this.beginSensorCallback = onSense.bind(this);
    this.endSensorCallback = onEndSense.bind(this);
    this.followShip = followShip.bind(this);
    this.updateAi = updateAi.bind(this);
    
    this.findSquadLeader = findSquadLeader.bind(this);
    this.findEnemy = findEnemy.bind(this);
    this.attackTarget = attackTarget.bind(this);
    this.moveShip = moveShip.bind(this);
    this.aimShip = aimShip.bind(this);
    
    
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


/*
function searchMap() {
    this.moveToNavTarget();
    this.aimTarget = this.navTarget;
    this.aimAtTarget();
}
*/
function findSquadLeader() {

    if (!this.hasSquadLeader && !this.friendTargets.AI_LEADER) {
        if (app.player.TYPE === this.TYPE) {
            var playerIndex = this.friendTargets.indexOf(app.player);
            if (playerIndex !== -1) {
                this.squadLeader = app.player;
            }
        }
        while (this.friendTargets.length !== 0 && (this.friendTargets[0].isDead || !this.friendTargets[0].AI_LEADER)) {
            this.friendTargets.shift();
        }
        if (this.friendTargets.length !== 0) {
            this.squadLeader = this.friendTargets[0];
        }
    }
}

function findEnemy() {
    if (!this.hasEnemyTarget) {
        for (var i = 0; i < this.enemyTargets.length; ++i) {
            if (this.enemyTargets[i].isAlive) {
                this.enemyTarget = this.enemyTargets[i];
                return
            }
        }
        /*
        while (this.enemyTargets.length !== 0 && this.enemyTargets[0].isDead) {
            this.enemyTargets.shift();
        }
        if (this.enemyTargets.length !== 0) {
            this.enemyTarget = this.enemyTargets[0];
            return
        }
        */
        if (this.hasSquadLeader){
            for (var i = 0; i < this.squadLeader.enemyTargets.length; ++i) {
                if (this.squadLeader.enemyTargets[i].isAlive) {
                    this.enemyTarget = this.squadLeader.enemyTargets[i];
                    return
                }
            }
        }
    }
}



function moveShip() {
    if (this.hasSquadLeader) {
        this.followShip(this.squadLeader);
    }
    else if (false && this.hasEnemyTarget) {
        this.followShip(this.enemyTarget);
    }
    else {
        this.moveToNavTarget()
    }
}

function attackTarget() {
    var _this = this;
    this.aimTarget = { x: _this.enemyTarget.x, y: _this.enemyTarget.y };
    this.aimAtTarget();
    this.fireWeapon();
    this.enemyTarget = null;
}

function aimShip() {
   if (this.hasEnemyTarget) {
        this.attackTarget();
    }
    else {
        this.aimTarget = this.navTarget;
        this.aimAtTarget();
    } 
}

function updateAi() {
    if (app.now() - this.lastOffsetTimestamp > this.FOLLOW_OFFSET_TIMER) {
        this.lastOffsetTimestamp = app.now();
        this.FOLLOW_OFFSET = {
            x: Math.sign(app.genNum(-1, 1)) * app.genNum(1.5, 4),
            y: Math.sign(app.genNum(-1, 1)) * app.genNum(1.5, 4)
        };
    }
    this.findSquadLeader();
    this.findEnemy();
    this.moveShip();
    this.aimShip();
    //this.fireWeapon();
}

function followShip(other) {
    if (other.isAlive) {
        if (!this.navTarget)
            this.navTarget = {};
        this.navTarget.x = other.x + this.FOLLOW_OFFSET.x;
        this.navTarget.y = other.y + this.FOLLOW_OFFSET.y;
    }
    this.moveToNavTarget();
}

function moveToNavTarget() {
    if (!this.navTarget) {
        this.navTarget = app.level.randomPos();
        this.navTarget.x *= .9;
        this.navTarget.y *= .9;
    }
    
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
    if (!this.aimTarget) {
        var _t = this;
        this.aimTarget = { x: _t.x + _t.vx, y:_t.y + _t.vy};
    }
    var destAngle = Math.atan2(this.x - this.aimTarget.x, this.aimTarget.y - this.y);
    var deltaAngle = destAngle - this.angle;
    deltaAngle = Math.round(app.radiansToDegrees(deltaAngle + Math.PI)) % 360 - 180;
    deltaAngle = app.radiansToDegrees(deltaAngle);
    
    if (Math.abs(deltaAngle) < this.MIN_ANGLE_THRESHOLD) {
        this.angle = destAngle;
        //this.body.SetAngularVelocity(0);
        this.aimTarget =  null;
    }
    
    var currentV = this.body.GetAngularVelocity();
    var idealV = Math.sign(deltaAngle)*this.IDEAL_ANGULAR_VELOCITY;
    if (Math.abs(idealV - currentV) > 2*this.MIN_ANGLE_THRESHOLD) {
        var newV = idealV;//*(1 + (Math.random()*0.30 - 0.15));
        this.body.SetAngularVelocity(newV);
    }
    return deltaAngle;
}
