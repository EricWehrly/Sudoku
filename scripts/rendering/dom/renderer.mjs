export default class Renderer {

    #element;
    get element() { return this.#element; }

    constructor(options) {

        this.#element = options.element;

        const style = window.getComputedStyle(this.element);
        if(style.display) this.element.setAttribute('desiredDisplay', style.display);
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
