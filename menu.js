/*
var selectedBody;
function getBodyAtMouse() {
 mousePVec = new b2Vec2(mouseX, mouseY);
    var aabb = new b2AABB();
    aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
    aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
    selectedBody = null;
    world.QueryAABB(getBodyCB, aabb);
    if(selectedBody!= null && selectedBody.GetUserData() != null)
              console.log(selectedBody.GetUserData().name);
    return selectedBody;
}


    //window.addEventListener("mousedown", registerMouseDown, true);

    function registerMouseDown(e) {
        e.preventDefault();
        _mouseButtons[e.which] = true;
        _lastEvent = e.timeStamp ? e.timeStamp : getTimeStamp();
    }
*/
function showPauseScreen()
{
    //window.addEventListener("mousedown", registerMouseDown, true);
    //app.world.Step(0, 3, 2);
    //app.world.Step(1/60, 3, 2);
    
    
    
    //window.removeEventListener("mousedown", registerMouseDown, true);
}
var inMenu = false;
function showMainMenu()
{
    inMenu = true;
    window.addEventListener("mousedown", registerMouseDown, true);
    
    app.ctx.save();
        app.ctx.fillStyle = 'black';
        app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
        app.ctx.drawImage(app.cache["asset/bg.png"], 0, 0);
        app.ctx.fillStyle = 'white';
        app.ctx.textAlign="center"; 
        app.ctx.font="45px Arial"; 
        app.ctx.fillText("Khosmood Rising", app.canvas.width / 2, app.canvas.height / 4);
        app.ctx.fillText("Touch anywhere to begin", app.canvas.width / 2, app.canvas.height / 2);
    app.ctx.restore();
}

function registerMouseDown()
{
    inMenu = false;
    window.removeEventListener("mousedown", registerMouseDown, true);
}