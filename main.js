function main() {
    var len = app.actors.length;
    for (var i = 0; i < len; ++i) {
        app.actors[i].update();
    }
    
    app.removeKilled();
    len = app.actors;
    
    for (var i = 0; i < len; ++i) {
        app.actors[i].render();
    }
}