function main_iOS() {
    if (inMenu)
    {
        
    }
    else // in game
    {
        loop();
        render();
    }
}

function main() {
    if (inMenu) // in menu
    {
        window.requestAnimationFunc(main);
    }
    else // in game
    {
        app.camera.update();
        loop();
        app.camera.update();
        render();
        drawScore();
        window.requestAnimationFunc(main);
    }

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
    app.ctx.fillStyle = 'black';
    app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
    app.ctx.drawImage(app.cache["asset/bg.png"], 0, 0);
    app.ctx.drawImage(app.cache["asset/bg.png"], 800, 0);
    app.ctx.drawImage(app.cache["asset/bg.png"], 0, 800);
    app.ctx.drawImage(app.cache["asset/bg.png"], 800, 800);
    app.ctx.drawImage(app.cache["asset/bg.png"], 1600, 0);
    app.ctx.drawImage(app.cache["asset/bg.png"], 1600, 800);
    
    app.ctx.save();
        //app.ctx.translate(app.camera.x, app.cameray);
        var canvasCenter = app.camera.center;
        app.ctx.translate(canvasCenter.x, canvasCenter.y);
        app.ctx.scale(1, -1);
        app.ctx.scale(app.camera.PixelsPerMeter, app.camera.PixelsPerMeter);    
        app.ctx.rotate(app.camera.angle);
        
    
        app.ctx.translate(-app.camera.x, -app.camera.y);
        for (var i = 0; i < app.actors.length; ++i) {
            var actor = app.actors[i];
            if (actor && actor.isRendered) {
                app.ctx.save();
                    
                    app.ctx.translate(actor.x, actor.y);
                    app.ctx.rotate(actor.angle);
                    actor.drawAnimatedImage();
                app.ctx.restore();
            }
        }

        for (var i = 0; i < app.bullets.length; ++i) {
            var bullet = app.bullets[i];
            if (bullet && bullet.isRendered) {
                app.ctx.save();
                    app.ctx.translate(bullet.x, bullet.y);
                    app.ctx.rotate(bullet.angle);
                    bullet.drawAnimatedImage();
                app.ctx.restore();
            }
        }

    app.ctx.restore();
}
