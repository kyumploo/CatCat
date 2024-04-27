class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};

        //set up a wall
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
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
        Object.keys(this.gameObjects).forEach(key => {

            let object = this.gameObjects[key];
            object.id = key;
            //Todo: determine if this object should actually mount

            object.mount(this);
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;

        //start a loop of async events
        //await each one

        for (let i=0; i<events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }
        this.isCutscenePlaying = false;

        //reset NPCs to do their idle behavior
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    }

    //check the position of the hero
    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
        if (!this.isCutscenePlaying && match) {
            this.startCutscene( match[0].events )
        }
    }

    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
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

            npcA: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(10),
                src: "./img/catcat2.png",
                behaviorLoop: [
                    //{ type: "walk", direction: "left"},
                    { type: "stand", direction: "up", time: 800},
                    { type: "stand", direction: "right", time: 800},
                    { type: "stand", direction: "down", time: 800},
                    { type: "stand", direction: "left", time: 800},
                    //{ type: "walk", direction: "up"},
                    //{ type: "walk", direction: "right"},
                    //{ type: "walk", direction: "down"},
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "...", faceHero: "npcA"},
                            { type: "textMessage", text: "Meow..."},
                            //{who: "hero", type: "walk", direction:"up"},
                        ]
                    }
                ]
            }),

            cd: new Person({
                x: utils.withGrid(14),
                y: utils.withGrid(8),
                src: "./img/cd.png",
                behaviorLoop: [
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "A compact disk. Wonder what's stored inside.", faceHero: "npcA"},
                    
                        ]
                    }
                ]
            }),

            diary: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(4),
                src: "./img/diary.png",
                behaviorLoop: [
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "A notebook. Looks like a diary.", faceHero: "npcA"},
                    
                        ]
                    }
                ]
            }),

            knife: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(7),
                src: "./img/knife.png",
                behaviorLoop: [
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "A kitchen knife.", faceHero: "npcA"},
                    
                        ]
                    }
                ]
            }),

            pasta: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(6),
                src: "./img/pasta.png",
                behaviorLoop: [
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "Some left over pasta...", faceHero: "npcA"},
                    
                        ]
                    }
                ]
            }),


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

        cutsceneSpaces:{
            [utils.asGridCoord(7,13)]: [
                {
                   events: [
                    {who: "npcA", type:"walk", direction:"down"},
                    {who: "npcA", type:"walk", direction:"down"},
                    {who: "npcA", type:"walk", direction:"right"},
                    {who: "npcA", type:"stand", direction:"down"},
                    {who: "hero", type:"stand", direction:"up"},
                    {type: "textMessage", text:"..."},
                    {type: "textMessage", text:"You can't leave the house..."},
                    {who: "npcA", type:"walk", direction:"left"},
                    {who: "npcA", type:"walk", direction:"up"},
                    {who: "npcA", type:"walk", direction:"up"},
                    {who: "hero", type:"walk", direction:"up"},
    
                   ] 
                }
            ],
            [utils.asGridCoord(8,13)]: [
                {
                   events: [
                    {who: "npcA", type:"walk", direction:"down"},
                    {who: "npcA", type:"walk", direction:"down"},
                    {who: "npcA", type:"walk", direction:"right"},
                    {who: "npcA", type:"walk", direction:"right"},
                    {who: "npcA", type:"stand", direction:"down"},
                    {who: "hero", type:"stand", direction:"up"},
                    {type: "textMessage", text:"..."},
                    {type: "textMessage", text:"You can't leave the house..."},
                    {who: "npcA", type:"walk", direction:"left"},
                    {who: "npcA", type:"walk", direction:"left"},
                    {who: "npcA", type:"walk", direction:"up"},
                    {who: "npcA", type:"walk", direction:"up"},
                    {who: "hero", type:"walk", direction:"up"},
    
                   ] 
                }
            ]
        },

    },

    //test
    /*Outside: {
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
    },*/
   
}