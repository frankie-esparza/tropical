const chai = require('chai');
const { expect } = require('chai');
const spies = require('chai-spies');
const importTestCases = require('./helpers/importTestCases.js');
const Cursor = require("../classes/cursor");
const Game = require("../classes/game");
const Gem = require("../classes/gem");
const MatchFinder = require("../classes/matchFinder");
const MatchHandler = require("../classes/matchHandler");
const Screen = require("../classes/screen");

chai.use(spies);

describe('Game', function () {
  let bj;

  beforeEach(()=> {
    importTestCases();
    bj = new Game();
    bj.grid = grid;
    Game.BOARD_SIZE = 3;
  });

  describe('getRandomGemType()', function () {
    it('returns a random gem', function () {
      let randomGem = Gem.getRandomGemType();
      expect(randomGem === GEM_TYPES[0] || randomGem === GEM_TYPES[1] || randomGem === GEM_TYPES[2] || randomGem === GEM_TYPES[3]).to.be.true;
    });
  });

  describe('swapGems()', function () {
    it('swaps the GEM_TYPES of the 2 gems specified, if swap results in match', function () {
      bj.selectedGems = [gem1, gem2];
      bj.swapGems();

      expect(bj.grid[gem1.row][gem1.col].type).to.equal('🥥');
      expect(bj.grid[gem2.row][gem2.col].type).to.equal('🥝');
    });
  });

  describe('selectGem()', function () {
    it('selects a gem when 0 gems have been selected previously', function () {
      bj.cursor.row = gem1.row;
      bj.cursor.col = gem1.col;

      bj.selectGem();
      expect(bj.selectedGems.length).to.equal(1);
    });

  });

  describe('getRowsAndCols()', function () {
    it('gets all rows and columns in the grid', function () {
      expect(MatchFinder.getRowsAndCols(bj.grid)).to.deep.equal(rowsAndCols);
    });
  });
});
  