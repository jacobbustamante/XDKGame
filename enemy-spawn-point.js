function SpawnPointFactory() {
    var _constru = arguments.length > 0 ? arguments[0] : PlasmaShip;
    var _makeType = _constru.prototype.props.typeName;
    var _max = arguments.length > 1 ? arguments[1] : 10;
    var _spawnRate = arguments.length > 2 ? arguments[2] : 750;

    function SpawnPoint() {
        GameType.call(this, "SPAWN_POINT_" + _makeType, true);
        this.isRendered = false;
        var _lastSpawn = 0;
        this.update = (function(){
            if (app.now() - _lastSpawn > _spawnRate && app.ships[_makeType].length < _max) {
                var pos = app.level.randomPos()
                var s = new _constru(pos.x, pos.y);
                s.update = s.updateAi;
            }
        }).bind(this);
        Object.defineProperty(this, "max", {
            get: function() { return _max; },
            set: function(max) { _max = max; }
        });
        Object.defineProperty(this, "spawnRate", {
            get: function() { return _spawnRate; },
            set: function(rate) { _spawnRate = rate; }
        });
    }
    return SpawnPoint;
}