function Bullet() {

    this.isBullet=true;
    
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;

    this.theta = 90;
    this.speed = 0;
    
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
        this.updatePosition(0);
        this.getVelocity();
        this.radius=Math.sqrt(Math.pow(this.x+(this.img.frameWidth/2),2)+Math.pow(this.y+(this.img.image.height/2),2));
    }
    
    function _draw(){
        //this.tx();
        this.img.drawAnimatedImage(app.ctx, this.x, this.y);
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

function tx() {
    var g = app.ctx;
    g.setTransform(1, 0, 0, 1, this.x, this.y);
    g.rotate((Math.PI/180)*this.theta);
    //g.translate(this.x, this.y);
    g.transform(1, 0, 0, 1, app.camera.x, app.camera.y);
}