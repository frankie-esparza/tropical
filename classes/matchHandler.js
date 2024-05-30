const Gem = require("./gem");

class MatchHandler{
  static MATCH_SYMBOL = '⭐️';

  static clearMatches(grid) {
    let columns = MatchHandler.getColumnsFromGrid(grid);

    for (let col = 0; col < columns.length; col++) {
      let column = columns[col];
      let colAfterFall = MatchHandler.makeAllGemsFall(column);
      let afterReplace = MatchHandler.addRandomGemsAtTop(colAfterFall);
      columns[col] = afterReplace;
    }
    let newGrid = MatchHandler.getGridFromColumns(columns);
    return newGrid;
  }

  // ---------------
  // GRID HELPERS
  // ---------------
  static getGridFromColumns(columns) {
    let numCols = columns.length;
    let numRows = columns[0].length;
    let rows = [];

    for (let r = 0; r < numRows; r++) {
      let row = [];
      for (let c = 0; c < numCols; c++) {
        row.push(columns[c][r]);
      }
      rows.push(row);
    }
    return rows;
  }

  static getColumnsFromGrid(grid) {
    let numRows = grid.length;
    let numCols = grid[0].length;
    let columns = [];

    for (let col = 0; col < numCols; col++) {
      let column = [];
      for (let row = 0; row < numRows; row++) {
        column.push(grid[row][col]);
      }
      columns.push(column);
    }
    return columns;
  }

  static addRandomGemsAtTop(column) {
    for (let row = 0; row < column.length - 1; row++) {
      let el = column[row];
      if (el.type === MatchHandler.MATCH_SYMBOL) el.type = Gem.getRandomGemType();
      else break;
      }
      return column;
  }
  
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
      column[gem.row].type = MatchHandler.MATCH_SYMBOL;
      return column;
  }
  
  static findLowestStar(column) {
      let top = 0;
      let bottom = column.length - 1;
  
      for (let i = bottom; i >= top; i--) {
        if (column[i].type === MatchHandler.MATCH_SYMBOL && i !== top) return column[i];
      }
      return null;
  }
  
  static findLowestGemAboveStar(column, star) {
      if (star === null) return null;
      let top = 0
      let bottom = star.row - 1;
  
      for (let i = bottom; i >= top; i--) {
        if (column[i].type !== MatchHandler.MATCH_SYMBOL) return column[i];
      }
      return null;
  }
}

module.exports = MatchHandler;