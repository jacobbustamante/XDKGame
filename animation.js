function AnimatedImage(image, frameCount, framesPerSecond) {
    if (frameCount <= 0) throw "framecount can not be <= 0";
    if (framesPerSecond <= 0) throw "fps can not be <= 0";
    this.frameStart = null;
    var _image = image;
    var _frameCount = frameCount;
    var _frameWidth = _image.width / frameCount;
    var _frameHeight = _image.height; 
    var _frameDuration = 1000/30;
    Object.defineProperty(this, "fps", {
        get: function() { return _frameDuration; },
        set: function(n) { _frameDuration = 1000/guaranteeNumber(n); },
        configurable: false,
        enumerable: true
    });
    this.fps = framesPerSecond;
    this.currentFrame = 0;
    
    function _drawAnimatedImage() {
        if (this.frameStart === null) {
            this.frameStart = app.now();
        }
        else if (app.now() - this.frameStart > this.fps) {
            ++this.currentFrame;
            this.currentFrame %= _frameCount;
            this.frameStart = app.now();
        }
        var scale = .65;
        if (app.iOS) {
            scale = .5;
        }
        scale *= app.camera.PixelsToMeters;
        var sourceX = _frameWidth * this.currentFrame;
        var posX = -_frameWidth*app.camera.MetersToPixels/2;
        var posY = -_frameHeight*app.camera.MetersToPixels/2;
        var sixeW = _frameWidth/app.camera.PixelsToMeters;
        var sizeH = _frameHeight/app.camera.PixelsToMeters;
        app.ctx.drawImage(_image, sourceX, 0, _frameWidth, _frameHeight, posX, posY, sixeW, sizeH);
    }

    /*
    Object.defineProperty(this, "initAnimatedImage", {
        value: _initAnimatedImage,
        writable: false,
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "initAnimation", {
        value: _initAnimatedImage,
        writable: false,
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "", {
        value: _drawAnimatedImage,
        writable: false,
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "drawSprite", {
        value: _drawAnimatedImage.bind(this, app.ctx),
        writable: false,
        configurable: false,
        enumerable: true
    });
    */

    this.drawAnimatedImage = _drawAnimatedImage.bind(this); 
}