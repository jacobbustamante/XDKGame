function initBulletConstructors() {
    window.PlasmaShot = Bullet.bind(null, "Plasma Shot", app.cache["asset/PlasmaShot.png"], 5);
    window.PowerShot = Bullet.bind(null, "Power Shot", app.cache["asset/PowerShot.png"], 20);
    window.SpreadShot = Bullet.bind(null, "Spread Shot", app.cache["asset/SpreadShot.png"], 15);
    window.WaveShot = Bullet.bind(null, "Wave Shot", app.cache["asset/WaveShot.png"], 30);
}

function Bullet(bulletType, spriteSheet, attack, velocity, originShip) {
    AnimatedImage.call(this);
    
    this.initAnimatedImage(spriteSheet, 3, 60);
    this.attack = attack;
    this.velocity = velocity;
    this.position = originShip.position;
    
    Object.defineProperty(this, "isBullet", {
        value: true,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "TYPE", {
        value: bulletType,
        writable: false,
        enumerable: true,
        configurable: false
    });
 
    Object.defineProperty(this, "ORIGIN", {
        value: originShip,
        writable: false,
        enumerable: true,
        configurable: false
    });
    

    
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;


    this.theta = 90;
    this.speed = 0;
    this.type = type;
    var attack = 0;

    
    function _draw() {
        this.drawSprite(this.x, this.y);
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
    this.getVelocity = _getVelocity.bind(this);
    this.updatePosition = _updatePosition.bind(this);
    
}
