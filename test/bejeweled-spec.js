const { expect } = require('chai');
const chai = require('chai');
const spies = require('chai-spies');
const Bejeweled = require("../class/bejeweled.js");
const Gem = require("../class/gem.js");
chai.use(spies);


describe('Bejeweled', function () {
  let bj;
  let grid;
  let gridAfterSwap;
  let gridAfterSwap2;

  let gem1;
  let gem2;
  let gem3;
  let gem4;

  let match1;
  let match2;
  let match3;

  let matches1;
  let matches2;
  let matches3;
  let matches4;

  let rowsAndCols;
  let rowWith2Matches;
  let rowWith0Matches;
  let rowWithMatchof2;

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
    gem4 = { row: 0, col: 1, type: '🥥' };

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

    // **************************************
    // SCENARIO 5: row contains a match of 2, and then 1 match
    rowWithMatchof2 = [
      { row: 0, col: 0, type: '🥥' }, { row: 0, col: 1, type: '🥥' }, { row: 0, col: 2, type: '🍉' }, { row: 0, col: 3, type: '🥝' },
      { row: 0, col: 4, type: '🥝' }, { row: 0, col: 5, type: '🥝' }, { row: 0, col: 6, type: '🥝' }, { row: 0, col: 7, type: '🥝' }
    ];

    matches4 = [[{ row: 0, col: 3, type: '🥝' }, { row: 0, col: 4, type: '🥝' }, { row: 0, col: 5, type: '🥝' },
    { row: 0, col: 6, type: '🥝' }, { row: 0, col: 7, type: '🥝' }]];

  });

  // *******************
  // UNIT TESTS
  // *******************
  describe('getRandomGemType()', function () {
    it('returns a random gem', function () {
      let randomGem = Gem.getRandomGemType();
      expect(randomGem === Gem.GEM_TYPES[0] || randomGem === Gem.GEM_TYPES[1] || randomGem === Gem.GEM_TYPES[2] || randomGem === Gem.GEM_TYPES[3]).to.be.true;
    });
  });

  describe('swapGems()', function () {
    it('swaps the Gem.GEM_TYPES of the 2 gems specified, if swap results in match', function () {
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

    it('calls swapGems if 2 gems are selected & clear selectedGems', function () {
      // TODO
    });

  });

  describe('getRowsAndCols()', function () {
    it('gets all rows and columns in the grid', function () {
      expect(bj.getRowsAndCols()).to.deep.equal(rowsAndCols);
    });
  });

  //*****************
  // FIND MATCHES
  //*****************

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

    it('finds match if array contains a match of 2, and then 1 match', function () {
      expect(Bejeweled.findMatchesInArray(rowWithMatchof2)).to.deep.equal(matches4);
    });
  });

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
});

//*****************
// CLEAR MATCHES
//*****************
describe('Bejeweled', function () {
  let col1;
  let col2;
  let col3;
  let col4;

  let col3_afterFall;
  let col4_afterFall;

  let col3_afterAllGemsFall;
  let col4_afterAllGemsFall;

  let numStars3;
  let numStars4;

  let lowestStar1;
  let lowestStar2;
  let lowestStar3;
  let lowestStar4;

  let lowestGemAboveStar1;
  let lowestGemAboveStar2;
  let lowestGemAboveStar3;
  let lowestGemAboveStar4;

  beforeEach(function () {
    // *******************************
    // 0 Sets of Falling Gems, 0 matches
    col1 = [
      { row: 0, col: 0, type: '🥥' }, // no matches
      { row: 1, col: 0, type: '🥥' },
      { row: 2, col: 0, type: '🍇' },
      { row: 3, col: 0, type: '🍇' },
      { row: 4, col: 0, type: '🥭' },
      { row: 5, col: 0, type: '🥭' },
      { row: 6, col: 0, type: '🍑' },
      { row: 7, col: 0, type: '🍑' },
    ];

    lowestStar1 = null;
    lowestGemAboveStar1 = null;

    // *******************************
    // 0 Sets of Falling Gems, 1 match
    col2 = [
      { row: 0, col: 0, type: '⭐️' }, // nothing will fall down, starts will become rand gems
      { row: 1, col: 0, type: '⭐️' },
      { row: 2, col: 0, type: '⭐️' },
      { row: 3, col: 0, type: '⭐️' },
      { row: 4, col: 0, type: '🥭' },
      { row: 5, col: 0, type: '🫐' },
      { row: 6, col: 0, type: '🍑' },
      { row: 7, col: 0, type: '🍒' },
    ];

    lowestStar2 = { row: 3, col: 0, type: '⭐️' };
    lowestGemAboveStar2 = null;

    // ***********************
    // 1 Set of Falling Gems
    col3 = [
      { row: 0, col: 0, type: '🥭' }, // mangos will fall down
      { row: 1, col: 0, type: '🥭' },
      { row: 2, col: 0, type: '⭐️' },
      { row: 3, col: 0, type: '⭐️' },
      { row: 4, col: 0, type: '⭐️' },
      { row: 5, col: 0, type: '🫐' },
      { row: 6, col: 0, type: '🍑' },
      { row: 7, col: 0, type: '🍒' },
    ];

    col3_afterFall = [
      { row: 0, col: 0, type: '🥭' }, // mangos will fall down
      { row: 1, col: 0, type: '⭐️' },
      { row: 2, col: 0, type: '⭐️' },
      { row: 3, col: 0, type: '⭐️' },
      { row: 4, col: 0, type: '🥭' },
      { row: 5, col: 0, type: '🫐' },
      { row: 6, col: 0, type: '🍑' },
      { row: 7, col: 0, type: '🍒' },
    ];

    lowestStar3 = { row: 4, col: 0, type: '⭐️' };
    lowestGemAboveStar3 = { row: 1, col: 0, type: '🥭' };

    col3_afterAllGemsFall = [
      { row: 0, col: 0, type: '⭐️' }, // mangos will fall down
      { row: 1, col: 0, type: '⭐️' },
      { row: 2, col: 0, type: '⭐️' },
      { row: 3, col: 0, type: '🥭' },
      { row: 4, col: 0, type: '🥭' },
      { row: 5, col: 0, type: '🫐' },
      { row: 6, col: 0, type: '🍑' },
      { row: 7, col: 0, type: '🍒' },
    ];

    numStars3 = 3;

    // ***********************
    // 2 Sets of Falling Gems
    col4 = [
      { row: 0, col: 0, type: '⭐️' },
      { row: 1, col: 0, type: '🍉' },
      { row: 2, col: 0, type: '⭐️' },
      { row: 3, col: 0, type: '🥭' },
      { row: 4, col: 0, type: '🫐' },
      { row: 5, col: 0, type: '⭐️' },
      { row: 6, col: 0, type: '⭐️' },
      { row: 7, col: 0, type: '⭐️' },
    ];

    col4_afterFall = [
      { row: 0, col: 0, type: '⭐️' },
      { row: 1, col: 0, type: '🍉' },
      { row: 2, col: 0, type: '⭐️' },
      { row: 3, col: 0, type: '🥭' },
      { row: 4, col: 0, type: '⭐️' },
      { row: 5, col: 0, type: '⭐️' },
      { row: 6, col: 0, type: '⭐️' },
      { row: 7, col: 0, type: '🫐' },
    ];

    lowestStar4 = { row: 7, col: 0, type: '⭐️' };
    lowestGemAboveStar4 = { row: 4, col: 0, type: '🫐' };

    col4_afterAllGemsFall = [
      { row: 0, col: 0, type: '⭐️' },
      { row: 1, col: 0, type: '⭐️' },
      { row: 2, col: 0, type: '⭐️' },
      { row: 3, col: 0, type: '⭐️' },
      { row: 4, col: 0, type: '⭐️' },
      { row: 5, col: 0, type: '🍉' },
      { row: 6, col: 0, type: '🥭' },
      { row: 7, col: 0, type: '🫐' },
    ];

    numStars4 = 5;
  });

  // **********
  // UNIT TESTS
  // **********

  describe('findLowestStar(column)', function () {
    it('does NOT find lowest star when one is NOT present', function () {
      expect(Bejeweled.findLowestStar(col1)).to.be.deep.equal(lowestStar1);
    });
    it('finds lowest star when one is present', function () {
      expect(Bejeweled.findLowestStar(col2)).to.be.deep.equal(lowestStar2);
      expect(Bejeweled.findLowestStar(col3)).to.be.deep.equal(lowestStar3);
      expect(Bejeweled.findLowestStar(col4)).to.be.deep.equal(lowestStar4);
    });
  });

  describe('findLowestGemAboveStar(column, star)', function () {
    it('does NOT find lowest gem above star when one is NOT present', function () {
      expect(Bejeweled.findLowestGemAboveStar(col1, lowestStar1)).to.be.deep.equal(lowestGemAboveStar1);
      expect(Bejeweled.findLowestGemAboveStar(col2, lowestStar2)).to.be.deep.equal(lowestGemAboveStar2);
    });

    it('finds lowest gem above star when one is present', function () {
      expect(Bejeweled.findLowestGemAboveStar(col3, lowestStar3)).to.be.deep.equal(lowestGemAboveStar3);
      expect(Bejeweled.findLowestGemAboveStar(col4, lowestStar4)).to.be.deep.equal(lowestGemAboveStar4);

    });
  });

  describe('makeOneGemFall(column, star, gem)', function () {
    it('makes 1 gem fall when theres a falling gem present', function () {
      expect(Bejeweled.makeOneGemFall(col3, lowestStar3, lowestGemAboveStar3)).to.deep.equal(col3_afterFall);
      expect(Bejeweled.makeOneGemFall(col4, lowestStar4, lowestGemAboveStar4)).to.deep.equal(col4_afterFall);
    });
  });

  describe('addRandomGemsAtTop(column)', function () {
    it('should call getRandomGemType() for each star', function () {
      let spy = chai.spy.on(Gem, 'getRandomGemType');

      Bejeweled.addRandomGemsAtTop(col3_afterAllGemsFall);
      expect(spy).to.have.been.called.exactly(numStars3);

      Bejeweled.addRandomGemsAtTop(col1);
      expect(spy).to.have.been.called.exactly(numStars3); // since col1 has no stars, num times called should stay same
    });
  });

  // ******************
  // INTEGRATION TESTS
  // ******************
  describe('makeAllGemsFall(column)', function () {
    it('makes all gems fall when theres a falling gems present', function () {
      expect(Bejeweled.makeAllGemsFall(col3)).to.deep.equal(col3_afterAllGemsFall);
      expect(Bejeweled.makeAllGemsFall(col4)).to.deep.equal(col4_afterAllGemsFall);
    });
  });

  describe('starMatches()', function () {
    let bj;
    let grid_beforeStar;
    let grid_afterStar;


    beforeEach(function () {
      bj = new Bejeweled();

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
      bj.starMatches();
      expect(bj.grid).to.deep.equal(grid_afterStar);
    });
  });

  describe('clearMatches()', function () {
    let bj;
    let grid_beforeStar;
    let grid_afterStar;


    beforeEach(function () {
      bj = new Bejeweled();

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

      let spy2 = chai.spy.on(Bejeweled, 'makeAllGemsFall');
      let spy3 = chai.spy.on(Bejeweled, 'addRandomGemsAtTop');

      bj.clearMatches();

      expect(spy2).to.have.been.called.exactly(3);
      expect(spy3).to.have.been.called.exactly(3);
    });
  });


});
