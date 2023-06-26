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
  let gem1;
  let gem2;

  beforeEach(function () {
    grid = [
      [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥝' }], // match if you swap 🥝 & 🥥
      [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥥' }],
      [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
    ];

    gridAfterSwap = [
      [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' }],
      [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥝' }],
      [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
    ];

    gem1 = { row: 0, col: 2, type: '🥝' };
    gem2 = { row: 1, col: 2, type: '🥥' };
    gem3 = { row: 1, col: 2, gem: '🍉' };

    bj = new Bejeweled();
    bj.grid = grid;

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
      let match = [gridAfterSwap[0][0], gridAfterSwap[0][1], gridAfterSwap[0][2]];
      bj.updateScore(match);
      expect(bj.score).to.equal(3);
    });
  });

  // *******************
  // INTEGRATION TESTS
  // *******************
  describe('findMatches()', function () {

  });

  describe('dealWithMatches(matches)', function () {

  });

  describe('clearMatches(matches)', function () {

  });
});
