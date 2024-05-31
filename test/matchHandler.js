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


  describe('makeAllGemsFall(column)', function () {
    it('makes all gems fall when theres a falling gems present', function () {
      expect(MatchHandler.makeAllGemsFall(col3)).to.deep.equal(col3_afterAllGemsFall);
      expect(MatchHandler.makeAllGemsFall(col4)).to.deep.equal(col4_afterAllGemsFall);
    });
  });

  describe('findAndStarMatches()', function () {
    let bj;
    let grid_beforeStar;
    let grid_afterStar;


    beforeEach(function () {
      bj = new Game();

      grid_beforeStar = [
        [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' }],
        [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥝' }],
        [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
      ];

      grid_afterStar = [
        [{ row: 0, col: 0, type: '⭐️' }, { row: 0, col: 1, type: '⭐️' }, { row: 0, col: 2, type: '⭐️' }],
        [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥝' }],
        [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
      ];

    });

    it('should star all matches', function () {
      bj.grid = grid_beforeStar;
      bj.findAndStarMatches();
      expect(bj.grid).to.deep.equal(grid_afterStar);
    });
  });

  describe('handleMatches()', function () {
    let bj;
    let grid_beforeStar;
    let grid_afterStar;


    beforeEach(function () {
      bj = new Game();

      grid_beforeStar = [
        [{ row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🥥' }],
        [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥝' }],
        [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
      ];

      grid_afterStar = [
        [{ row: 0, col: 0, type: '⭐️' }, { row: 0, col: 1, type: '⭐️' }, { row: 0, col: 2, type: '⭐️' }],
        [{ row: 1, col: 0, type: '🍉' }, { row: 1, col: 1, type: '🍓' }, { row: 1, col: 2, type: '🥝' }],
        [{ row: 2, col: 0, type: '🍓' }, { row: 2, col: 1, type: '🥝' }, { row: 2, col: 2, type: '🥝' }],
      ];

    });

    it('should call makeAllGemsFall() & addRandomGemsAtTop() once for each column', function () {
      bj.grid = grid_afterStar;

      let spy2 = chai.spy.on(MatchHandler, 'makeAllGemsFall');
      let spy3 = chai.spy.on(MatchHandler, 'addRandomGemsAtTop');

      MatchHandler.handleMatches(bj.grid);

      expect(spy2).to.have.been.called.exactly(3);
      expect(spy3).to.have.been.called.exactly(3);
    });
  });


});
