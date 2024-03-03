import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import Grid from '../../../../scripts/gameObjects/playfield/grid.mjs';

describe('cell', () => {
    describe('rowCells', () => {

       const grid = new Grid();

       const cell00 = grid.addCell(0, 0);
       const cell10 = grid.addCell(1, 0);
       const cell20 = grid.addCell(2, 0);
       const cell01 = grid.addCell(0, 1);

        it('should get cells in the same row', () => {
            
            const rowCells = cell10.rowCells;
    
            assert.equal(true, rowCells.includes(cell00));
            assert.equal(true, rowCells.includes(cell10));
            assert.equal(true, rowCells.includes(cell20));
        });

        it('should not get cells in the next row', () => {

            assert.equal(false, cell10.rowCells.includes(cell01));
            assert.equal(false, cell01.rowCells.includes(cell10));
        });
    });
});
