import Grid from "./gameObjects/playfield/grid.mjs";
import "./rendering/dom/gameObjects/grid.mjs"
import './input/keyboard.mjs';
import Events from "./core/events.mjs";
import Ability from "./gameObjects/abilities/ability.mjs";
import GameOption from "./core/gameOptions.mjs";

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
    value: true
});

console.log(GameOption.ShowCoordinates);

const grid = new Grid({
    size: GAME_GRID_SIZE
});

const gameStartOptions = { finalFire: true };
Events.RaiseEvent(Events.List.GameStart, null, gameStartOptions);

function eligibleCells(cell) {

    return cell.digit == 6
        && cell.visible;
}

function sixesPointToTwoes() {

    const cells = grid.getCells(eligibleCells);
    console.log(cells);
    cells.forEach(function(cell) {
        
        // for each of 4 directions
        // march until end of direction
        // if 2, change box text and stop
    });
}

new Ability({
    trigger: Events.List.SudokuGuess,
    action: sixesPointToTwoes
});
