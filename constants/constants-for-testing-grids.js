/* -----------------------------------
 * SCENARIO 1: match
 * ----------------------------------- */
const grid = [
    [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥝' }], // match if you swap 🥝 & 🥥
    [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥥' }],
    [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
];

const rowsAndCols = [
    [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥝' }], // row 1
    [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥥' }], // row 2
    [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }], // row 3
    [{ row: 0, col: 0, type: '🥥' }, { row: 1, col: 0, type: '🍉' }, { row: 2, col: 0, type: '🍓' }], // col 1
    [{ row: 0, col: 1, type: '🥥' }, { row: 1, col: 1, type: '🍓' }, { row: 2, col: 1, type: '🥝' }], // col 2
    [{ row: 0, col: 2, type: '🥝' }, { row: 1, col: 2, type: '🥥' }, { row: 2, col: 2, type: '🥝' }], // col 3
];

const rowWith0Matches = grid[0];

const gem1 = { row: 0, col: 2, type: '🥝' };
const gem2 = { row: 1, col: 2, type: '🥥' };
const gem3 = { row: 1, col: 2, gem: '🍉' };
const gem4 = { row: 0, col: 1, type: '🥥' };


/* -----------------------------------
 * SCENARIO 2: 1 match
 * ----------------------------------- */
const gridAfterSwap = [
    [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' }],
    [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥝' }],
    [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
];

const match1 = [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' }];
const matches1 = [match1];


/* -----------------------------------
 * SCENARIO 3: 2 matches
 * ----------------------------------- */
const gridAfterSwap2 = [
    [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' }],
    [{ row: 1, col: 0, type: '🥝' }, { row: 1, col: 1, type: '🥝' }, { row: 1, col: 2, type: '🥝' }],
    [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
];

const match2 = [gridAfterSwap2[1][0], gridAfterSwap2[1][1], gridAfterSwap2[1][2]];
const matches2 = [match1, match2];


/* -----------------------------------
 * SCENARIO 4: 2 matches in same row
 * ----------------------------------- */
const match3 = [{ row: 0, col: 3, type: '🍉' }, { row: 0, col: 4, type: '🍉' }, { row: 0, col: 5, type: '🍉' }];
const rowWith2Matches = [
    { row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' },
    { row: 0, col: 3, type: '🍉' }, { row: 0, col: 4, type: '🍉' }, { row: 0, col: 5, type: '🍉' }
];

const matches3 = [match1, match3];


/* -----------------------------------
 * SCENARIO 5: 1 match of 4
 * ----------------------------------- */
const rowWithMatchof4 = [
    { row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🍉' }, { row: 0, col: 3, type: '🥝' },
    { row: 0, col: 4, type: '🥝' }, { row: 0, col: 5, type: '🥝' }, { row: 0, col: 6, type: '🥝' }, { row: 0, col: 7, type: '🥝' }
];

const matches4 = [
    [
        { row: 0, col: 3, type: '🥝' }, { row: 0, col: 4, type: '🥝' }, { row: 0, col: 5, type: '🥝' }, { row: 0, col: 6, type: '🥝' }, { row: 0, col: 7, type: '🥝' }
    ]
];

module.exports = {
    grid,
    rowsAndCols,
    rowWith0Matches,
    gem1,
    gem2,
    gem3,
    gem4,
    gridAfterSwap,
    match1,
    matches1,
    gridAfterSwap2,
    match2,
    matches2,
    match3,
    rowWith2Matches,
    matches3,
    rowWithMatchof4,
    matches4
}