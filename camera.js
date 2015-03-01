function Camera() {
    GameType.call(this, "CAMERA");
    SpaceObject.call(this, 0, 0);
    
    var fixtureDef = new b2FixtureDef();
    fixtureDef.set_shape(makeBoxShape(app.toMeters(app.canvas.width), app.toMeters(app.canvas.height), 0, 0, 0));
    fixtureDef.set_density(0);
    fixtureDef.set_friction(0);
    fixtureDef.set_isSensor(true);
    this.body.CreateFixture(fixtureDef);
    
    function _move(x, y) {
        this.x = x;
        this.y = y;
    }
    var moveFunc = _move.bind(this);
    
    Object.defineProperty(this, "move", {
        value: moveFunc,
        writable: false,
        configurable: false,
        enumerable: true
    });
}