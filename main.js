function main() {
    function loop() {
        app.world.Step(1/60, 6, 3);
        var len = app.actors.length;
        for (var i = 0; i < len; ++i) {
            app.actors[i].update();
        }
        app.removeKilled();
    }

    function render() {
        app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
        var list = app.camera.body.GetContactList();
        if (list.e) {
            app.ctx.save();
                app.ctx.translate(app.camera.offsetX, app.camera.offsetY);
                app.ctx.rotate(app.camera.angle);
                app.ctx.scale(1, -1);
                app.ctx.scale(app.camera.PixelsToMeters, app.camera.PixelsToMeters)
                while (list.e) {
                    var actor = list.get_contact().GetFixtureB().GetBody().actor;
                    if (actor) {
                        app.ctx.save();
                            app.ctx.translate(actor.x, actor.y);
                            app.ctx.rotate(actor.angle);
                            actor.drawAnimatedImage();
                        app.ctx.restore();
                    }
                    list = list.get_next()
                }
            app.ctx.restore();
        }
    }
    
    loop();
    render();
}

function isCollision(ship,bullet){
   
    var distance = Math.sqrt(Math.pow(ship.x-bullet.x,2)+Math.pow(ship.y-bullet.y,2));
    
    if(distance < 44)
        return true;
    else
        return false;
    /*
    if((ship.img.frameWidth/2 + bullet.img.frameWidth/2) < distance)
        return true;
    
    else return false;
    */
}