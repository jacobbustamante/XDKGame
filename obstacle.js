function Meteor(x, y) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y);
    Obstacle.call(this, this.props.hp);
    var _sprite_num = Math.floor(Math.random() * 3);
    var _sprite = _sprite_num == 0 ? app.cache["asset/obstacle.png"] : _sprite_num == 1 ? app.cache["asset/obstacle2.png"] : app.cache["asset/obstacle3.png"]
    AnimatedImage.call(this, _sprite, this.props.frameCount, this.props.framesPerSecond);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
    this.body.SetLinearVelocity(new b2Vec2(Math.random()*8 - 4, Math.random()*8 - 4));
    this.body.SetAngularVelocity(Math.random()*4 - 2);
}

function Wall(x, y, length, verticle) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y, 0);
    Obstacle.call(this, this.props.hp, true);
    var _sprite = Math.floor(Math.random() * 2) == 0 ? app.cache["asset/debris.png"] : app.cache["asset/moon.png"]
    AnimatedImage.call(this, _sprite, this.props.frameCount, this.props.framesPerSecond);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    if (verticle)
        fixtureDef.set_shape(makeBoxShape(1, length, 0, 0, 0));
    else
        fixtureDef.set_shape(makeBoxShape(length, 1, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
}

function Walls(origin_x, origin_y, width, height)
{
    // top
    new Wall(origin_x, origin_y + height / 2, width, false);
    // bottom
    new Wall(origin_x, origin_y - height / 2, width, false);
    // left
    new Wall(origin_x - width / 2, origin_y, height, true);
    // right
    new Wall(origin_x + width / 2, origin_y, height, true);
}

function initObstaclePrototypes() {
    Meteor.prototype = new ObstaclePrototype({
        typeName: "METEOR_OBSTACLE",
        hp: 500,
        sprite: app.cache["asset/obstacle.png"],
        frameCount: 1,
        framesPerSecond: 10,
        topSpeed: 12,
    });
    Wall.prototype = new ObstaclePrototype({
        typeName: "WALL_OBSTACLE",
        hp: 10000,
        sprite: app.cache["asset/obstacle2.png"],
        frameCount: 1,
        framesPerSecond: 10,
        topSpeed: 12
    });

}

function updateObstacle() {
    
}



function Obstacle(hp, invincible) {
    var _health = hp;
    this.damage = function (object) {
        _health -= object.bulletDamage;
        if (_health <= 0) {
            app.cache["asset/DestroyShip.wav"].play();
            this.onDeath();
        }
    };
    if (invincible)
        this.damage = function (){};
    
    var _isDead = false;
    
    Object.defineProperty(this, "isDead", {
        get: function() { return _isDead; },
        enumerable: true,
        configurable: true
    });
    function _explode() {
        if (!_isDead) {
            AnimatedImage.call(this, app.cache["asset/Explosion.png"], 8, 10);
            this.updateCurrentFrame = showFramesThenKill.bind(this);
            this.update = function() {};
            _isDead = true;
        }
    }
    
    Object.defineProperty(this, "health", {
        get: function() { return _health; },
        enumerable: true,
        configurable: false
    });
    
    this.update = updateObstacle.bind(this);
    this.onDeath = _explode.bind(this);
}

function ObstaclePrototype(props) {
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

}

Object.defineProperty(ObstaclePrototype.prototype, "DEFAULT_DENSITY", {
    value: 250,
    writable: true,
    enumerable: true,
    configurable: false
});