
var tut_screen = 0;
var seen_bullets = 0;
var seen_kills = 0;

function showMenu()
{
    app.inMenu = true;
    window.addEventListener("mousedown", closeMenu, true);
    drawCurrentMenu();
    switchMusicToMenu();
}

function closeMenu(e)
{    
    // end screen
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
            //_destroyCurrentGame();
            //app.level = new Level(100, 100);
            app.score = 0;
            app.player = new PlasmaShip(0,0);
            app.player.update = updatePlayerShip;
        }
    }
    // credits
    else if (app.curMenu == 2)
    {
        app.curMenu = 1;
    }
    // tut
    else if (app.curMenu == 3)
    {
        if (tut_screen++ > 1)
        {
            app.curMenu = 1;
            app.inMenu = false;
            window.removeEventListener("mousedown", closeMenu, true);
            switchMusicToGame();
        }
        else
        {
            app.inMenu = false;
            window.removeEventListener("mousedown", closeMenu, true);
            switchMusicToGame();
        }
    }
    // main
    else
    {
        if (Math.abs((app.canvas.height * 3/4) - e.clientY - (app.canvas.width/40)*(1/3)) < (app.canvas.width/40)*(3/4) &&
            Math.abs((app.canvas.width / 2) - e.clientX) < (app.canvas.width/40) * 4.2)
        {
            app.curMenu = 3;
            tut_screen = 0;
        }
        else
        {
            app.curMenu = 1;
            app.inMenu = false;
            window.removeEventListener("mousedown", closeMenu, true);
            switchMusicToGame();
        }
    }
}

function _destroyCurrentGame()
{
    
    for (var i = 0; i < app.actors.length; i++)
    {
        app.kill(app.actors[i]);   
    }
    
    //app.killAll();
    //app.removeKilled();
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
    else if (app.curMenu == 3)
        _drawTutorialScreen();
}

function switchMusicToGame()
{
    app.cache["asset/MainMenuIntro_small.wav"].pause();
    app.cache["asset/MainMenuLoop_small.wav"].pause();
    app.cache["asset/FirstShipLoop_small.wav"].play();
}

function switchMusicToMenu()
{
    app.cache["asset/FirstShipLoop_small.wav"].pause();
    app.cache["asset/MainMenuIntro_small.wav"].play();
    app.cache["asset/MainMenuIntro_small.wav"].addEventListener("ended", function(e){
        app.cache["asset/MainMenuLoop_small.wav"].play();
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
        app.ctx.fillText("Click anywhere to begin", app.canvas.width / 2, app.canvas.height / 2);

        app.ctx.font=app.canvas.width/40+"px Arial"; 
        app.ctx.fillText("Play with tutorial", app.canvas.width / 2, app.canvas.height * 3 / 4);
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
        app.ctx.fillText("Click anywhere to play again!", app.canvas.width / 2, app.canvas.height / 2);
    
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

function _drawTutorialScreen()
{   
    if (tut_screen == 0)
    {
        app.ctx.save();
            app.ctx.fillStyle = 'white';
            app.ctx.textAlign="center";
        
            app.ctx.font=app.canvas.width/20+"px Arial"; 
            app.ctx.fillText("W/A/S/D or right click to move", app.canvas.width / 2, app.canvas.height / 4);
        
            app.ctx.font=app.canvas.width/40+"px Arial"; 
            app.ctx.fillText("Click anywhere to continue...", app.canvas.width / 2, app.canvas.height / 2);
        app.ctx.restore();
    }
    else if (tut_screen == 1)
    {
        app.ctx.save();
            app.ctx.fillStyle = 'white';
            app.ctx.textAlign="center";
        
            app.ctx.font=app.canvas.width/20+"px Arial"; 
            app.ctx.fillText("Space bar or left click to attack", app.canvas.width / 2, app.canvas.height / 8);
            app.ctx.font=app.canvas.width/30+"px Arial"; 
            app.ctx.fillText("Press R to toggle autofire", app.canvas.width / 2, app.canvas.height / 4);
        
            app.ctx.font=app.canvas.width/30+"px Arial"; 
            app.ctx.fillText("Same ships do not hurt each other,", app.canvas.width / 2, app.canvas.height * 4/ 8);
            app.ctx.fillText("use this to your advantage!", app.canvas.width / 2, app.canvas.height * 5/ 8);

            app.ctx.font=app.canvas.width/40+"px Arial"; 
            app.ctx.fillText("Click anywhere to continue...", app.canvas.width / 2, app.canvas.height * 3 / 4);
        app.ctx.restore();
    }
    else if (tut_screen == 2)
    {
        app.ctx.save();
            app.ctx.fillStyle = 'white';
            app.ctx.textAlign="center";
        
            app.ctx.font=app.canvas.width/30+"px Arial"; 
            app.ctx.fillText("Defeated ships drop glowing orbs.", app.canvas.width / 2, app.canvas.height / 4);
            app.ctx.fillText("Collect one to change into it's ship type!", app.canvas.width / 2, app.canvas.height * 3/ 8);
        
            app.ctx.font=app.canvas.width/30+"px Arial"; 
            app.ctx.fillText("You're on your own now!", app.canvas.width / 2, app.canvas.height * 5/ 8);

            app.ctx.font=app.canvas.width/40+"px Arial"; 
            app.ctx.fillText("Click anywhere to end tutorial and play...", app.canvas.width / 2, app.canvas.height * 7/ 8);
        app.ctx.restore();
    }
}
