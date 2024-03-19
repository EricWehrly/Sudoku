import { createElement } from "../../../util/javascript-extensions.mjs";
import Renderer from "../renderer.mjs";

export default class UIElement extends Renderer {

    #name;
    get name() { return this.#name; }

    constructor(options = {}) {

        if(!options.parent) options.parent = "ui-container-parent";
        options.element = createElement({
            classes: `ui ${options.name || ''} ${options.classes || ''}`,
            parent: options.parent
        });
        
        super(options);

        this.#name = options.name;
    }
}
