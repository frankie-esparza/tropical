const Gem = require("./gem");
const { MATCH_SYMBOL } = require("../constants/constants.js");

class MatchHandler {
  /* --------------------------------
  * MAIN
  * -------------------------------- */
  static clearMatches(grid) {
    let columns = MatchHandler.getColumnsFromGrid(grid);

    for (let col = 0; col < columns.length; col++) {
      let column = columns[col];
      let colAfterFall = MatchHandler.makeAllGemsFall(column);
      let colAfterGemsRefilled = MatchHandler.addRandomGemsAtTop(colAfterFall);
      columns[col] = colAfterGemsRefilled;
    }
    let newGrid = MatchHandler.getGridFromColumns(columns);
    return newGrid;
  }

  /* --------------------------------
   * MAKE GEMS FALL
   * -------------------------------- */
  static makeAllGemsFall(column) {
    let lowestStar = MatchHandler.findLowestStar(column);
    let lowestGemAboveStar = MatchHandler.findLowestGemAboveStar(column, lowestStar);
    while (lowestStar && lowestGemAboveStar) {
      column = MatchHandler.makeOneGemFall(column, lowestStar, lowestGemAboveStar);
      lowestStar = MatchHandler.findLowestStar(column);
      lowestGemAboveStar = MatchHandler.findLowestGemAboveStar(column, lowestStar);
    }
    return column;
  }

  static makeOneGemFall(column, star, gem) {
    column[star.row].type = gem.type;
    column[gem.row].type = MATCH_SYMBOL;
    return column;
  }

  /**
   * Finds lowest star in a column (i.e. the lowest gem in a match)
   * This helps determine how far the gems should fall
   * @param {*} column - a column of {@link Gem} instances 
   * @returns {void} 
   */
  static findLowestStar(column) {
    let top = 0;
    let bottom = column.length - 1;
    for (let i = bottom; i >= top; i--) {
      if (column[i].type === MATCH_SYMBOL && i !== top) return column[i];
    }
    return null;
  }

  /**
   * Finds lowest non-matched gem above a particular star (i.e. matched gem)
   * This helps determine where the gems should start falling 
   * @param {*} column - a column of {@link Gem} instances  
   * @param {*} star - a {@link Gem} instance that is part of a match
   * @returns {void}
   */
  static findLowestGemAboveStar(column, star) {
    if (star === null) return null;
    let top = 0
    let bottom = star.row - 1;
    for (let i = bottom; i >= top; i--) {
      if (column[i].type !== MATCH_SYMBOL) return column[i];
    }
    return null;
  }

  /* --------------------------------
   * REFILL GEMS
   * -------------------------------- */
  static addRandomGemsAtTop(column) {
    for (let row = 0; row < column.length - 1; row++) {
      let el = column[row];
      if (el.type === MATCH_SYMBOL) el.type = Gem.getRandomGemType();
      else break;
    }
    return column;
  }

  /* --------------------------------
   * SWITCH BETWEEN COLS & ROWS
   * -------------------------------- */
  static getGridFromColumns = (columns) => this.transpose(columns);
  static getColumnsFromGrid = (rows) => this.transpose(rows);

  static transpose(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const transposed = [];
    for (let col = 0; col < numCols; col++) {
      const newRow = [];
      for (let row = 0; row < numRows; row++) {
        newRow.push(matrix[row][col]);
      }
      transposed.push(newRow);
    }
    return transposed;
  }
}

module.exports = MatchHandler;