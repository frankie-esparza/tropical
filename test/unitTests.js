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
  beforeEach(() => importTestCases());

  describe('findLowestStar(column)', function () {
    it('does NOT find lowest star when one is NOT present', function () {
      expect(MatchHandler.findLowestStar(col1)).to.be.deep.equal(lowestStar1);
    });
    it('finds lowest star when one is present', function () {
      expect(MatchHandler.findLowestStar(col2)).to.be.deep.equal(lowestStar2);
      expect(MatchHandler.findLowestStar(col3)).to.be.deep.equal(lowestStar3);
      expect(MatchHandler.findLowestStar(col4)).to.be.deep.equal(lowestStar4);
    });
  });

  describe('findLowestGemAboveStar(column, star)', function () {
    it('does NOT find lowest gem above star when one is NOT present', function () {
      expect(MatchHandler.findLowestGemAboveStar(col1, lowestStar1)).to.be.deep.equal(lowestGemAboveStar1);
      expect(MatchHandler.findLowestGemAboveStar(col2, lowestStar2)).to.be.deep.equal(lowestGemAboveStar2);
    });

    it('finds lowest gem above star when one is present', function () {
      expect(MatchHandler.findLowestGemAboveStar(col3, lowestStar3)).to.be.deep.equal(lowestGemAboveStar3);
      expect(MatchHandler.findLowestGemAboveStar(col4, lowestStar4)).to.be.deep.equal(lowestGemAboveStar4);
    });
  });

  describe('makeOneGemFall(column, star, gem)', function () {
    it('makes 1 gem fall when theres a falling gem present', function () {
      expect(MatchHandler.makeOneGemFall(col3, lowestStar3, lowestGemAboveStar3)).to.deep.equal(col3_afterFall);
      expect(MatchHandler.makeOneGemFall(col4, lowestStar4, lowestGemAboveStar4)).to.deep.equal(col4_afterFall);
    });
  });

  describe('addRandomGemsAtTop(column)', function () {
    it('should call getRandomGemType() for each star', function () {
      let spy = chai.spy.on(Gem, 'getRandomGemType');

      MatchHandler.addRandomGemsAtTop(col3_afterAllGemsFall);
      expect(spy).to.have.been.called.exactly(numStars3);

      MatchHandler.addRandomGemsAtTop(col1);
      expect(spy).to.have.been.called.exactly(numStars3); // since col1 has no stars, num times called should stay same
    });
  });
});