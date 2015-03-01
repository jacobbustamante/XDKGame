function main() {
    function loop() {
        var len = app.actors.length;
        for (var i = 0; i < len; ++i) {
            app.actors[i].update();
            if(app.actors[i].isBullet===true || app.actors[i].isShip===true)
            {
                for(var j=i+1; j<len; ++j){
                    if(app.actors[i].isBullet===true && app.actors[j].isShip===true){
                        if(isCollision(app.actors[j],app.actors[i])){
                            app.actors[j].health-=10;   
                            if(app.actors[j].health<=0){
                                app.kill(app.actors[j]);
                            }
                        }
                    }
                    
                    else if (app.actors[j].isBullet===true && app.actors[i].isShip===true){
                        if(isCollision(app.actors[i],app.actors[j])){
                            app.actors[i].health-=10;   
                            if(app.actors[i].health<=0){
                                app.kill(app.actors[i]);
                            }
                        } 
                    }
                                                
                }
                
            }
        }

        app.removeKilled();
    }

    function render() {
        var len = app.actors.length;
        app.resetGraphics();
        app.ctx.setTransform(1, 0, 0, 1, 0, 0);
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

function isCollision(ship,bullet){
   
    var distance = Math.sqrt(Math.pow(ship.x-bullet.x,2)+Math.pow(ship.y-bullet.y,2));
    
    if(distance<ship.radius+bullet.radius)
        return true;
    
    else return false;
}