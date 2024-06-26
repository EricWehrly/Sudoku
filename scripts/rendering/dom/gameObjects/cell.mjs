import Events from "../../../core/events.mjs";
import GameOption from "../../../core/gameOptions.mjs";
import Renderer from "../renderer.mjs";

export default class CellRenderer extends Renderer {

    #cell;

    constructor(options = {}) {

        // TODO: assert options

        options.element = document.createElement('div');
        options.element.className = 'cell';
        options.containerElement.appendChild(options.element);
        super(options);
        
        this.#cell = options.cell;
        this.#cell.renderer = this;
        this.update();

        // cell click toggle active
        this.element.addEventListener("click", this.toggleActive.bind(this), false);

        const that = this;
        Events.Subscribe(Events.List.EffectAdded, function(details) {

            if(details.cell != that.#cell) return;
            const effect = details.effect;
            that.addClass(effect.name);
        });
        Events.Subscribe(Events.List.EffectRemoved, function(details) {

            if(details.cell != that.#cell) return;
            const effect = details.effect;
            that.removeClass(effect.name);
        });
    }

    update(options) {

        if(this.#cell.visible) this.element.style.display = this.element.getAttribute('desiredDisplay');
        else this.element.style.display = 'none';

        if(this.#cell.active) this.addClass("active");
        else this.removeClass("active");

        if(this.#cell.highlight) this.addClass("highlight");
        else this.removeClass("highlight");

        if(this.#cell.wrongGuess) this.addClass("error");
        else this.removeClass("error");

        if(this.#cell.renderText) this.element.innerHTML = this.#cell.renderText;

        if(this.#cell.color) this.element.style.color = this.#cell.color;

        if(GameOption.ShowCoordinates) {
            this.element.setAttribute('notes', `( ${this.#cell.x}, ${this.#cell.y} )`);
        } else {
            this.element.setAttribute('notes', this.#cell.notes);
        }
    }

    // we need a functional cell class
    toggleActive() {

        this.#cell.active = !this.#cell.active;
    }
}
