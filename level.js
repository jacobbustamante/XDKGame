function Level(_width, _height) {
    this.width = _width;
    this.height = _height;
    var _xmax = _width/2;
    var _ymax = _height/2;
    
    function genNum(min, max) {
        var range = max - min;
        return Math.round(100*(range*Math.random() - range/2))/100;   
    }
    function _randomPlace() {
        return {
            x: genNum(-_xmax, _xmax),
            y: genNum(-_ymax, _ymax)
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
    app.player.update =  updatePlayerShip;
    app.camera.followPlayer = true;
    
    this.shipFactories = [
        new SpawnPointFactory(PlasmaShip, 20),
        new SpawnPointFactory(PowerShip, 14),
        new SpawnPointFactory(SpreadShip, 12),
        new SpawnPointFactory(WaveShip)
    ];
    var _this = this;
    this.shipFactories.forEach(function(e){
        _this.spawn(e, Math.max(100*100*.00005/2, 3));
    });
}
