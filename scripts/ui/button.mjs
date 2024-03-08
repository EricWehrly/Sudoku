import UIElement from "../rendering/dom/ui/uiElement.mjs";

export default class Button extends UIElement {

    #action;
    #icon;
    get action() { return this.#action; }
    get icon() { return this.#icon; }
    set icon(value) {
        this.#icon = value;
        this.element.innerHTML = this.#icon;
    }

    constructor(options) {

        super(options);
        this.addClass('button');
        this.#action = options.action;
        if(options.icon) this.#icon = options.icon;

        if(this.icon) this.element.innerHTML = this.icon;        
        else this.element.innerHTML = this.name;

        this.element.addEventListener("click", this.action, false);
    }
}
