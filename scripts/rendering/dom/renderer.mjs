export default class Renderer {

    #element;
    get element() { return this.#element; }

    constructor(options) {

        this.#element = options.element;
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
