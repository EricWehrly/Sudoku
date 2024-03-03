import Events from '../../../core/events.mjs'
import Grid from "../../../gameObjects/gameObject.mjs"

// document.body
// const renderRoot = document.getElementById("game-container");
// console.log(renderRoot);

function rendercell(grid, containerElement) {

    // TODO: decorate each cell with row and column classes
    // that will make some UI / ease of use features easier

    const cell = document.createElement('div');
    cell.className = 'cell';

    containerElement.appendChild(cell);
}

function renderSquare(grid) {
    
    const square = document.createElement('div');
    square.className = 'square';

    grid.graphic.appendChild(square);

    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex-container';
    square.appendChild(flexContainer);

    for(var x = 0; x < grid.size; x++) {
        for(var y = 0; y < grid.size; y++) {
            rendercell(grid, flexContainer);
        }
    }
}

function renderGrid(grid) {

    grid.graphic = document.createElement('div');
    grid.graphic.className = 'grid flex-container';

    // TODO: replace "document.body" with a fetch to (static) Renderer (property)
    const renderRoot = document.getElementById("game-container");
    renderRoot.appendChild(grid.graphic);

    for(var x = 0; x < grid.size; x++) {
        for(var y = 0; y < grid.size; y++) {
            renderSquare(grid);
        }
    }

}

Events.Subscribe(Events.List.GameObjectCreated, function(gameObject) {

    if(gameObject instanceof Grid) {
        renderGrid(gameObject);
    }
}.bind(this));
