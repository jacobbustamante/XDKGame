function Level(_width, _height) {
    this.width = _width;
    this.height = _height;
    var _xmax = _width/2;
    var _ymax = _height/2;
    
    function _genNum() {
        
    }
    
    function _randomPlace() {
        return {
            x: app.genNum(-_xmax, _xmax)*.95,
            y: app.genNum(-_ymax, _ymax)*.95
        };
    }
    this.randomPos = _randomPlace.bind(this);
    function _spawn(constr, num) {
        while(0 < num--) {
            var pos = this.randomPos();
            new constr(pos.x, pos.y);
        }
    }
    this.spawn = _spawn.bind(this);


    
    Walls(0, 0, this.width, this.height);
    this.spawn(Debris, 100*100*.005);
    this.spawn(Meteor, 100*100*.005);
    
    app.player = new PlasmaShip(0, 0);
    app.player.update = updatePlayerShip;
    app.camera.followPlayer = true;
    
    this.shipFactories = [
        new SpawnPointFactory(PlasmaShip, 4),
        new SpawnPointFactory(PowerShip, 4),
        new SpawnPointFactory(SpreadShip, 4),
        new SpawnPointFactory(WaveShip, 4)
    ];
    var _this = this;
    this.shipFactories.forEach(function(e){
        _this.spawn(e, 3);
    });
}
