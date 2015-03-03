
function showMenu()
{
    app.inMenu = true;
    window.addEventListener("mousedown", closeMenu, true);
    drawCurrentMenu();
    switchMusicToMenu();
}

function closeMenu(e)
{    
    if (app.curMenu == 1)
    {
        if (Math.abs((app.canvas.height * 3/4) - e.clientY - (app.canvas.width/40)*(1/3)) < (app.canvas.width/40)*(3/4) &&
            Math.abs((app.canvas.width / 2) - e.clientX) < (app.canvas.width/40) * 3.5)
        {
            app.curMenu = 2;
        }
        else
        {
            app.inMenu = false;
            window.removeEventListener("mousedown", closeMenu, true);
            switchMusicToGame();
        }
    }
    else if (app.curMenu == 2)
    {
        app.curMenu = 1;
    }
    else
    {
        app.curMenu = 1;
        app.inMenu = false;
        window.removeEventListener("mousedown", closeMenu, true);
        switchMusicToGame();
    }
}

function drawCurrentMenu()
{
    drawBackgroundImage();
    
    if (app.curMenu == 0)
        _drawMainMenu();
    else if (app.curMenu == 1)
        _drawEndScreen();
    else if (app.curMenu == 2)
        _drawCredits();
}

function switchMusicToGame()
{
    app.cache["asset/MainMenuIntro.wav"].pause();
    app.cache["asset/MainMenuLoop.wav"].pause();
    app.cache["asset/FirstShipLoop.wav"].play();
}

function switchMusicToMenu()
{
    app.cache["asset/FirstShipLoop.wav"].pause();
    app.cache["asset/MainMenuIntro.wav"].play();
    app.cache["asset/MainMenuIntro.wav"].addEventListener("ended", function(e){
        app.cache["asset/MainMenuLoop.wav"].play();
    });
}

function onPlayerDeath()
{
    showMenu();
}

function _drawMainMenu()
{
    app.ctx.save();
        app.ctx.fillStyle = 'white';
        app.ctx.textAlign="center";
        app.ctx.font=app.canvas.width/20+"px Arial"; 
        app.ctx.fillText("Cosmic Rising", app.canvas.width / 2, app.canvas.height / 4);
        app.ctx.font=app.canvas.width/40+"px Arial"; 
        app.ctx.fillText("Touch anywhere to begin", app.canvas.width / 2, app.canvas.height / 2);
    app.ctx.restore();
}

function _drawEndScreen()
{   
    app.ctx.save();
        app.ctx.fillStyle = 'white';
        app.ctx.textAlign="center";
    
        app.ctx.font=app.canvas.width/20+"px Arial"; 
        app.ctx.fillText("Final Score: " + app.score, app.canvas.width / 2, app.canvas.height / 4);
    
        app.ctx.font=app.canvas.width/40+"px Arial"; 
        app.ctx.fillText("Touch anywhere to play again!", app.canvas.width / 2, app.canvas.height / 2);
    
        app.ctx.font=app.canvas.width/40+"px Arial"; 
        app.ctx.fillText("View Credits", app.canvas.width / 2, app.canvas.height * 3 / 4);
    app.ctx.restore();
}

function _drawCredits()
{
    app.ctx.save();
        app.ctx.fillStyle = 'white';
        
        app.ctx.textAlign="center";
        app.ctx.font=app.canvas.width/30+"px Arial"; 
        app.ctx.fillText("Thanks for playing Cosmic Rising!", app.canvas.width / 2, app.canvas.height / 4);
    
        app.ctx.textAlign="center";
        app.ctx.font=app.canvas.width/50+"px Arial"; 
        app.ctx.fillText("Nathan Farnum - dlitedlite@hotmail.com", app.canvas.width / 2, app.canvas.height * 5 / 10);
        app.ctx.fillText("Michael Murphy - murphym18@gmail.com", app.canvas.width / 2, app.canvas.height * 6 / 10);
        app.ctx.fillText("Jacob Bustamante - jakebustamante@gmail.com", app.canvas.width / 2, app.canvas.height * 7 / 10);
        app.ctx.fillText("Anand Mangal - anand.mangal94@gmail.com", app.canvas.width / 2, app.canvas.height * 8 / 10);
        app.ctx.fillText("Zachary Crandall - zach.t.crandall@gmail.com", app.canvas.width / 2, app.canvas.height * 9 / 10);
    app.ctx.restore();
}
