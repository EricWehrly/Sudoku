import Grid from "./gameObjects/playfield/grid.mjs";
import "./rendering/dom/gameObjects/grid.mjs"
import './input/keyboard.mjs';
import Events from "./core/events.mjs";
import Ability from "./gameObjects/abilities/ability.mjs";
import GameOption from "./core/gameOptions.mjs";
import './ui/ui.mjs';
import sixesPointToTwoes from "./gameObjects/abilities/sixesPointToTwoes.mjs";
import EquipmentSlot from "./gameObjects/equipmentSlot.mjs";
import SquareFreeze from "./gameObjects/malefactors/squareFreeze.mjs";

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
// we'll need to make a generic 'menu' thing here ...
new GameOption({
    name: 'ShowAbilitiesMenu',
    value: false
});

new GameOption({
    name: 'NotesMode',
    value: true
});

new Grid({
    size: GAME_GRID_SIZE
});

const gameStartOptions = { finalFire: true };
Events.RaiseEvent(Events.List.GameStart, null, gameStartOptions);

const sixesAbility = new Ability({
    trigger: Events.List.SudokuGuess,
    action: sixesPointToTwoes
});

const equip1 = new EquipmentSlot({
    name: 'On Sudoku Guess',
    trigger: Events.List.SudokuGuess
});
const equip2 = new EquipmentSlot({
    size: 3
});

equip1.equip(sixesAbility);

SquareFreeze();
