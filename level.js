function Level() {
    //this.ships = [new Ship(), new Ship(),new Ship(),new Ship(),new Ship(),new Ship()];
    this.ships = [];
    
    function _createNewLevel() {
//        var power_ship_img = new Image();
//        var plasma_ship_img = new Image();
//        var spread_ship_img = new Image();
//        var wave_ship_img = new Image();
        var power_count = 10;
        var plasma_count = 3;
        var spread_count = 4;
        var wave_count = 5;
//
//      
        
        for (var i = 0; i < spread_count; i++)
            {
                var pow = new PowerShip(Math.floor((Math.random() * 20) + 1), Math.floor((Math.random() * 20) + 1));
//               
                
                var pla = new PlasmaShip(Math.floor((Math.random() * 20) + 1), Math.floor((Math.random() * 20) + 1));
                var spr = new SpreadShip(Math.floor((Math.random() * 20) + 1), Math.floor((Math.random() * 20) + 1));
                var wav = new WaveShip(Math.floor((Math.random() * 20) + 1), Math.floor((Math.random() * 20) + 1));
                
                
                
                //spread_ships[i].initAnimatedImage(spread_ship_img, 6, 10);
//                spread_ships[i].x = Math.floor((Math.random() * 300) + 1);
//                spread_ships[i].y = Math.floor((Math.random() * 300) + 1);
            }
//
//
//
//        power_ship_img.src = "asset/PowerShip.png";
//        wave_ship_img.src = "asset/WaveShip.png";


        /*
        power_ship_img.addEventListener("load", function(e) {
            for (var i = 0; i < power_count; i++)
            {
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
                spread_ships[i].initAnimatedImage(spread_ship_img, 6, 10);
                spread_ships[i].x = Math.floor((Math.random() * 300) + 1);
                spread_ships[i].y = Math.floor((Math.random() * 300) + 1);
            }

            for(var i=1;i<spread_ships.length;i++)
            {
                window.app.actors.push(spread_ships[i]);
            }
        });

        var player_ship = new Ship(1);
        var player_img = new Image();
        player_img.addEventListener("load", function(e) {
            player_ship.initAnimatedImage(player_img, 6, 30);
            app.player = player_ship;
            player_ship.x = 50;
            player_ship.y = 400;
            window.app.actors.push(player_ship);
        });

        wave_ship_img.addEventListener("load", function(e) {
            for (var i = 0; i < wave_count; i++)
            {
                wave_ships[i].initAnimatedImage(wave_ship_img, 8, 10);
                wave_ships[i].x = Math.floor((Math.random() * 300) + 1);
                wave_ships[i].y = Math.floor((Math.random() * 300) + 1);
            }

            for(var i=1;i<wave_ships.length;i++)
            {
                window.app.actors.push(wave_ships[i]);
            }
        });
        */

    }

    this.createNewLevel = _createNewLevel.bind(this);    

}