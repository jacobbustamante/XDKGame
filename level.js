function Level() {
    //this.ships = [new Ship(), new Ship(),new Ship(),new Ship(),new Ship(),new Ship()];
    this.ships = [];
    
function _createNewLevel() {
    window.app.actors = [];
    
    var ships = [];
    
    var ship_img = new Image();
    ship_img.src = "asset/PlasmaShip.png";
    ship_img.addEventListener("load", function(e) {
        for (var i = 0; i < 6; i++)
        {
            ships.push(new Ship());
            ships[i].img.initAnimatedImage(ship_img, 8, 60);
            ships[i].x = Math.floor((Math.random() * 300) + 1);
            ships[i].y = Math.floor((Math.random() * 300) + 1);
        }
        
        for(var i=1;i<ships.length;i++)
        {
            window.app.actors.push(ships[i]);
        }
    });
    
}
        
this.createNewLevel = _createNewLevel.bind(this);    

}