
function Ship(hp, type) {

    this.isShip=true;
    

    this.x = 50;
    this.y = 50;
    this.vx = 0;
    this.vy = 0;
    this.radius=0;
    this.isPlayer = false;

    this.theta = 55;
    this.speed = 0;
    

    this.health=hp;


    this.timeBetweenShots = 40;
    this.timeSinceLastShot = 40;

    
    var b_x = 0;
    var b_y = 0;

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

            this.updatePosition(0);
            this.radius=Math.sqrt(Math.pow(this.x+(this.img.frameWidth/2),2)+Math.pow(this.y+(this.img.image.height/2),2));

            this.timeSinceLastShot--;
            if (this.timeSinceLastShot < 0)
            {
                this.timeSinceLastShot = this.timeBetweenShots;
                //this.shoot();
            }
        }
        else
        {
            this.getVelocity();
            this.updatePosition(0);

            this.timeSinceLastShot--;
            if (this.timeSinceLastShot < 0)
            {
                this.timeSinceLastShot = this.timeBetweenShots;
                this.shoot();
            }
        }
    }
    
    function _draw(){
        //this.tx();
        this.img.drawAnimatedImage(app.ctx, this.x, this.y);
    }
    
    function _shoot(){
        
        var bullet = new Bullet();
        var bullet_img = new Image();
        if(type == 1)
            bullet_img.src = "asset/PowerShot.png";
        if(type == 2)
            bullet_img.src = "asset/PlasmaShot.png";
        if(type == 3)
            bullet_img.src = "asset/SpreadShot.png";
        if(type == 4)
            bullet_img.src = "asset/WaveShot.png";
        bullet_img.addEventListener("load", function(e) {
            bullet.img.initAnimatedImage(bullet_img, 3, 60);
            bullet.x = b_x;
            bullet.y = b_y;
            bullet.speed += 5;

            if (this.isPlayer===true)
            {
                bullet.fromPlayer = true;
            }

            bullet.type = type;
            window.app.actors.push(bullet);
        });
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