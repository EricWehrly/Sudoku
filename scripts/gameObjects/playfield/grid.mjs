import GameObject from "../gameObject.mjs";

export default class Grid extends GameObject {

    #size = 0;

    get size() { return this.#size; }

    /**
     * 
     * @param {Object} options 
     * @param {int} options.size Number of cells to a side in the grid (will always be square)
     */
    constructor(options) {

        super(options);

        // assert size is an int?

        this.#size = options?.size || 3;

        // cells, (rows and cols?)
        super.postConstruct();
    }
}
