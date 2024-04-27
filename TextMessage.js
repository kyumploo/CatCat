class TextMessage {
    constructor({ text, onComplete }) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement() {
        //create the element
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
        `)

        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text
        })

        //the button
        this.element.querySelector("button").addEventListener("click", () => {
            //close the text message
            this.done();
        });

        //use keyboard to controll the button
        this.actionListener = new KeyPressListener("Enter", () => {
            this.actionListener.unbind();
            this.done();
        })
    }

    //method for closing the text message
    done() {
        this.element.remove();
        this.onComplete();
    }


    init(container) {
        this.createElement();
        container.appendChild(this.element)
        this.revealingText.init();
    }

}