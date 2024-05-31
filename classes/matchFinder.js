const { MIN_MATCH_LENGTH } = require("../constants/constants.js");

class MatchFinder{
  static findMatches(grid) {
    const rowsAndCols = MatchFinder.getRowsAndCols(grid);
    let matches = rowsAndCols.flatMap(arr => MatchFinder.findMatchesInArray(arr));
    return matches;
  }

  static findMatchesInArray(array) {
    let matchType = array[0].type;
    let matches = [];
    let match = [];

    for (let i = 0; i < array.length; i++) {
      let el = array[i];
      if (el.type === matchType) {
        match.push(el);
      } else {
        matchType = el.type;
        if (match.length >= MIN_MATCH_LENGTH) matches.push(match);
        match = [el];
      }
    }
    if (match.length >= MIN_MATCH_LENGTH) matches.push(match);
    return matches;
  }

  static getRowsAndCols(grid) {
    const rows = grid;
    const cols = Array.from({ length: grid.length }, (_, col) => rows.map(row => row[col]) );
    return [...rows, ...cols];
  }
}

module.exports = MatchFinder;