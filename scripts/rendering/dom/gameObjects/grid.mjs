import Events from '../../../core/events.mjs'
import Grid from "../../../gameObjects/gameObject.mjs"
import Renderer from '../renderer.mjs';
import CellRenderer from './cell.mjs';

// const renderRoot = document.getElementById("game-container");

export default class GridRenderer extends Renderer {

    #grid;

    constructor(grid) {

        grid.element = document.createElement('div');
        grid.element.className = 'grid flex-container';
        super(grid);
        grid.renderer = this;
        this.#grid = grid;
    
        // TODO: replace "document.body" with a fetch to (static) Renderer (property)
        const renderRoot = document.getElementById("game-container");
        renderRoot.appendChild(grid.element);
        const style = window.getComputedStyle(this.element);
        this.element.setAttribute('desiredDisplay', style.display);
    
        for(var y = 0; y < grid.size; y++) {
            for(var x = 0; x < grid.size; x++) {
                this.#renderSquare(grid, x, y);
            }
        }
    }

    update() {
        
        if(this.#grid.visible) this.element.style.display = this.element.getAttribute('desiredDisplay');
        else this.element.style.display = 'none';
    }

    #renderSquare(grid, squareX, squareY) {
    
        const square = document.createElement('div');
        square.className = 'square';
    
        grid.element.appendChild(square);
    
        const flexContainer = document.createElement('div');
        flexContainer.className = 'flex-container';
        square.appendChild(flexContainer);
    
        for(var y = 0; y < grid.size; y++) {
            for(var x = 0; x < grid.size; x++) {
                const cell = grid.cell(x + (squareX * grid.size), y + (squareY * grid.size));
                this.#renderCell(cell, flexContainer);
            }
        }
    }

    #renderCell(cell, containerElement) {

        // TODO: decorate each cell with row and column classes
        // that will make some UI / ease of use features easier
    
        new CellRenderer({
            cell,
            containerElement
        });
    }
}

Events.Subscribe(Events.List.GameObjectCreated, function(gameObject) {

    if(gameObject instanceof Grid) {
        new GridRenderer(gameObject);
    }
}.bind(this));
