function main_iOS() {
    loop();
    render();
}

function main() {
    app.camera.update();
    loop();
    app.camera.update();
    render();
    window.requestAnimationFunc(main);
}

function loop() {
    app.world.Step(1/60, 3, 2);
    var len = app.actors.length;
    for (var i = 0; i < len; ++i) {
        app.actors[i].update();
    }
    app.removeKilled();
}

function render() {
    app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
    //app.ctx.drawImage(app.cache["asset/bg.png"], 0, 0);
    app.ctx.save();
        //app.ctx.translate(app.camera.x, app.cameray);
        app.ctx.translate(app.camera.offsetX, app.camera.offsetY);
        app.ctx.rotate(app.camera.angle);
        app.ctx.scale(1, -1);
        app.ctx.scale(app.camera.PixelsPerMeter, app.camera.PixelsPerMeter);
        for (var i = 0; i < app.actors.length; ++i) {
            var actor = app.actors[i];
            if (actor && actor.isRendered) {
                app.ctx.save();
                    app.ctx.translate(actor.x, actor.y);
                    app.ctx.rotate(actor.angle);
                    app.ctx.scale(1, 1)
                    actor.drawAnimatedImage();
                app.ctx.restore();
            }
        }
    app.ctx.restore();
}
