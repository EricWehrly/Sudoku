import Events from '../../../core/events.mjs'
import Grid from "../../../gameObjects/gameObject.mjs"
import Renderer from '../renderer.mjs';
import CellRenderer from './cell.mjs';

// document.body
// const renderRoot = document.getElementById("game-container");
// console.log(renderRoot);

export default class GridRenderer extends Renderer {

    constructor(grid) {

        grid.element = document.createElement('div');
        grid.element.className = 'grid flex-container';
        super(grid);
    
        // TODO: replace "document.body" with a fetch to (static) Renderer (property)
        const renderRoot = document.getElementById("game-container");
        renderRoot.appendChild(grid.element);
    
        for(var y = 0; y < grid.size; y++) {
            for(var x = 0; x < grid.size; x++) {
                this.#renderSquare(grid, x, y);
            }
        }
    
        // TODO: update for visibility
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
        // renderGrid(gameObject);
        new GridRenderer(gameObject);
    }
}.bind(this));
