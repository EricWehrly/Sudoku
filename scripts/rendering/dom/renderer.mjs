import Events from "../../core/events.mjs";

export default class Renderer {

    static #onResize() {

        // compute font size based on grid size and window size
        // trap to recompute on window resize
        // I think we need to grab the "measure font height" func from Monolith
        // const maxFontHeight = Math.floor(window.innerHeight / (GAME_GRID_SIZE * GAME_GRID_SIZE));
        const maxFontHeight = Math.floor(window.innerHeight / 9);
        // document.body.style.fontSize = `${(maxFontHeight / 2)}px`;
        Events.RaiseEvent(Events.List.WindowResized);
    }

    static {
        
        if(window.attachEvent) window.addEventListener('onresize', Renderer.#onResize);
        else if(window.addEventListener) window.addEventListener('resize', Renderer.#onResize);
        else console.warn("Couldn't attach resize event.");
        Renderer.#onResize();
    }

    #element;
    get element() { return this.#element; }

    constructor(options) {

        this.#element = options.element;

        const style = window.getComputedStyle(this.element);
        if(style.display) this.element.setAttribute('desiredDisplay', style.display);
    }

    update(options) { }

    addClass(className) {

        const currentClass = this.#element.className;
        if(currentClass.indexOf(className) < 0) {
            this.#element.className += ` ${className}`;
        }
    }

    removeClass(className) {

        this.#element.className = this.#element.className.replace(` ${className}`, '');
    }

    // toggleClass
}
