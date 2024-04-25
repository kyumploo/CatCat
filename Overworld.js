class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }


    //create the game loop, call the current game frame 60 times per second
    startGameLoop() {
        const step = () => {

            //clear the canvas
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

            //establish the camera person
            const cameraPerson = this.map.gameObjects.hero;

            //Update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })

            //draw lower image
            this.map.drawLowerImage(this.ctx,cameraPerson);

            //draw game objects
            Object.values(this.map.gameObjects).forEach(object => {
                //make the character move dynamicly

                object.sprite.draw(this.ctx, cameraPerson);
            })

            //draw upper image
            this.map.drawUpperImage(this.ctx,cameraPerson);

            //console.log("stepping!");
            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
        //console.log("Hello from the Overworld", this);

        //tell the over
       


        
    }
}