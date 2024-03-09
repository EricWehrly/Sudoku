import Events from "../../core/events.mjs";
import Effect from "../effects/effect.mjs";
import Grid from "../playfield/grid.mjs";
import Malefactor from "./malefactor.mjs";

const frozen = new Effect('Frozen');

function squareFreeze() {

    // pick a random square
    // set a status effect of 'frozen' to each cell in the square

    const cells = Grid.Grid.cells;
    // TODO: In the future, we should deliberately target one of the less filled out squares
    const cellIndex = Math.randomBetween(0, cells.length);
    const targetCells = cells[cellIndex].squareCells;
    
    targetCells.forEach(cell => {
        cell.addEffect(frozen);
    });

    Events.Subscribe(Events.List.SudokuGuessCorrect, checkUnfreeze);
}

function checkUnfreeze(details) {

    const cells = details.cell.connectedCells;
    cells.forEach(cell => {
        cell.removeEffect(frozen);
    });
}

const SquareFreeze = new Malefactor({
    name: 'SquareFreeze',
    onEnable: squareFreeze
});

export default SquareFreeze;
