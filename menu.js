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

function showMainMenu()
{
    var x = new PlasmaShip(0, 0);
    resetCanvas();
    var len = app.actors.lenth;
    for (var i = 0; i < len; ++i) {
        app.kill(app.actors[i]);
    }
    //_actors = [];
}