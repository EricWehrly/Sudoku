import Renderer from "../renderer.mjs";

export default class CellRenderer extends Renderer {

    #cell;

    constructor(options = {}) {

        // TODO: assert options

        options.element = document.createElement('div');
        super(options);
        
        this.#cell = options.cell;
        this.#cell.renderer = this;
        this.element.className = 'cell';
        this.update();

        options.containerElement.appendChild(this.element);

        // cell click toggle active
        this.element.addEventListener("click", this.toggleActive.bind(this), false);
    }

    update(options) {

        if(this.#cell.active) this.addClass("active");
        else this.removeClass("active");

        if(this.#cell.highlight) this.addClass("highlight");
        else this.removeClass("highlight");

        if(this.#cell.renderText) this.element.innerHTML = this.#cell.renderText;

        if(this.#cell.color) this.element.style.color = this.#cell.color;
    }

    // we need a functional cell class
    toggleActive() {

        this.#cell.active = !this.#cell.active;
    }
}
