function Level() {
    
    this.ship= [ship0,ship1,ship2,ship3,ship4];
    
    ship0.x=50;
    ship0.y=0;
    ship1.x=100;
    ship1.y=50;
    ship2.x=150;
    ship2.y=100;
    ship3.x=200;
    ship3.y=150;
    ship4.x=250;
    ship4.y=200;
    ship5.x=300;
    ship5.y=250;
    
function _createNewLevel() {
    
    var i;
    for(i=1;i<this.ship.length;i++)
    {
        this.ship[i].draw();       
    }
    
}
        
this.createNewLevel = _createNewLevel.bind(this);    

}