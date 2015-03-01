function Ship() {
    this.x = 50;
    this.y = 50;
    this.vx = 0;
    this.vy = 0;
    this.isPlayer = false;
    
    var b_x = 0;
    var b_y = 0;
    
    //comment
    // another one
    this.theta = 55;
    this.speed = 0;
    
    this.health=30;

    this.timeBetweenShots = 40;
    this.timeSinceLastShot = 40;
    
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
        b_x = this.x;
        b_y = this.y;
        
        if(this.isPlayer){
            this.getVelocity();
            this.updatePosition();
        }
        else
        {
            this.getVelocity();
            this.updatePosition(0);

            this.timeSinceLastShot--;
            if (this.timeSinceLastShot <= 0)
            {
                b_x = this.x;
                b_y = this.y;
                this.shoot();
                this.timeSinceLastShot = this.timeBetweenShots;
            }
        }
    }
    
    function _draw(){
        //this.tx();
        this.img.drawAnimatedImage(app.ctx, this.x, this.y);
    }
    
    function _shoot(){
        
        var bullet = new Bullet();
        var tmp_bullet = new Image();
        tmp_bullet.src = "asset/PlasmaShot.png";
        tmp_bullet.onload = function(e) {

        
        bullet.img.initAnimatedImage(tmp_bullet, 3, 60);
        bullet.x = b_x;
        bullet.y = b_y;
        //bullet.x = 80;
        //bullet.y = 80;
        //bullet.speed += this.speed;
        bullet.speed += 5;
        window.app.actors.push(bullet);
        }
    }

    function _getVelocity(){
        
        this.vx=this.speed*Math.cos(this.theta*Math.PI/180);
        this.vy=this.speed*Math.sin(this.theta*Math.PI/180);
              
    }
    
    function _updatePosition(time){
        if(time == 0){
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