const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {
  static boardSize = 8;
  static gemTypes = ['🥥', '🍓', '🥝', '🍉'];

  constructor() {
    this.playerTurn = "O";

    this.grid = [];
    this.selectedGems = [];
    this.score = 0;
    this.scoreString = '';
    this.gameStarted = false;

    this.cursor = new Cursor(Bejeweled.boardSize, Bejeweled.boardSize);
    this.cursor.setBackgroundColor();

    Screen.initialize(Bejeweled.boardSize, Bejeweled.boardSize);
    Screen.setGridlines(false);

    // set up board
    this.fillBoardWithRandomGems();
    this.dealWithMatches();
    this.gameStarted = true;

    // set up commands
    this.addDirectionCommand('up', this.cursor.up);
    this.addDirectionCommand('down', this.cursor.down);
    this.addDirectionCommand('left', this.cursor.left);
    this.addDirectionCommand('right', this.cursor.right);
    Screen.addCommand('s', 'to select a gem', this.selectGem.bind(this));
    Screen.addCommand('h', 'to see a list of the commands', Screen.printCommands);

    console.log('Welcome to Bejeweled!\nPress one of the commands below to start playing.');
    Screen.printCommands();
  }

  // *****************
  // INTEGRATION
  // *****************

  dealWithMatches() {
    this.matches = this.findMatches();

    while (this.matches.length > 0) {
      this.starMatches();
      this.clearMatches();
      this.matches = this.findMatches.call(this);
    }

    this.updateScreen();
    Screen.render();
    console.log(`SCORE: ${this.score}`);
    console.log(`GEMS COLLECTED: ${this.scoreString}`);
  }

  fillBoardWithRandomGems() {
    for (let r = 0; r < Bejeweled.boardSize; r++) {
      let row = [];
      for (let c = 0; c < Bejeweled.boardSize; c++) {
        let gemType = Bejeweled.getRandomGemType();
        row.push({ row: r, col: c, type: gemType });
      }
      this.grid.push(row);
    }
  }

  updateScreen() {
    let numRows = this.grid.length;
    let numCols = this.grid[0].length;

    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows; row++) {
        let el = this.grid[row][col];
        Screen.setGrid(el.row, el.col, el.type);
      }
    }

    Screen.render();
  }

  findMatches() {
    let rowsAndCols = this.getRowsAndCols();
    let matches = [];

    rowsAndCols.forEach(rowOrCol => {
      let matchesInArray = Bejeweled.findMatchesInArray(rowOrCol);

      matchesInArray.forEach(match => {
        matches.push(match);
      });
    });
    return matches;
  }

  starMatches() {
    let matches = this.findMatches();

    matches.forEach(match => {
      match.forEach(el => {
        let gemType = el.type;

        el.type = '⭐️';

        if (this.gameStarted && gemType !== '⭐️') {
          this.score++;
          this.scoreString += gemType;
        }
      });
    });

    this.updateScreen();
    Screen.render()
  }

  clearMatches() {
    let columns = this.getColumns();

    columns.forEach(column => {
      Bejeweled.makeAllGemsFall(column);
      Bejeweled.addRandomGemsAtTop(column);
    });
  }

  getColumns() {
    let numRows = this.grid.length;
    let numCols = this.grid[0].length;
    let columns = [];

    for (let col = 0; col < numCols; col++) {
      let column = [];

      for (let row = 0; row < numRows; row++) {
        column.push(this.grid[row][col]);
      }

      columns.push(column);
    }

    return columns;
  }

  static addRandomGemsAtTop(column) {
    for (let row = 0; row < column.length - 1; row++) {
      let el = column[row];
      if (el.type === '⭐️') {
        el.type = Bejeweled.getRandomGemType();
      } else {
        break;
      }
    }

    return column;
  }

  static makeAllGemsFall(column) {
    let lowestStar = Bejeweled.findLowestStar(column);
    let lowestGemAboveStar = Bejeweled.findLowestGemAboveStar(column, lowestStar);

    while (lowestStar && lowestGemAboveStar) {
      column = Bejeweled.makeOneGemFall(column, lowestStar, lowestGemAboveStar);
      lowestStar = Bejeweled.findLowestStar(column);
      lowestGemAboveStar = Bejeweled.findLowestGemAboveStar(column, lowestStar);
    }

    return column;
  }

  static makeOneGemFall(column, star, gem) {
    column[star.row].type = gem.type;
    column[gem.row].type = '⭐️';

    return column;
  }

  static findLowestStar(column) {
    let top = 0;
    let bottom = column.length - 1;

    for (let i = bottom; i >= top; i--) {
      if (column[i].type === '⭐️' && i !== top) {

        return column[i];
      }
    }
    return null;
  }

  static findLowestGemAboveStar(column, star) {
    if (star === null) {
      return null;
    }

    let top = 0
    let bottom = star.row - 1;

    for (let i = bottom; i >= top; i--) {
      if (column[i].type !== '⭐️') {
        return column[i];
      }
    }
    return null;
  }

  swapGems() {
    let gem1 = this.selectedGems[0];
    let gem2 = this.selectedGems[1];
    let gem1Type = gem1.type;
    let gem2Type = gem2.type;

    this.grid[gem1.row][gem1.col].type = gem2Type;
    this.grid[gem2.row][gem2.col].type = gem1Type;

    this.updateScreen();

    this.selectedGems = [];
  }

  selectGem() {
    let gem = this.grid[this.cursor.row][this.cursor.col];

    if (this.selectedGems.length < 2) {
      this.selectedGems.push(gem);
    }

    if (this.selectedGems.length === 2) {
      let gem1 = this.selectedGems[0];
      let gem2 = this.selectedGems[1];

      this.swapGems();

      let matches = this.findMatches();

      if (matches.length > 0) {
        console.log('You found a match!');
        setTimeout(this.starMatches.bind(this), 500);
        setTimeout(this.dealWithMatches.bind(this), 3000);
      } else {
        console.log('No match, try again');
        this.selectedGems = [gem1, gem2];
        setTimeout(this.swapGems.bind(this), 3000);
      }
    }
  }

  // **************************
  // HELPER METHODS - INSTANCE
  // **************************
  getGemTypeAbove(gem) {
    let row = gem.row;
    let col = gem.col;
    return this.grid[row - 1][col].type;
  }

  changeGemType(gem, gemType) {
    this.grid[gem.row][gem.col].type = gemType;
  }

  getRowsAndCols() {
    let rows = this.grid;
    let cols = [];

    for (let col = 0; col < Bejeweled.boardSize; col++) {
      let column = [];
      rows.forEach(row => column.push(row[col]));
      cols.push(column);
    }

    let rowsAndCols = [...rows, ...cols];
    return rowsAndCols;
  }

  // **************************
  // HELPER METHODS - STATIC
  // **************************
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

        if (match.length >= 3) {
          matches.push(match);
        }

        match = [el];
      }
    }

    if (match.length >= 3) {
      matches.push(match);
    }

    return matches;
  }

  static getRandomGemType() {
    let min = 0;
    let max = Bejeweled.gemTypes.length - 1
    let randomIndex = Math.floor(Math.random() * (max - min + 1) + min); // inclusive of min & max
    let randomGemType = Bejeweled.gemTypes[randomIndex];
    return randomGemType;
  }

  // *****************
  // CONSTRUCTOR HELPER METHODS
  // *****************
  addDirectionCommand = (direction, directionFunction) => {
    Screen.addCommand(direction, `move cursor ${direction}`, directionFunction.bind(this.cursor));
  }
}

module.exports = Bejeweled;

let col4 = [
  { row: 0, col: 0, type: '⭐️' },
  { row: 1, col: 0, type: '🍉' },
  { row: 2, col: 0, type: '⭐️' },
  { row: 3, col: 0, type: '🥭' },
  { row: 4, col: 0, type: '🫐' },
  { row: 5, col: 0, type: '⭐️' },
  { row: 6, col: 0, type: '⭐️' },
  { row: 7, col: 0, type: '⭐️' },
];

console.log('FINAL', Bejeweled.makeAllGemsFall(col4));
