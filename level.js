function Level() {
    //this.ships = [new Ship(), new Ship(),new Ship(),new Ship(),new Ship(),new Ship()];
    this.ships = [];
    
function _createNewLevel() {
    window.app.actors = [];
    
    var power_ships = [];
    var plasma_ships = [];
    var spread_ships = [];
    var wave_ships = [];
    
    var power_ship_img = new Image();
    var plasma_ship_img = new Image();
    var spread_ship_img = new Image();
    var wave_ship_img = new Image();
    var power_count = 10;
    var plasma_count = 3;
    var spread_count = 4;
    var wave_count = 5;
    var power_health = 100;
    var plasma_health = 50;
    var spread_health = 70;
    var wave_health = 60;
    
    power_ship_img.src = "asset/PowerShip.png";
    plasma_ship_img.src = "asset/PlasmaShip.png";
    spread_ship_img.src = "asset/SpreadShip.png";
    wave_ship_img.src = "asset/WaveShip.png";
    
    
    
    power_ship_img.addEventListener("load", function(e) {
        for (var i = 0; i < power_count; i++)
        {
            power_ships.push(new Ship(power_health));
            power_ships[i].img.initAnimatedImage(power_ship_img, 6, 60);
            power_ships[i].x = Math.floor((Math.random() * 300) + 1);
            power_ships[i].y = Math.floor((Math.random() * 300) + 1);
        }
        
        for(var i=1;i<power_ships.length;i++)
        {
            window.app.actors.push(power_ships[i]);
        }
    });
    plasma_ship_img.addEventListener("load", function(e) {
        for (var i = 0; i < plasma_count; i++)
        {
            plasma_ships.push(new Ship(plasma_health));
            plasma_ships[i].img.initAnimatedImage(plasma_ship_img, 8, 60);
            plasma_ships[i].x = Math.floor((Math.random() * 300) + 1);
            plasma_ships[i].y = Math.floor((Math.random() * 300) + 1);
        }
        
        for(var i=1;i<plasma_ships.length;i++)
        {
            window.app.actors.push(plasma_ships[i]);
        }
    });
    spread_ship_img.addEventListener("load", function(e) {
        for (var i = 0; i < spread_count; i++)
        {
            spread_ships.push(new Ship(spread_health));
            spread_ships[i].img.initAnimatedImage(spread_ship_img, 6, 60);
            spread_ships[i].x = Math.floor((Math.random() * 300) + 1);
            spread_ships[i].y = Math.floor((Math.random() * 300) + 1);
        }
        
        for(var i=1;i<spread_ships.length;i++)
        {
            window.app.actors.push(spread_ships[i]);
        }
    });
    wave_ship_img.addEventListener("load", function(e) {
        for (var i = 0; i < wave_count; i++)
        {
            wave_shipsships.push(new Ship(wave_health));
            wave_ships[i].img.initAnimatedImage(wave_ship_img, 8, 60);
            wave_ships[i].x = Math.floor((Math.random() * 300) + 1);
            wave_ships[i].y = Math.floor((Math.random() * 300) + 1);
        }
        
        for(var i=1;i<wave_ships.length;i++)
        {
            window.app.actors.push(wave_ships[i]);
        }
    });
    
    
}
        
this.createNewLevel = _createNewLevel.bind(this);    

}