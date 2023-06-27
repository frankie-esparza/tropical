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

    this.cursor = new Cursor(Bejeweled.boardSize, Bejeweled.boardSize);
    this.cursor.setBackgroundColor();

    Screen.initialize(Bejeweled.boardSize, Bejeweled.boardSize);
    Screen.setGridlines(false);

    Bejeweled.initializeBoard.call(this);
    Screen.render();

    let matches = this.findMatches();
    console.log('MATCHES', matches)
    // this.clearMatches();


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

  clearMatches() {
    let matches = this.findMatches();

    matches.forEach(match => {
      match.forEach(el => {
        if (el.row === 0) {
          el.type = Bejeweled.getRandomGemType();
        } else {
          el.type = this.getGemTypeAbove(el);
        }
      });
    });

    Screen.render();
  }

  swapGems() {
    let gem1 = this.selectedGems[0];
    let gem2 = this.selectedGems[1];

    Screen.setGrid(gem1.row, gem1.col, gem2.type);
    Screen.setGrid(gem2.row, gem2.col, gem1.type);
    Screen.render();

    this.grid[gem1.row][gem1.col].type = gem2.type;
    this.grid[gem2.row][gem2.col].type = gem1.type;

    this.selectedGems = [];
  }

  selectGem() {
    let gem = this.grid[this.cursor.row][this.cursor.col];

    if (this.selectedGems.length < 2) {
      this.selectedGems.push(gem);
    }

    if (this.selectedGems.length === 2) {
      this.swapGems();
    }
  }

  static initializeBoard() {
    // fill with random gems
    for (let r = 0; r < Bejeweled.boardSize; r++) {
      let rowOfGems = [];

      for (let c = 0; c < Bejeweled.boardSize; c++) {
        let gemType = Bejeweled.getRandomGemType();
        rowOfGems.push({ row: r, col: c, type: gemType });
        Screen.setGrid(r, c, gemType);
      }
      this.grid.push(rowOfGems);
    }
  }

  // **************************
  // HELPER METHODS - INSTANCE
  // **************************
  updateScore(match) {
    let numGemsMatched = match.length;
    this.score += numGemsMatched;
  }

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
