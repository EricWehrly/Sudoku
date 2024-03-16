import Grid from "../gameObjects/playfield/grid.mjs";
import Hint from "./hint.mjs";

function findHintCell() {

    const cells = Grid.Grid.cells;
    let index = 0;
    while(index < cells.length && cells[index].known) index++;

    return cells[index];
}

const DumbHint = new Hint({
    findCell: findHintCell
});

export default DumbHint;
