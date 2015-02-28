function AnimatedImage()
{
    this.currentFrame = 0;
    this.frameWidth = 0;
    
    this.timeBetweenFrames = 0;
    this.timeSinceLastFrame = 0;
    
    this.initAnimatedImage = function(image, frameCount, fps) {
        if (frameCount <= 0) throw "framecount can not be <= 0";
        if (fps <= 0) throw "fps can not be <= 0";

        console.log(image);
        console.log(image.width);
        
        this.image = image;
        this.currentFrame = 0;
        this.frameCount = frameCount;
        this.timeBetweenFrames = 1/fps;
        this.timeSinceLastFrame = this.timeBetweenFrames;
        this.frameWidth = this.image.width / this.frameCount;
    }
    
    this.drawAnimatedImage = function(ctx, x, y) {
        var delta = 1;
        
        var sourceX = this.frameWidth * this.currentFrame;
        ctx.drawImage(this.image, sourceX, 0, this.frameWidth, this.image.height, x, y, this.frameWidth, this.image.height);

        this.timeSinceLastFrame -= delta;
        if (this.timeSinceLastFrame <= 0)
        {
            this.timeSinceLastFrame = this.timeBetweenFrames;
            ++this.currentFrame;
            this.currentFrame %= this.frameCount;
        }
    }
    
}