function main() {
    function loop() {
        var len = app.actors.length;
        for (var i = 0; i < len; ++i) {
            app.actors[i].update();
            console.log(app.actors[i]);
        }

        app.removeKilled();
    }

    function render() {
        var len = app.actors.length;
        app.resetGraphics();
        app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
        for (var i = 0; i < len; ++i) {
            app.actors[i].render();
            //console.log(app.actors[i]);
        }
    }
    
    loop();
    render();
    //window.requestAnimationFrame(main);
}