import Events from "../../core/events.mjs";
import GameObject from "../gameObject.mjs";

export default class Cell extends GameObject {

    #grid;
    #x;
    #y;
    #digit;
    #color;
    #squareCoords;
    #renderText;

    #prefill = false;
    #known = false;
    #wrongGuess = false;
    #active = false;
    #highlight = false;
    #effects = [];
    #notes = [];

    get x() { return this.#x; }
    get y() { return this.#y; }
    get digit() { return this.#digit; }
    get color() { return this.#color; }
    get effects() { return this.#effects; }

    get prefill() { return this.#prefill; }
    set prefill(value) { 
        if(value == this.#prefill) return;
        this.#prefill = value; 
        this.renderer.update();
    }
    get known() { return this.#known || this.#prefill }
    set known(value) { 
        if(value == this.#known) return;
        if(this.#prefill) return;
        this.#known = value; 
        this.renderer.update();
    }
    get wrongGuess() { return this.#wrongGuess; }
    set wrongGuess(value) { 
        if(value == this.#wrongGuess) return;
        if(this.#prefill) return;
        this.#wrongGuess = value; 
        this.renderer.update();
    }

    get renderText() {

        if(this.#renderText) {
            return this.#renderText;
        } else if(this.#prefill || this.#known) {
            return this.#digit;
        }
    }
    set renderText(value) {
        if(value == this.#renderText) return;
        this.#renderText = value;
        this.renderer.update();
    }

    get active() { return this.#active; }
    set active(value) { 

        if(this.#active == value) return;

        if(value == true) {
            if(this.#grid.active) {
                this.#grid.active.active = false;
            }
            this.#grid.active = this;
        }

        const that = this;
        this.#grid.cells.forEach(function deActivate(cell) {
            if(cell == that) return;
            // cell.active = false;
            cell.highlight = value == true && (cell.x == that.x || cell.y == that.y);
        })
        this.#active = value;

        this.renderer.update();
    }

    get highlight() { return this.#highlight; }
    set highlight(value) { 

        this.#highlight = value;
        this.renderer.update();
    }

    get notes() { return this.#notes; }
    addHint(note) {

        if(!this.#notes.includes(note)) {
            this.#notes.push(note);
            this.renderer.update();
        }
    }

    removeHint(note) {

        this.#notes.removeItem(note);
        this.renderer.update();
    }

    toggleNote(note) {

        if(!this.#notes.includes(note)) {
            this.#notes.push(note);
        } else {
            this.#notes.removeItem(note);
        }
        this.renderer.update();
    }

    get squareCoords() {

        if(!this.#squareCoords) {

            let x = Math.floor(this.x / this.#grid.size);
            let y = Math.floor(this.y / this.#grid.size);

            this.#squareCoords = {
                x,
                y
            };
        }

        return this.#squareCoords;
    }

    get rowCells() {

        const cells = [];
        for(var x = 0; x < (this.#grid.size * this.#grid.size); x++) {
            cells.push(this.#grid.cell(x, this.y));
        }

        return cells;
    }

    get colCells() {

        const cells = [];
        for(var y = 0; y < (this.#grid.size * this.#grid.size); y++) {
            cells.push(this.#grid.cell(this.x, y));
        }

        return cells;
    }

    get squareCells() {

        return this.#grid.getCells(cell => cell.squareCoords.x == this.squareCoords.x 
            && cell.squareCoords.y == this.squareCoords.y);
    }

    get connectedCells() {

        const cells = [
            ...this.rowCells,
            ...this.colCells,
            ...this.squareCells,
        ];

        return cells;
    }

    get adjacentCells() {

        return this.#grid.getCells(cell => Math.abs(cell.x - this.x) + Math.abs(cell.y - this.y) == 1)
    }

    get exclusions() {

        const exclusions = [];

        this.connectedCells.forEach(function(cell) {
            if(cell.digit) exclusions.push(cell.digit);
        });

        return exclusions;
    }
    
    get effects() { return this.#effects; }

    constructor(options) {

        // TODO: assert options

        super(options);

        this.#grid = options.grid;
        this.#x = options.x;
        this.#y = options.y;
        this.#digit = options.digit;
        this.#color = options.color;

        // super.postConstruct();
    }

    addEffect(effect) {

        this.#effects.push(effect);
        Events.RaiseEvent(Events.List.EffectAdded, {
            effect,
            cell: this
        });
    }

    removeEffect(effect) {

        const index = this.#effects.indexOf(effect);
        if(index > -1) {
            this.#effects = this.#effects.splice(index, 1);
        }
        Events.RaiseEvent(Events.List.EffectRemoved, {
            effect,
            cell: this
        });
    }
}
