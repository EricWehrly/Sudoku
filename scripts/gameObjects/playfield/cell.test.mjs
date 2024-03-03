import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import Cell from './cell.mjs';

describe('cell', () => {
    describe('squareCoords', () => {

        const grid = {
            size: 3
        };
    
        it('should resolve the first square', () => {

            const cell = new Cell({
                x: 2,
                y: 0,
                grid
            });
            const coords = cell.squareCoords;
    
            assert.equal(coords.x, 0);
            assert.equal(coords.y, 0);
        });
    
        it('should resolve the second column', () => {

            const cell = new Cell({
                x: 3,
                y: 0,
                grid
            });
            const coords = cell.squareCoords;
    
            assert.equal(coords.x, 1);
            assert.equal(coords.y, 0);
        });
    
        it('should resolve the second row', () => {

            const cell = new Cell({
                x: 1,
                y: 5,
                grid
            });
            const coords = cell.squareCoords;
    
            assert.equal(coords.x, 0);
            assert.equal(coords.y, 1);
        });
    
        it('should resolve the middle square', () => {

            const cell = new Cell({
                x: 4,
                y: 5,
                grid
            });
            const coords = cell.squareCoords;
    
            assert.equal(coords.x, 1);
            assert.equal(coords.y, 1);
        });
    
        it('should resolve the far corner', () => {

            const cell = new Cell({
                x: 8,
                y: 8,
                grid
            });
            const coords = cell.squareCoords;
    
            assert.equal(coords.x, 2);
            assert.equal(coords.y, 2);
        });
    
        it('should work on different size grid', () => {

            const bigGrid = {
                size: 8
            };

            const cell = new Cell({
                x: 40,
                y: 60,
                grid: bigGrid
            });
            const coords = cell.squareCoords;
    
            assert.equal(coords.x, 5);
            assert.equal(coords.y, 7);
        });
    });
});
