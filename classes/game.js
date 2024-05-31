const Screen = require("./screen");
const Cursor = require("./cursor");
const Gem = require("./gem");
const MatchHandler = require("./matchHandler");
const { 
  DELAY_DEFAULT, DELAY_AFTER_STARS_APPEAR, 
  MIN_MATCH_LENGTH, MATCH_SYMBOL, DIRECTIONS,
  MESSAGE_MATCH_FOUND, MESSAGE_INVALID_SWAP, MESSAGE_WELCOME 
} = require("../constants/constants.js");

class Game {
  static BOARD_SIZE = 8; // need this to be a static var so it can be changed for testing

  constructor() {
    this.grid = [];
    this.selectedGems = [];
    this.matches = [];
    this.score = 0;
    this.scoreString = '';
    this.gameStarted = false;
    this.setupScreen();
    this.setupBoard();
    this.setupCursor();
    this.setupCommands();
    this.playGame();
    this.gameStarted = true;
  }

  // ----------------------
  // PLAY GAME
  // ----------------------
  playGame() {
    this.findMatches.call(this);
    while (this.matches.length > 0) {
      this.findAndStarMatches();
      this.grid = MatchHandler.clearMatches.call(this, this.grid);
      this.matches = this.findMatches.call(this);
    }
    Screen.updateScreen(this.grid);
    Screen.render();
    console.log(`SCORE: ${this.score}\nGEMS COLLECTED: ${this.scoreString}`);
  }

  // ----------------------
  // SELECT GEM 
  // ----------------------
  selectGem() {
    let gem = this.grid[this.cursor.row][this.cursor.col];
    if (this.selectedGems.length < MIN_MATCH_LENGTH - 1) this.selectedGems.push(gem);

    // Player selected correct number of gems
    if (this.selectedGems.length === MIN_MATCH_LENGTH - 1) {
      let gem1 = this.selectedGems[0];
      let gem2 = this.selectedGems[1];
      this.swapGems();
      let matches = this.findMatches();

      // Match
      if (matches.length > 0) {
        console.log(MESSAGE_MATCH_FOUND);
        setTimeout(this.findAndStarMatches.bind(this), DELAY_AFTER_STARS_APPEAR);
        setTimeout(this.playGame.bind(this), DELAY_DEFAULT);

      // No Match
      } else {
        console.log(MESSAGE_INVALID_SWAP);
        this.selectedGems = [gem1, gem2];
        setTimeout(this.swapGems.bind(this), DELAY_DEFAULT);
      }
    }
  }
  
  // ----------------------
  // SWAP GEMS
  // ----------------------
  swapGems() {
    const [gem1, gem2] = this.selectedGems;
    const [r1, r2] = [ gem1.row, gem2.row ];
    const [c1, c2] = [ gem1.col, gem2.col ];
    [this.grid[r1][c1].type, this.grid[r2][c2].type] = 
    [this.grid[r2][c2].type, this.grid[r1][c1].type];
    Screen.updateScreen(this.grid);
    this.selectedGems = [];
  }

  // ----------------------
  // FIND & STAR MATCHES
  // ----------------------
  findAndStarMatches(){
    this.starMatches(this.findMatches())
  }

  findMatches() {
    const rowsAndCols = this.getRowsAndCols(); // get all rows & cols
    this.matches = rowsAndCols.flatMap(array => Game.findMatchesInArray(array)); // look for matches in all rows & cols
    return this.matches;
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

  getRowsAndCols() {
    const rows = this.grid;
    const cols = Array.from({ length: Game.BOARD_SIZE }, (_, col) => rows.map(row => row[col]) );
    return [...rows, ...cols];
  }

  // -----------------------------------------------------------
  // STAR MATCHES 
  // * Shows a '⭐️' in place of each matched gem & updates score 
  // -----------------------------------------------------------
  starMatches(matches) {
    matches.forEach(match => {
      match.forEach(el => {
        let gemType = el.type;
        el.type = MATCH_SYMBOL;
        if (this.gameStarted && gemType !== MATCH_SYMBOL) {
          this.score++;
          this.scoreString += gemType;
        }
      });
    });
    Screen.updateScreen(this.grid);
    Screen.render()
  }

  // ----------------------
  // SETUP
  // ----------------------
  setupBoard() {
    this.grid = Array.from({ length: Game.BOARD_SIZE }, (_, row) =>
      Array.from({ length: Game.BOARD_SIZE }, (_, col) => new Gem(row, col, Gem.getRandomGemType()))
    );
  }

  setupCursor(){
    this.cursor = new Cursor(Game.BOARD_SIZE, Game.BOARD_SIZE);
    this.cursor.setBackgroundColor();
  }

  setupCommands() {
    DIRECTIONS.forEach(dir => Screen.addDirectionCommand(dir, this.cursor[dir], this.cursor) );
    Screen.addCommand('s', 'to select a gem', this.selectGem.bind(this));
    Screen.addCommand('h', 'to see a list of the commands', Screen.printCommands);
    console.log(MESSAGE_WELCOME)
    Screen.printCommands();
}

  setupScreen(){
    Screen.initialize(Game.BOARD_SIZE, Game.BOARD_SIZE);
  }
}
  
module.exports = Game;  