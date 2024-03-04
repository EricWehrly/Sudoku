import Grid from "./gameObjects/playfield/grid.mjs";
import "./rendering/dom/gameObjects/grid.mjs"
import './input/keyboard.mjs';
import Events from "./core/events.mjs";
import Ability from "./gameObjects/abilities/ability.mjs";
import GameOption from "./core/gameOptions.mjs";
import './ui/ui.mjs';

const GAME_GRID_SIZE = 3;

// TODO: this (and the following block) should go to dom renderer
const gameContainer = document.createElement("div");
gameContainer.id = "game-container";
document.body.appendChild(gameContainer);

// compute font size based on grid size and window size
// trap to recompute on window resize
// I think we need to grab the "measure font height" func from Monolith
const maxFontHeight = Math.floor(window.innerHeight / (GAME_GRID_SIZE * GAME_GRID_SIZE));
document.body.style.fontSize = `${(maxFontHeight / 2)}px`;

new GameOption({
    name: 'ShowCoordinates',
    value: false
});

const grid = new Grid({
    size: GAME_GRID_SIZE
});
// grid.hide();

const gameStartOptions = { finalFire: true };
Events.RaiseEvent(Events.List.GameStart, null, gameStartOptions);

function eligibleCells(cell) {

    return cell.digit == 6
        && cell.known;
}

function sixesPointToTwoes() {

    const cells = grid.getCells(eligibleCells);
    cells.forEach(function(cell) {

        const matchingDigitCells = grid.getCells(function(gridCell) {
            return gridCell.digit == 2
        });

        const hasLeft = matchingDigitCells.filter(function(gridCell) {
            return gridCell.y == cell.y
            && gridCell.x < cell.x
        });
        if(hasLeft.length > 0) cell.renderText += 'W';
        
        const hasRight = matchingDigitCells.filter(function(gridCell) {
            return gridCell.y == cell.y
            && gridCell.x > cell.x
        });
        if(hasRight.length > 0) cell.renderText += 'E';
        
        const hasAbove = matchingDigitCells.filter(function(gridCell) {
            return gridCell.x == cell.x
            && gridCell.y < cell.y
        });
        if(hasAbove.length > 0) cell.renderText += 'N';
        
        const hasBelow = matchingDigitCells.filter(function(gridCell) {
            return gridCell.x == cell.x
            && gridCell.y > cell.y
        });
        if(hasBelow.length > 0) cell.renderText += 'S';
    });
}

new Ability({
    trigger: Events.List.SudokuGuess,
    action: sixesPointToTwoes
});
