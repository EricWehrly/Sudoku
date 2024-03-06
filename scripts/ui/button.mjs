import Renderer from "../rendering/dom/renderer.mjs";

export default class Button extends Renderer {

    #name;
    #action;
    #icon;
    get name() { return this.#name; }
    get action() { return this.#action; }
    get icon() { return this.#icon; }

    constructor(options) {

        options.element = document.createElement('div');
        options.element.className = `ui button ${options.name} ${options.classes}`;
        super(options);
        this.#name = options.name;
        this.#action = options.action;
        if(options.icon) this.#icon = options.icon;

        if(this.icon) this.element.innerHTML = this.icon;        
        else this.element.innerHTML = this.name;
        
        const renderRoot = document.getElementById("ui-container-parent");
        renderRoot.appendChild(options.element);

        this.element.addEventListener("click", this.action, false);
    }
}
