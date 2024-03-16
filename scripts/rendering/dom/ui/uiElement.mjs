import Renderer from "../renderer.mjs";

export default class UIElement extends Renderer {

    #parent;
    #name;
    get name() { return this.#name; }

    constructor(options = {}) {
        
        options.element = document.createElement('div');
        options.element.className = `ui ${options.name || ''} ${options.classes || ''}`;
        super(options);

        this.#name = options.name;
        
        if(options.parent) options.parent.appendChild(options.element);
        else {
            this.#parent = "ui-container-parent";
            this.#attachRoot();
        }
    }

    #attachRoot() {
        const renderRoot = document.getElementById(this.#parent);
        if(renderRoot) {
            renderRoot.appendChild(this.element);
        } else {
            // bleh, hack
            setTimeout(this.#attachRoot.bind(this), 10);
        }
    }
}
