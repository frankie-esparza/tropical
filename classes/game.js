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
    this.setupBoard();
    this.setupCursor();
    this.setupScreen();
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
    console.log(`SCORE: ${this.score}`);
    console.log(`GEMS COLLECTED: ${this.scoreString}\n`);
  }

  // ----------------------
  // USER ACTIONS 
  // ----------------------
  selectGem() {
    let gem = this.grid[this.cursor.row][this.cursor.col];
    if (this.selectedGems.length < MIN_MATCH_LENGTH - 1) this.selectedGems.push(gem);

    // If player selected 2 gems total, check to see if they make a match
    if (this.selectedGems.length === MIN_MATCH_LENGTH - 1) {
      let gem1 = this.selectedGems[0];
      let gem2 = this.selectedGems[1];
      this.swapGems();
      let matches = this.findMatches();

      // If there's a match
      if (matches.length > 0) {
        console.log(MESSAGE_MATCH_FOUND);
        setTimeout(this.findAndStarMatches.bind(this), DELAY_AFTER_STARS_APPEAR);
        setTimeout(this.playGame.bind(this), DELAY_DEFAULT);

      // If there isn't a match
      } else {
        console.log(MESSAGE_INVALID_SWAP);
        this.selectedGems = [gem1, gem2];
        setTimeout(this.swapGems.bind(this), DELAY_DEFAULT);
      }
    }
  }
  
  swapGems() {
    let gem1 = this.selectedGems[0];
    let gem2 = this.selectedGems[1];

    let gem1Type = gem1.type;
    let gem2Type = gem2.type;

    this.grid[gem1.row][gem1.col].type = gem2Type;
    this.grid[gem2.row][gem2.col].type = gem1Type;

    Screen.updateScreen(this.grid);
    this.selectedGems = [];
  }

  // ----------------------
  // FIND & STAR MATCHES
  // ----------------------
  findAndStarMatches() {
    let matches = this.findMatches();
    this.starMatches(matches)
  }

  findMatches() {
    let rowsAndCols = this.getRowsAndCols();
    let matches = [];

    rowsAndCols.forEach(rowOrCol => {
      let matchesInArray = Game.findMatchesInArray(rowOrCol);
      matchesInArray.forEach(match => matches.push(match));
    });
    this.matches = matches;
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

  getRowsAndCols() {
    let rows = this.grid;
    let cols = [];

    for (let col = 0; col < Game.BOARD_SIZE; col++) {
      let column = [];
      rows.forEach(row => column.push(row[col]));
      cols.push(column);
    }

    let rowsAndCols = [...rows, ...cols];
    return rowsAndCols;
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
  setupBoard(){
    for (let r = 0; r < Game.BOARD_SIZE; r++) {
      let row = [];
      for (let c = 0; c < Game.BOARD_SIZE; c++) {
        let gemType = Gem.getRandomGemType();
        row.push(new Gem(r, c, gemType));
      }
      this.grid.push(row);
    }
  }

  setupCursor(){
    this.cursor = new Cursor(Game.BOARD_SIZE, Game.BOARD_SIZE);
    this.cursor.setBackgroundColor();
  }

  setupScreen(){
    Screen.initialize(Game.BOARD_SIZE, Game.BOARD_SIZE);
  }

  setupCommands() {
    DIRECTIONS.forEach(dir => Screen.addDirectionCommand(dir, this.cursor[dir], this.cursor) );
    Screen.addCommand('s', 'to select a gem', this.selectGem.bind(this));
    Screen.addCommand('h', 'to see a list of the commands', Screen.printCommands);
    console.log(MESSAGE_WELCOME)
    Screen.printCommands();
  }
}
  
module.exports = Game;  