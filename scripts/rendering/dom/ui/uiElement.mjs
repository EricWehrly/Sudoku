import Renderer from "../renderer.mjs";

export default class UIElement extends Renderer {

    #name;
    get name() { return this.#name; }

    constructor(options = {}) {
        
        options.element = document.createElement('div');
        options.element.className = `ui ${options.name || ''} ${options.classes || ''}`;
        super(options);

        this.#name = options.name;
        
        if(options.parent) options.parent.appendChild(options.element);
        else {
            const renderRoot = document.getElementById("ui-container-parent");
            renderRoot.appendChild(options.element);
        }
    }
}
