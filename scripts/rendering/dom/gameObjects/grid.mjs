import Events from '../../../core/events.mjs'
import Grid from "../../../gameObjects/gameObject.mjs"
import CellRenderer from './cell.mjs';

// document.body
// const renderRoot = document.getElementById("game-container");
// console.log(renderRoot);

function rendercell(cell, containerElement) {

    // TODO: decorate each cell with row and column classes
    // that will make some UI / ease of use features easier

    new CellRenderer({
        cell,
        containerElement
    });
}

function renderSquare(grid, squareX, squareY) {
    
    const square = document.createElement('div');
    square.className = 'square';

    grid.graphic.appendChild(square);

    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex-container';
    square.appendChild(flexContainer);

    for(var y = 0; y < grid.size; y++) {
        for(var x = 0; x < grid.size; x++) {
            const cell = grid.cell(x + (squareX * grid.size), y + (squareY * grid.size));
            rendercell(cell, flexContainer);
        }
    }
}

function renderGrid(grid) {

    grid.graphic = document.createElement('div');
    grid.graphic.className = 'grid flex-container';

    // TODO: replace "document.body" with a fetch to (static) Renderer (property)
    const renderRoot = document.getElementById("game-container");
    renderRoot.appendChild(grid.graphic);

    for(var y = 0; y < grid.size; y++) {
        for(var x = 0; x < grid.size; x++) {
            renderSquare(grid, x, y);
        }
    }

}

Events.Subscribe(Events.List.GameObjectCreated, function(gameObject) {

    if(gameObject instanceof Grid) {
        renderGrid(gameObject);
    }
}.bind(this));
