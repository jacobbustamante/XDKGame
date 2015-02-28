function Ship() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    
    this.theta = 0;
    this.speed = 0;
    this.velocity = 0;
    
    this.health=100;
    
    var _tx = tx.bind(this);
    
    Object.defineProperty(this, "tx", {
        value: _tx,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "img", {
        value: new AnimatedImage(),
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    function _update() {
        
    }
    
    function _draw(){
        this.tx();
        this.img.drawAnimatedImage(app.ctx, 0, 0);
    }
    
    function _shoot(){
        var bullet = new Bullet();
        bullet.x = this.x;
        bullet.y = this.y;
        bullet.speed += this.speed;
    }

    function _getVelocity(){
        
        this.vx=speed*Math.cos(this.theta*Math.PI/180);
        this.vy=speed*Math.sin(this.theta*Math.PI/180);
              
    }
    
    this.update = _update.bind(this);
    this.render = _draw.bind(this);
    this.shoot = _shoot.bind(this);
    this.getVelocity = _getVelocity.bind(this);
    
}

function tx() {
    var g = app.ctx;
    g.resetTransform();
    g.rotate((Math.PI/180)*this.theta);
    g.translate(this.x, this.y);
    g.transform(1, 0, 0, 1, app.camera.x, app.camera.y);
}