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

    constructor(options) { 

        super(options);

        const element = createElement({
            parent: this.element,
            tag: 'span',
            innerText: `${Hint.count} / ${Hint.max} hinteroos`
        });

        // bind event on hint count change
    }
}
