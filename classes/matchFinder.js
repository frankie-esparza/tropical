const { MIN_MATCH_LENGTH } = require("../constants/constants.js");

class MatchFinder{
  /* --------------------------------
   * FIND MATCHES
   * -------------------------------- */
  /**
   * Finds all Matches in Grid
   * @param {array} grid - 2D array of all the {@link Gem} instances currently on the board 
   * @returns {array} matches - flattened array of all matches 
   */
  static findMatches(grid) {
    const rowsAndCols = MatchFinder.getRowsAndCols(grid);
    let matches = rowsAndCols.flatMap(arr => MatchFinder.findMatchesInRowOrCol(arr));
    return matches;
  }

  /** 
   * Finds all Matches in Row or Column
   * @param {array} rowOrCol - a row or column of {@link Gem} instances,
   * for example: [ {row: 0, col: 0, type: '🍉' }, {row: 0, col: 1, type: '🥥' }, etc... ]
   * @returns {array} - an array of matches, each match is an array of {@link Gem} instances
   * Example: 
   * Let's say rowOrCol is a row with these gems: 🥝 🥥 🥥 🥥 🥝 🍉 🍉 🍉
   * This function would return these matches: 🥥 🥥 🥥 & 🍉 🍉 🍉
   */
  static findMatchesInRowOrCol(rowOrCol) {
    let matchType = rowOrCol[0].type;
    let matches = [];
    let match = [];

    for (let i = 0; i < rowOrCol.length; i++) {
      let el = rowOrCol[i];
      // if the gem types match, push to 'match' array 
      if (el.type === matchType) {
        match.push(el);
      } else {
        matchType = el.type;
        // check if match contains at least MIN_MATCH_LENGTH gems
        if (MatchFinder.matchMeetsLengthRequirement(match)) matches.push(match);
        match = [el];
      }
    }
    if (MatchFinder.matchMeetsLengthRequirement(match)) matches.push(match);
    return matches;
  }

  /* --------------------------------
   * HELPERS
   * -------------------------------- */
  static matchMeetsLengthRequirement = (match) => match.length >= MIN_MATCH_LENGTH;

  static getRowsAndCols(grid) {
    const rows = grid;
    const cols = Array.from({ length: grid.length }, (_, col) => rows.map(row => row[col]) );
    return [...rows, ...cols];
  }
}

module.exports = MatchFinder;