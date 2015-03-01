function AnimatedImage() {
    var _image = null;
    var _frameWidth = 0;
    var _frameHeight = 0;
    var _frameCount = 0;
    var _frameDuration = 1000/30;
    var _frameStart = null;
    
    this.currentFrame = 0;
    
    var _initAnimatedImage = (function(image, frameCount, fps) {
        if (frameCount <= 0) throw "framecount can not be <= 0";
        if (fps <= 0) throw "fps can not be <= 0";
        
        _image = image;
        _frameWidth = _image.width / this.frameCount;
        _frameHeight = _image.height;
        _frameCount = frameCount;
        _frameStart = null;
        
        this.currentFrame = 0;
        this.fps = fps;
        
    }).bind(this);
    
    var _drawAnimatedImage = (function(ctx, x, y) {
        if (_frameStart === null) {
            _frameStart = app.now();
        }
        else if (app.now() - _frameStart > _frameDuration) {
            ++this.currentFrame;
            this.currentFrame %= _frameCount;
        }
        var sourceX = this.frameWidth * this.currentFrame;
        ctx.drawImage(_image, sourceX, 0, _frameWidth, _frameHeight, x, y, _frameWidth, _frameHeight);
    }).bind(this);
    
    var _drawAnimatedImage2 = _drawAnimatedImage.bind(this, window.app.ctx);

    function _getFps() {
        return _frameDuration;
    };
    
    function _setFps(fps) {
        if (fps !== undefined && fps.constructor === Number) {
            _frameDuration = 1000/fps;
        }
    };
    
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

    Object.defineProperty(this, "drawAnimatedImage", {
        value: _drawAnimatedImage,
        writable: false,
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "drawSprite", {
        value: _drawAnimatedImage2,
        writable: false,
        configurable: false,
        enumerable: true
    });
    
    Object.defineProperty(this, "fps", {
        get: _getFps,
        set: _setFps,
        configurable: false,
        enumerable: true
    });
}