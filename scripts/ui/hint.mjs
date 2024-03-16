import Events from "../core/events.mjs";
import Hint from "../hints/hint.mjs";
import UIElement from "../rendering/dom/ui/uiElement.mjs";
import { createElement } from "../util/javascript-extensions.mjs";

export default class HintRenderer extends UIElement {

    static #instance;

    static {

        HintRenderer.#instance = new HintRenderer({
            name: 'Hints',
            classes: 'bottom right'
        });
    }

    #label;

    constructor(options) { 

        super(options);

        this.#label = createElement({
            parent: this.element,
            tag: 'span'
        });
        this.update();
        this.element.addEventListener("click", Hint.get, false);

        Events.Subscribe(Events.List.HintUsed, this.update.bind(this));
        Events.Subscribe(Events.List.ResourceChanged, this.update.bind(this));
    }

    update(options) {

        this.#label.innerHTML = `${Hint.count}/${Hint.max} <u>h</u>ints`;
    }
}
