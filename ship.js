function Ship() {
    this.x=0;
    this.y=0;
    this.theta=0;
    this.speed=0;
    
    this.isPlayer=false;
    this.health=100;
    
    
function _update() {
    if(this.isPlayer){
        
    }
    
    else {
        
    }
}
    
function _draw(){
        
}
    
function _shoot(){
    var bullet = new Bullet();
    bullet.x = this.x;
    bullet.y = this.y;
    bullet.speed += this.speed;
}

this.update = _update.bind(this);    
this.draw = _draw.bind(this);            
this.shoot = _shoot.bind(this);            

    
    
}