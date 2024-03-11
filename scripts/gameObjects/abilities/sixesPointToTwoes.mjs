import Grid from "../playfield/grid.mjs";
import Ability from "./ability.mjs";
import Events from "../../core/events.mjs";

function sixesPointToTwoes() {

    const grid = Grid.Grid;

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

function eligibleCells(cell) {

    return cell.digit == 6
        && cell.known;
}

const SixesPointToTwoes = new Ability({
    name: 'Sixes Point to Twoes',
    trigger: Events.List.SudokuGuess,
    callback: sixesPointToTwoes
});

export default SixesPointToTwoes;
