const Screen = require("./screen");
const Cursor = require("./cursor");
const Gem = require("./gem");
const MatchFinder = require("./matchFinder");
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
    this.matches = MatchFinder.findMatches(this.grid);
    while (this.matches.length > 0) {
      this.findAndStarMatches(this.grid);
      this.grid = MatchHandler.clearMatches(this.grid);
      this.matches = MatchFinder.findMatches(this.grid);
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
    // Less than 2 gems selected so far
    if (this.selectedGems.length < MIN_MATCH_LENGTH - 1){
      this.selectedGems.push(gem);
    }

    // 2 gems selected
    if (this.selectedGems.length === MIN_MATCH_LENGTH - 1) {
      let selectedGems = this.selectedGems; // store gems in case they need to be swapped back
      this.swapGems();

      // Match
      if (MatchFinder.findMatches(this.grid).length > 0) {
        Screen.setMessage(MESSAGE_MATCH_FOUND);
        setTimeout(this.findAndStarMatches.bind(this), DELAY_AFTER_STARS_APPEAR);
        setTimeout(this.playGame.bind(this), DELAY_DEFAULT);

      // No Match
      } else {
        Screen.setMessage(MESSAGE_INVALID_SWAP);
        this.selectedGems = selectedGems;
        setTimeout(this.swapGems.bind(this), DELAY_DEFAULT);
      }
    }
  }
  
  // ----------------------
  // SWAP GEMS
  // ----------------------
  swapGems() {
    const [gem1, gem2] = this.selectedGems;
    const [r1, r2, c1, c2] = [ gem1.row, gem2.row, gem1.col, gem2.col ];
    [this.grid[r1][c1].type, this.grid[r2][c2].type] = 
    [this.grid[r2][c2].type, this.grid[r1][c1].type];
    Screen.updateScreen(this.grid);
    this.selectedGems = [];
  }

  // ----------------------
  // FIND & STAR MATCHES
  // ----------------------
  findAndStarMatches(){
    this.starMatches(MatchFinder.findMatches(this.grid))
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
    Screen.setMessage(MESSAGE_WELCOME);
    Screen.printCommands();
}

  setupScreen(){
    Screen.initialize(Game.BOARD_SIZE, Game.BOARD_SIZE);
  }
}
  
module.exports = Game;  