function main_iOS() {
    if (app.inMenu) {
        drawMainMenu();
    }
    // in game
    else {
        loop();
        render();
    }
}

function main() {
    // in menu
    if (app.inMenu) {
        drawMainMenu();
    }
    // in game
    else {
        app.camera.update();
        loop();
        app.camera.update();
        render();
        drawScore();
    }
    window.requestAnimationFunc(main);

}

function loop() {
    app.removeKilled();
    app.world.Step(1/60, 3, 2);
    var len = app.actors.length;
    for (var i = 0; i < len; ++i) {
        app.actors[i].update();
    }
    len = app.bullets.length;
    for (var i = 0; i < len; ++i) {
        app.bullets[i].update();
    }
    app.removeKilled();
}
/*
var obst1 = "obstacle";
var obst2 = "obstacle2";
var obst3 = "obstacle3";
var debris = "moon";
var moon = "debris";
var randomStuff = new Array(5);
randomStuff[0] = obst1;
randomStuff[1] = obst2;
randomStuff[2] = obst3;
randomStuff[3] = moon;
randomStuff[4] = debris;
*/

function drawBackgroundImage() {
    app.ctx.save();
        app.ctx.fillStyle = 'black';
        app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
        app.ctx.drawImage(app.cache["asset/bg.png"], 0, 0);
        app.ctx.drawImage(app.cache["asset/bg.png"], 800, 0);
        app.ctx.drawImage(app.cache["asset/bg.png"], 0, 800);
        app.ctx.drawImage(app.cache["asset/bg.png"], 800, 800);
        app.ctx.drawImage(app.cache["asset/bg.png"], 1600, 0);
        app.ctx.drawImage(app.cache["asset/bg.png"], 1600, 800);
        app.ctx.drawImage(app.cache["asset/moon.png"],0,0);
        app.ctx.drawImage(app.cache["asset/moon.png"],300,200);
        app.ctx.drawImage(app.cache["asset/moon.png"],500,100);
        app.ctx.drawImage(app.cache["asset/moon.png"],100,400);
        app.ctx.drawImage(app.cache["asset/moon.png"],150,150);
        app.ctx.drawImage(app.cache["asset/moon.png"],600,300);
        app.ctx.drawImage(app.cache["asset/moon.png"],700,600);
        app.ctx.drawImage(app.cache["asset/moon.png"],650,750);
        app.ctx.drawImage(app.cache["asset/debris.png"],100,100);
        app.ctx.drawImage(app.cache["asset/debris.png"],200,300);
        app.ctx.drawImage(app.cache["asset/debris.png"],150,500);
        app.ctx.drawImage(app.cache["asset/debris.png"],425,700);
        app.ctx.drawImage(app.cache["asset/debris.png"],155,225);
        app.ctx.drawImage(app.cache["asset/debris.png"],650,360);
        app.ctx.drawImage(app.cache["asset/debris.png"],720,200);
        app.ctx.drawImage(app.cache["asset/debris.png"],600,550);
    app.ctx.restore();
}

function render() {
    drawBackgroundImage();
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
