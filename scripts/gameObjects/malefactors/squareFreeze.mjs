import Effect from "../effects/effect.mjs";
import Grid from "../playfield/grid.mjs";

export default function SquareFreeze() {

    // pick a random square
    // set a status effect of 'frozen' to each cell in the square

    const cells = Grid.Grid.cells;
    const cellIndex = Math.randomBetween(0, cells.length);
    const targetCells = cells[cellIndex].squareCells;

    const frozen = new Effect('Frozen');
    
    targetCells.forEach(cell => {
        cell.addEffect(frozen);
        // cell.renderer.element.style.backgroundColor = 'blue';
    });
}
