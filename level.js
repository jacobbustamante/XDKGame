function Level() {
    
    this.ship= [ship0,ship1,ship2,ship3,ship4];
  
function _createNewLevel() {
    
    var i;
    for(i=1;i<this.ship.length;i++)
    {
        this.ship[i].draw();       
    }
    
}
        
this.createNewLevel = _createNewLevel.bind(this);    

}