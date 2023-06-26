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

    Bejeweled.fillBoardWithGems.call(this);
    Screen.render();

    this.addDirectionCommand('up', this.cursor.up);
    this.addDirectionCommand('down', this.cursor.down);
    this.addDirectionCommand('left', this.cursor.left);
    this.addDirectionCommand('right', this.cursor.right);
    Screen.addCommand('h', 'to see a list of the commands', Screen.printCommands);

    console.log('Welcome to Bejeweled!\nPress one of the commands below to start playing.');
    Screen.printCommands();
  }

  // *****************
  // INSTANCE METHODS
  // *****************
  getGemAbove(gem) {
    let row = gem.row;
    let col = gem.col;
    return this.grid[row - 1][col];
  }

  changeGemType(gem, gemType) {
    this.grid[gem.row][gem.col].type = gemType;
  }

  swapGems(gem1, gem2) {
    this.grid[gem1.row][gem1.col].type = gem2.type;
    this.grid[gem2.row][gem2.col].type = gem1.type;
  }

  selectGem(gem) {
    if (this.selectedGems.length < 2) {
      this.selectedGems.push(gem);
    }
  }

  updateScore(match) {
    let numGemsMatched = match.length;
    this.score += numGemsMatched;
  }


  // *****************
  // STATIC METHODS
  // *****************
  static checkForMatches() {

  }

  static fillBoardWithGems() {
    for (let r = 0; r < Bejeweled.boardSize; r++) {
      let rowOfGems = [];

      for (let c = 0; c < Bejeweled.boardSize; c++) {
        let gemType = Bejeweled.getRandomGemType();
        rowOfGems.push({ row: r, col: c, type: gemType });
        Screen.setGrid(r, c, gemType);
      }
      this.grid.push(rowOfGems);
    }
    Screen.render();
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
