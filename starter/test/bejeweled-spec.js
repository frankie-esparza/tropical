const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");

describe('Bejeweled', function () {
  // Instructions:
  // Add tests for setting up a basic board
  // Add tests for a valid swap that matches 3
  // Add tests for swaps that set up combos
  // Add tests to check if there are no possible valid moves

  // Todos:
  // - add chai spies tests

  const gemTypes = ['🥥', '🍓', '🥝', '🍉']; // keep this array at length 4 for tests below

  let bj;
  let grid;
  let gridAfterSwap;
  let gridAfterSwap2;

  let gem1;
  let gem2;

  let match1;
  let match2;
  let match3;

  let matches1;
  let matches2;
  let matches3;

  let rowsAndCols;
  let rowWith2Matches;
  let rowWith0Matches;

  beforeEach(function () {
    // *************************************
    // SCENARIO 1: 1 match, before swap (THIS GRID IS USED FOR MOST TESTS BELOW)
    grid = [
      [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥝' }], // match if you swap 🥝 & 🥥
      [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥥' }],
      [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
    ];

    rowsAndCols = [
      [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥝' }], // row 1
      [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥥' }], // row 2
      [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }], // row 3
      [{ row: 0, col: 0, type: '🥥' }, { row: 1, col: 0, type: '🍉' }, { row: 2, col: 0, type: '🍓' }], // col 1
      [{ row: 0, col: 1, type: '🥥' }, { row: 1, col: 1, type: '🍓' }, { row: 2, col: 1, type: '🥝' }], // col 2
      [{ row: 0, col: 2, type: '🥝' }, { row: 1, col: 2, type: '🥥' }, { row: 2, col: 2, type: '🥝' }], // col 3
    ];

    rowWith0Matches = grid[0];

    bj = new Bejeweled();
    bj.grid = grid;
    Bejeweled.boardSize = 3;

    gem1 = { row: 0, col: 2, type: '🥝' };
    gem2 = { row: 1, col: 2, type: '🥥' };
    gem3 = { row: 1, col: 2, gem: '🍉' };

    // *************************************
    // SCENARIO 2: 1 match, after swap
    gridAfterSwap = [
      [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' }],
      [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥝' }],
      [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
    ];

    match1 = [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' }];
    matches1 = [match1];

    // *************************************
    // SCENARIO 3: 2 matches, after swap
    gridAfterSwap2 = [
      [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' }],
      [{ row: 1, col: 0, type: '🥝' }, { row: 1, col: 1, type: '🥝' }, { row: 1, col: 2, type: '🥝' }],
      [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
    ];

    match2 = [gridAfterSwap2[1][0], gridAfterSwap2[1][1], gridAfterSwap2[1][2]];
    matches2 = [match1, match2];

    // *************************************
    // SCENARIO 4: 2 matches in same row
    match3 = [{ row: 0, col: 3, type: '🍉' }, { row: 0, col: 4, type: '🍉' }, { row: 0, col: 5, type: '🍉' }];

    rowWith2Matches = [
      { row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' },
      { row: 0, col: 3, type: '🍉' }, { row: 0, col: 4, type: '🍉' }, { row: 0, col: 5, type: '🍉' }
    ];

    matches3 = [match1, match3];
  });


  // *******************
  // UNIT TESTS
  // *******************
  describe('getRandomGemType()', function () {
    it('returns a random gem', function () {
      let randomGem = Bejeweled.getRandomGemType();
      expect(randomGem === gemTypes[0] || randomGem === gemTypes[1] || randomGem === gemTypes[2] || randomGem === gemTypes[3]).to.be.true;
    });
  });

  describe('getGemAbove(gem)', function () {
    it('returns the gem above', function () {
      expect(bj.getGemAbove(gem2)).to.deep.equal(gem1);
    });
  });

  describe('changeGemType(gem, gemType)', function () {
    it('replace gem with new gem specified', function () {
      let gem = gem2;
      let gemType = '🍉';

      bj.changeGemType(gem, '🍉');
      expect(bj.grid[gem.row][gem.col].type).to.equal(gemType);
    });
  });

  describe('swapGems(gem1, gem2)', function () {
    it('swaps the gemTypes of the 2 gems specified', function () {
      bj.swapGems(gem1, gem2);
      expect(bj.grid[gem1.row][gem1.col].type).to.equal('🥥');
      expect(bj.grid[gem2.row][gem2.col].type).to.equal('🥝');
    });
  });

  describe('selectGem(gem)', function () {
    it('selects a gem when 0 gems have been selected previously', function () {
      bj.selectGem(gem1);
      expect(bj.selectedGems.length).to.equal(1);
    });

    it('selects a gem when 1 gem has been selected previously', function () {
      bj.selectedGems = [gem1];
      bj.selectGem(gem2);
      expect(bj.selectedGems.length).to.equal(2);
    });

    it('does not select a gem when 2 gems have been selected previously', function () {
      bj.selectedGems = [gem1, gem2];
      bj.selectGem(gem3);
      expect(bj.selectedGems.length).to.equal(2);
    });
  });

  describe('updateScore(match)', function () {
    it('adds 1 point for each gem matched', function () {
      bj.updateScore(match1);
      expect(bj.score).to.equal(3);
    });
  });

  describe('getRowsAndCols()', function () {
    it('gets all rows and columns in the grid', function () {
      expect(bj.getRowsAndCols()).to.deep.equal(rowsAndCols);
    });
  });

  describe('findMatchesInArray(array)', function () {
    it('does not find match if array contains 0 matches', function () {
      expect(Bejeweled.findMatchesInArray(rowWith0Matches)).to.deep.equal([]);
    });

    it('finds match if array contains 1 match', function () {
      expect(Bejeweled.findMatchesInArray(match1)).to.deep.equal(matches1);
    });

    it('finds match if array contains 2 matches', function () {
      expect(Bejeweled.findMatchesInArray(rowWith2Matches)).to.deep.equal(matches3);
    });
  });


  // *******************
  // INTEGRATION TESTS
  // *******************
  describe('findMatches()', function () {
    it('does not find matches if there are 0 present', function () {
      expect(bj.findMatches()).to.deep.equal([]);
    });

    it('finds matches if there is 1 present', function () {
      bj.grid = gridAfterSwap;
      expect(bj.findMatches()).to.deep.equal(matches1);
    });

    it('finds matches if there are 2 present', function () {
      bj.grid = gridAfterSwap2;
      expect(bj.findMatches()).to.deep.equal(matches2);
    });
  });

  describe('dealWithMatches(matches)', function () {

  });

  describe('clearMatches(matches)', function () {

  });
});
