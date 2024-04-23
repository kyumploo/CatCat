class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
        //two different images to be drawn
    }

    drawLowerImage(ctx,cameraPerson) {
        ctx.drawImage (this.lowerImage, utils.withGrid(13.5)-cameraPerson.x,utils.withGrid(8)-cameraPerson.y)
    }

    drawUpperImage(ctx,cameraPerson) {
        ctx.drawImage (this.upperImage, 0,0)
    }
}

//configurations of the different maps
window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "./img/map1.png",
        upperSrc: "",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(10),
                y: utils.withGrid(8),
            }),

            npc1: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(11),
                src: "./img/catcat.png"
            })
        }
    },

    //test
    Kitchen: {
        lowerSrc: "./img/map1.png",
        upperSrc: "./img/map1.png",
        gameObjects: {
            hero: new GameObject({
                x: 11,
                y: 9,
            }),

            npc1: new GameObject({
                x: 6,
                y: 10,
                src: "./img/catcat.png"
            })
        }
    },
   
}