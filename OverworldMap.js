class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        //set up a wall
        this.walls = config.walls || {};

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

    //walls
    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition (currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.values(this.gameObjects).forEach(o => {
            //Todo: determine if this object should actually mount

            o.mount(this);
        })
    }

    //add wall for game objects
    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction){
        this.removeWall(wasX,wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
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
        },

        //wall
        walls: {
            //table
            [utils.asGridCoord(5,6)] : true,
            [utils.asGridCoord(6,6)] : true,
            [utils.asGridCoord(5,7)] : true,
            [utils.asGridCoord(6,7)] : true,
            //walls outside the map
            //left
            [utils.asGridCoord(0,3)] : true,
            [utils.asGridCoord(2,4)] : true,
            [utils.asGridCoord(2,5)] : true,
            [utils.asGridCoord(2,6)] : true,
            [utils.asGridCoord(2,7)] : true,
            [utils.asGridCoord(2,8)] : true,
            [utils.asGridCoord(2,9)] : true,
            [utils.asGridCoord(1,8)] : true,
            [utils.asGridCoord(0,9)] : true,
            [utils.asGridCoord(0,10)] : true,
            [utils.asGridCoord(0,11)] : true,
            [utils.asGridCoord(1,12)] : true,
            [utils.asGridCoord(0,13)] : true,
            //right column
            [utils.asGridCoord(12,5)] : true,
            [utils.asGridCoord(12,6)] : true,
            [utils.asGridCoord(13,6)] : true,
            [utils.asGridCoord(14,7)] : true,
            [utils.asGridCoord(14,8)] : true,
            [utils.asGridCoord(15,9)] : true,
            //guizi
            [utils.asGridCoord(13,9)] : true,
            [utils.asGridCoord(12,10)] : true,
            [utils.asGridCoord(12,9)] : true,
            [utils.asGridCoord(13,10)] : true,
            [utils.asGridCoord(14,10)] : true,
            //wallright
            [utils.asGridCoord(15,11)] : true,
            [utils.asGridCoord(15,12)] : true,
            //upside map
            [utils.asGridCoord(3,4)] : true,
            [utils.asGridCoord(4,4)] : true,
            [utils.asGridCoord(5,4)] : true,
            [utils.asGridCoord(6,3)] : true,
            [utils.asGridCoord(7,3)] : true,
            [utils.asGridCoord(8,4)] : true,
            [utils.asGridCoord(9,4)] : true,
            [utils.asGridCoord(10,4)] : true,
            [utils.asGridCoord(11,4)] : true,
            [utils.asGridCoord(12,4)] : true,
            //downside map
            [utils.asGridCoord(1,12)] : true,
            [utils.asGridCoord(2,13)] : true,
            [utils.asGridCoord(3,13)] : true,
            [utils.asGridCoord(4,12)] : true,
            [utils.asGridCoord(5,12)] : true,
            [utils.asGridCoord(6,13)] : true,
            [utils.asGridCoord(6,14)] : true,
            [utils.asGridCoord(7,15)] : true,
            [utils.asGridCoord(8,15)] : true,
            [utils.asGridCoord(9,14)] : true,
            [utils.asGridCoord(9,13)] : true,
            [utils.asGridCoord(10,13)] : true,
            [utils.asGridCoord(11,13)] : true,
            [utils.asGridCoord(12,13)] : true,
            [utils.asGridCoord(13,13)] : true,
            [utils.asGridCoord(14,13)] : true,
        },

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