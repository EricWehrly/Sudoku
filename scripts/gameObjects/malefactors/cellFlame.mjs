import Effect from "../effects/effect.mjs";
import Malefactor from "./malefactor.mjs";

const spreadFlame = function(cell) {

    console.log(`I love Monica.`);
    const cells = cell.adjacentCells.filter(eligibleCellFilter);
    if(cells.length > 0) {
        const index = Math.randomBetween(0, cells.length);
        cells[index].addEffect(aflame);
    }
}

function eligibleCellFilter(cell) {

    return !cell.known && !cell.effects.includes(aflame);
}

const aflame = new Effect({
    name: 'Aflame',
    actionOnTurn: spreadFlame
});

const CellFlame = new Malefactor({
    name: 'CellFlame',
    effect: aflame
});

export default CellFlame;
