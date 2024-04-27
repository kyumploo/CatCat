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
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(object => {
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

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            //Is there a person here to talk to?
            this.map.checkForActionCutscene()
        })
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if(e.detail.whoId === "hero"){
                //Hero's position is changed
                this.map.checkForFootstepCutscene()
            }
        })
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();

        this.bindActionInput();
        this.bindHeroPositionCheck();

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
        //console.log("Hello from the Overworld", this);

        
        
        this.map.startCutscene([
            //walk
            { who: "npcA", type: "walk", direction: "right" },
            { who: "npcA", type: "walk", direction: "right" },
            { who: "npcA", type: "walk", direction: "down" },
            { who: "npcA", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "left" },
            { who: "hero", type: "walk", direction: "left" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "npcA", type: "stand", direction: "up", time: 800 },
            { type: "textMessage", text: "Meow!"},
            { who: "npcA", type: "walk", direction: "left" },
            { who: "npcA", type: "walk", direction: "left" },
            { who: "npcA", type: "walk", direction: "up" },
            { who: "npcA", type: "walk", direction: "up" },
            
        ])


        
    }
}