import Grid from "./gameObjects/playfield/grid.mjs";
import "./rendering/dom/gameObjects/grid.mjs"
import './input/keyboard.mjs';
import Events from "./core/events.mjs";
import GameOption from "./core/gameOptions.mjs";
import './ui/ui.mjs';
import Abilities from "./gameObjects/abilities/abilities.mjs";
import EquipmentSlot from "./gameObjects/equipmentSlot.mjs";
import Malefactors from "./gameObjects/malefactors/malefactors.mjs";
import DumbHint from "./hints/dumbestHint.mjs";

const GAME_GRID_SIZE = 3;

// TODO: this (and the following block) should go to dom renderer
const gameContainer = document.createElement("div");
gameContainer.id = "game-container";
document.body.appendChild(gameContainer);

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

const righto = new EquipmentSlot({
    name: 'On Correct Guess',
    trigger: Events.List.SudokuGuessCorrect
});
const wrongo = new EquipmentSlot({
    name: 'On Wrong Guess',
    trigger: Events.List.SudokuGuessWrong
});
new EquipmentSlot({
    name: 'On Number Completed',
    trigger: Events.List.SudokuNumberCompleted,
    size: 3
});

righto.equip(Abilities.AddHint);
wrongo.equip(Abilities.GetMoney);
