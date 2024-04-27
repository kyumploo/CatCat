class RevealingText {
    constructor(config) {
        this.element = config.element;
        this.text = config.text;
        this.speed = config.speed || 70;

        this.timeout = null;
        this.isDone = false;
    }

    revealOneCharacter(list) {
        const next = list.splice(0,1)[0];
        next.span.classList.add("revealed");

        if(list.length > 0){
            this.timeout = setTimeout(() => {
                this.revealOneCharacter(list)
            }, next.delayAfter)
        } else {
            this.isDone = true;
        }
    }

    init() {
        let characters = [];
        this.text.split("").forEach(character => {

            //create each span, add element in DOM
            let span = document.createElement("span");
            span.textContent = character;
            this.element.appendChild(span);

            //Add this span
            characters.push({
                span,
                delayAfter: character === " " ? 0 : this.speed
            })

        })

        this.revealOneCharacter(characters);
    }
}