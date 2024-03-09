import Grid from "./gameObjects/playfield/grid.mjs";
import "./rendering/dom/gameObjects/grid.mjs"
import './input/keyboard.mjs';
import Events from "./core/events.mjs";
import Ability from "./gameObjects/abilities/ability.mjs";
import GameOption from "./core/gameOptions.mjs";
import './ui/ui.mjs';
import sixesPointToTwoes from "./gameObjects/abilities/sixesPointToTwoes.mjs";
import EquipmentSlot from "./gameObjects/equipmentSlot.mjs";
import Malefactors from "./gameObjects/malefactors/malefactors.mjs";

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
    value: false
});

new Grid({
    size: GAME_GRID_SIZE,
    prefillCount: 24
});

const gameStartOptions = { finalFire: true };
Events.RaiseEvent(Events.List.GameStart, null, gameStartOptions);

function visionCallback(options) {

   const { ability, cell } = options;
   if(ability.level > 0) {
        Grid.Grid.cells.forEach(function highlight(gridCell) {
            if(gridCell.active) return;
            gridCell.highlight = (cell.x == gridCell.x || cell.y == gridCell.y);
        });
   }
}

const visionAbility = new Ability({

    trigger: Events.List.CellActive,
    action: visionCallback,
    maxLevel: 3
});
visionAbility.level++;

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

// Events.RaiseEvent(Events.List.SudokuSquareCorrect, {});

// equip1.equip(sixesAbility);
equip2.equip(visionAbility);
