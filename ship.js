function Ship() {
    this.x = 50;
    this.y = 50;
    this.vx = 0;
    this.vy = 0;
    this.radius=Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
    this.isPlayer = false;
    
    //comment
    // another one
    this.theta = 55;
    this.speed = 0;
    
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
    
    Object.defineProperty(this, "bullet_img", {
        value: new Image(),
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    function _update() {
        
        if(this.isPlayer){
            this.getVelocity();
            this.updatePosition();
            this.shoot();
        }
        else
        {
            this.getVelocity();
            this.updatePosition();
        }
    }
    
    function _draw(){
        //this.tx();
        this.img.drawAnimatedImage(app.ctx, this.x, this.y);
    }
    
    function _shoot(){
        
        var bullet = new Bullet();
        bullet.img.initAnimatedImage(this.bullet_img, 3, 60);
        bullet.x = this.x;
        bullet.y = this.y;
        //bullet.speed += this.speed;
        bullet.speed += 5;
        console.log(bullet);
        window.app.actors.push(bullet);
    }

    function _getVelocity(){
        
        this.vx=this.speed*Math.cos(this.theta*Math.PI/180);
        this.vy=this.speed*Math.sin(this.theta*Math.PI/180);
              
    }
    
    function _updatePosition(time){
        if(!time){
        this.x+=this.vx*2;
        this.y+=this.vy*2;
        }
        else{
        this.x+=this.vx*time;
        this.y+=this.vy*time;
        }
    }
    
    this.update = _update.bind(this);
    this.render = _draw.bind(this);
    this.shoot = _shoot.bind(this);
    this.getVelocity = _getVelocity.bind(this);
    this.updatePosition = _updatePosition.bind(this);
    
}

function tx() {
    var g = app.ctx;
    g.setTransform(1, 0, 0, 1, this.x, this.y);
    g.rotate((Math.PI/180)*this.theta);
    //g.translate(this.x, this.y);
    g.transform(1, 0, 0, 1, app.camera.x, app.camera.y);
}