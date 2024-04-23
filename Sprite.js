//create the animation of characters

class Sprite {
    constructor(config) {

        //set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }
        
        //add code for the shadow
        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false
        if (this.useShadow){
            this.shadow.src = "./img/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        //Configure animation & initial state
        this.animations = config.animations || {
            "idle-down": [[0,0]],
            "idle-right": [[0,1]],
            "idle-up": [[0,2]],
            "idle-left": [[0,3]],
            "walk-down": [[1,0],[0,0],[3,0],[0,0]],
            "walk-right": [[1,1],[0,1],[3,1],[0,1]],
            "walk-up": [[1,2],[0,2],[3,2],[0,2]],
            "walk-left": [[1,3],[0,3],[3,3],[0,3]],
        }
        this.currentAnimation = "idle-right"; // config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        //switch frames
        //increase the number the character will move slower
        this.animationFrameLimit = config.animationFrameLimit || 8;

        this.animationFrameProgress = this.animationFrameLimit;


        //Reference the game object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    //new animation method
    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        //Downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        //reset the counter
        this.animationFrameProgress = this.animationFrameLimit;

        //uptick the actual frame

        this.currentAnimationFrame += 1;

        if (this.frame === undefined){
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x -8 + utils.withGrid(13.5) - cameraPerson.x;
        const y = this.gameObject.y -18 + utils.withGrid(8) - cameraPerson.y;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x,y);

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX*32,frameY*32,
            32,32,
            x,y,
            32,32
        )

        this.updateAnimationProgress();
    }


}