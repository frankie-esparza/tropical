const DELAY_DEFAULT = 3000;
const DELAY_AFTER_STARS_APPEAR = 1000;
const GEM_TYPES = ['🥥', '🍓', '🥝', '🍉'];
const MIN_MATCH_LENGTH = 3;
const MATCH_SYMBOL = '⭐️';
const DIRECTIONS = ['up', 'down', 'left', 'right']; 
const MESSAGE_MATCH_FOUND = '⭐️⭐️⭐️ Nice! You found a match!';
const MESSAGE_INVALID_SWAP = "❌ That swap doesn't result in a match, please try again.";
const MESSAGE_INVALID_CURSOR_MOVE = "❌ The cursor can't move that way, try another direction."
const MESSAGE_WELCOME = `
Welcome to Tropical!
  🥥 Your goal is to match 3 or more of the same item
  🍉 Make matches by swapping 2 items
  🥝 Select items to swap by using the 's' key
  🍓 Use the arrow keys to move around the board
`;
const MESSAGE_GOODBYE = "\nThanks for playing!\nGoodbye.\n"
const COLOR_CODES = {
  //background color
  blackBg: '\x1b[40m',
  redBg: '\x1b[41m',
  greenBg: '\x1b[42m',
  yellowBg: '\x1b[43m',
  blueBg: '\x1b[44m',
  cyanBg: '\x1b[46m',
  whiteBg: '\x1b[47m',
  magentaBg: '\x1b[45m',
}
const DEFAULT_TEXT_COLOR = '\x1b[37m';  // White
const DEFAULT_BACKGROUND_COLOR = '\x1b[40m';  // Black


module.exports = {
    DELAY_DEFAULT,
    DELAY_AFTER_STARS_APPEAR,
    GEM_TYPES,
    MIN_MATCH_LENGTH,
    MATCH_SYMBOL,
    DIRECTIONS,
    MESSAGE_MATCH_FOUND,
    MESSAGE_INVALID_SWAP,
    MESSAGE_INVALID_CURSOR_MOVE,
    MESSAGE_WELCOME,
    COLOR_CODES,
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_TEXT_COLOR,
    MESSAGE_GOODBYE
}

  