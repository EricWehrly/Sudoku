import Events from "../../core/events.mjs";
import Grid from "../playfield/grid.mjs";
import Ability from "./ability.mjs";

function shouldHighlight(activeCell, targetCell, abilityLevel) {
    
    if(abilityLevel > 0
        && (activeCell.x == targetCell.x || activeCell.y == targetCell.y)) {
            return true;
    }

    // TODO: add another ability level that highlights cells in the same square as the originally active cell

    if(abilityLevel > 1
        && activeCell.known
        && targetCell.known
        && (activeCell.digit == targetCell.digit)) {

            if(abilityLevel > 2) {
                Grid.Grid.cells.forEach(function highlight(gridCell) {
                    if(gridCell.active == true || gridCell.highlight == true) return;
                    gridCell.highlight = shouldHighlight(targetCell, gridCell, abilityLevel);
                });
            }
            return true;
    }

    if(targetCell.highlight == true) return true;
    return false;
}

function visionCallback(options) {

   const { ability, cell } = options;
   if(ability.level > 0) {
        Grid.Grid.cells.forEach(function highlight(gridCell) {
            if(gridCell.active) return;
            gridCell.highlight = shouldHighlight(cell, gridCell, ability.level);
        });
   }
}

const CellVision = new Ability({
    name: 'Enhanced Cell Vision',
    trigger: Events.List.CellActive,
    callback: visionCallback,
    maxLevel: 3
});

export default CellVision;
