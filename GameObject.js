class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this, 
            src: config.src || "./img/catcat.png",
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

        this.talking = config.talking || [];

    }

    mount(map) {
        console.log("mounting!");
        this.isMounted = true;
        map.addWall(this.x, this.y);

        //if we have a behavior, kick off after a short delay
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10)
    }

    update() {

    }

    async doBehaviorEvent(map){

        //don't do anything if there is a more important cutscene
        if (map.isCutscenePlaying || this.behaviorLoop.Length === 0 || this.isStanding) {
            return;
        }

        //setting up our event
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // create an event instance out of our nect config
        const eventHandler = new OverworldEvent({ map, event: eventConfig });
        await eventHandler.init();

        //do this next
        //
        //
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        //do it asap
        this.doBehaviorEvent(map);

    }

}