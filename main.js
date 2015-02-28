function main() {
    function loop() {
        var len = app.actors.length;
        for (var i = 0; i < len; ++i) {
            app.actors[i].update();
        }

        app.removeKilled();
    }

    function render() {
        var len = app.actors;

        for (var i = 0; i < len; ++i) {
            app.actors[i].draw();
        }
    }
    
    loop();
    render();
    
}