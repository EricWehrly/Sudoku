export default class CellRenderer {

    #cell;

    constructor(options) {

        // TODO: assert options
        
        this.#cell = options.cell;
        this.#cell.element = document.createElement('div');
        this.#cell.element.className = 'cell';

        options.containerElement.appendChild(this.#cell.element);
    }
}
