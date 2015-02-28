function Camera() {
    function _move(x, y) {
        this.x = x;
        this.y = y;
    }
    var moveFunc = _move.bind(this);
    
    Object.defineProperty(this, "x", {
        value: 0,
        writable: true,
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "y", {
        value: 0,
        writable: true,
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "move", {
        value: moveFunc,
        writable: false,
        configurable: false,
        enumerable: true
    });
    

}

window.addEventListener("load", function() {
    app.camera = new Camera();
});