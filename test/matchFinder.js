const chai = require('chai');
const { expect } = require('chai');
const spies = require('chai-spies');
const importTestCases = require('./helpers/importTestCases.js');
const Cursor = require("../classes/cursor.js");
const Game = require("../classes/game.js");
const Gem = require("../classes/gem.js");
const MatchFinder = require("../classes/matchFinder.js");
const MatchHandler = require("../classes/matchHandler.js");
const Screen = require("../classes/screen.js");

chai.use(spies);

describe('Game', function () {
  let bj;
  
  beforeEach(()=> {
    importTestCases();
    bj = new Game();
    bj.grid = grid;
    Game.BOARD_SIZE = 3;
  });

  describe('findMatchesInRowOrCol(array)', function () {
    it('does not find match if array contains 0 matches', function () {
      expect(MatchFinder.findMatchesInRowOrCol(rowWith0Matches)).to.deep.equal([]);
    });

    it('finds match if array contains 1 match', function () {
      expect(MatchFinder.findMatchesInRowOrCol(match1)).to.deep.equal(matches1);
    });

    it('finds match if array contains 2 matches', function () {
      expect(MatchFinder.findMatchesInRowOrCol(rowWith2Matches)).to.deep.equal(matches3);
    });

    it('finds match if array contains a match of 2, and then 1 match', function () {
      expect(MatchFinder.findMatchesInRowOrCol(rowWithMatchof4)).to.deep.equal(matches4);
    });
  });

  describe('findMatches()', function () {
    it('does not find matches if there are 0 present', function () {
      expect(MatchFinder.findMatches(bj.grid)).to.deep.equal([]);
    });

    it('finds matches if there is 1 present', function () {
      bj.grid = gridAfterSwap;
      expect(MatchFinder.findMatches(bj.grid)).to.deep.equal(matches1);
    });

    it('finds matches if there are 2 present', function () {
      bj.grid = gridAfterSwap2;
      expect(MatchFinder.findMatches(bj.grid)).to.deep.equal(matches2);
    });
  });
});
