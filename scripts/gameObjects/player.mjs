class Player {

    #money = 0;
    get money() { return this.#money; }
    set money(value) { this.#money = value; }

    constructor(options) { }
}

export default new Player();
