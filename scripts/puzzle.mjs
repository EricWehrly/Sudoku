// Sudoku generator
// Author: Sitian Liu
// https://gist.github.com/goldensunliu/652310e65c4b3565bf9c4056d37e4a54

function randomChoice(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
  }
  
  export function range(n) {
    return Array.from(Array(n).keys());
  }
  
  // TODO use immutable when this is all working
  export default function Puzzle() {
    while (true) {
      try {
        const puzzle = Array.from(Array(9).keys()).map(() => Array.from(Array(9).keys()));
        const rows = Array.from(Array(9).keys()).map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        const columns = Array.from(Array(9).keys()).map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        const squares = Array.from(Array(9).keys()).map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        Array.from(Array(9).keys()).forEach((i) => {
          Array.from(Array(9).keys()).forEach((j) => {
            const row = rows[i];
            const column = columns[j];
            const square = squares[((Math.floor(i / 3)) * 3) + Math.floor(j / 3)];
            const choices = [...row].filter(x => column.has(x)).filter(x => square.has(x));
            const choice = randomChoice(choices);
            if (!choice) {
              // eslint-disable-next-line no-throw-literal
              throw 'dead end';
            }
            puzzle[i][j] = choice;
            column.delete(choice);
            row.delete(choice);
            square.delete(choice);
          });
        });
        return puzzle;
      } catch (e) {
        // eslint-disable-next-line no-continue
        continue;
      }
    }
  }
