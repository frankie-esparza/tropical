const Cursor = require("./cursor");
const Gem = require("./gem");
const MatchFinder = require("./matchFinder");
const MatchHandler = require("./matchHandler");
const Screen = require("./screen");

const {
  DELAY_DEFAULT, DELAY_AFTER_STARS_APPEAR,
  MIN_MATCH_LENGTH, MATCH_SYMBOL, DIRECTIONS,
  MESSAGE_MATCH_FOUND, MESSAGE_INVALID_SWAP, MESSAGE_WELCOME
} = require("../constants/constants.js");

/**
 * Game class
 * @property {array} grid - 2D array of {@link Gem} instances that are currently on the board 
 * @property {array} selectedGems - array of {@link Gem} instances that have been selected by the user to be swapped
 * @property {array} matches - 2D array of matches, a match is an array of {@link Gem} instances 
 */
class Game {
  static BOARD_SIZE = 8; // this is a static var not constant so it can be lowered to write tests more easily

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

  /* --------------------------------
   * MAIN
   * -------------------------------- */
  playGame() {
    this.matches = MatchFinder.findMatches(this.grid);
    while (this.matches.length > 0) {
      this.findAndStarMatches(this.grid);
      this.grid = MatchHandler.handleMatches(this.grid);
      this.matches = MatchFinder.findMatches(this.grid);
    }
    Screen.updateScreen(this.grid);
    Screen.render();
    console.log(`SCORE: ${this.score}\nGEMS COLLECTED: ${this.scoreString}`);
  }

  /* --------------------------------
   * USER ACTION HANDLERS
   * -------------------------------- */
  selectGem() {
    let gem = this.grid[this.cursor.row][this.cursor.col];
    // if user hasn't yet selected enough gems to check for a match, add gem to this.selectedGems
    if (this.selectedGems.length < MIN_MATCH_LENGTH - 1) {
      this.selectedGems.push(gem);
    }
    // if user selected enough gems to check for match, swap gems & check for match
    if (this.selectedGems.length === MIN_MATCH_LENGTH - 1) {
      let selectedGems = this.selectedGems;
      this.swapGems();
      this.handleMatchAttempt(selectedGems);
    }
  }

  swapGems() {
    const [gem1, gem2] = this.selectedGems;
    const [r1, r2, c1, c2] = [gem1.row, gem2.row, gem1.col, gem2.col];
    [this.grid[r1][c1].type, this.grid[r2][c2].type] =
      [this.grid[r2][c2].type, this.grid[r1][c1].type];
    Screen.updateScreen(this.grid);
    this.selectedGems = [];
  }

  handleMatchAttempt(selectedGems) {
    // If there's a match, tell user & star the matched gems
    if (MatchFinder.findMatches(this.grid).length > 0) {
      console.log(MESSAGE_MATCH_FOUND);
      setTimeout(this.findAndStarMatches.bind(this), DELAY_AFTER_STARS_APPEAR);
      setTimeout(this.playGame.bind(this), DELAY_DEFAULT);

      // If there's no match, tell user & swap gems back
    } else {
      console.log(MESSAGE_INVALID_SWAP);
      this.selectedGems = selectedGems;
      setTimeout(this.swapGems.bind(this), DELAY_DEFAULT);
    }
  }

  /* --------------------------------
   * MATCH HANDLERS
   * -------------------------------- */
  findAndStarMatches() {
    this.matches = MatchFinder.findMatches(this.grid);
    this.starMatches(this.matches)
  }

  starMatches() {
    this.matches.forEach(match => {
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

  /* --------------------------------
   * SETUP  
   * -------------------------------- */
  setupScreen = () => Screen.initialize(Game.BOARD_SIZE, Game.BOARD_SIZE);
  setupCursor = () => this.cursor = new Cursor(Game.BOARD_SIZE, Game.BOARD_SIZE);

  setupBoard() {
    this.grid = Array.from({ length: Game.BOARD_SIZE }, (_, row) =>
      Array.from({ length: Game.BOARD_SIZE }, (_, col) => new Gem(row, col, Gem.getRandomGemType()))
    );
  }

  setupCommands() {
    DIRECTIONS.forEach(dir => Screen.addDirectionCommand(dir, this.cursor[dir], this.cursor));
    Screen.addCommand('s', 'to select a gem', this.selectGem.bind(this));
    Screen.setMessage(MESSAGE_WELCOME);
    Screen.printCommands();
  }
}

module.exports = Game;  