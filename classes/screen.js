/*
 * The following Screen class was written by App Academy - https://github.com/appacademy
 */
const keypress = require('keypress');
const Command = require('./command');
const { COLOR_CODES, DEFAULT_BACKGROUND_COLOR, DEFAULT_TEXT_COLOR, MESSAGE_GOODBYE } = require("../constants/constants.js");

class Screen {
  // size 
  static numCols = 0;
  static numRows = 0;
  static grid = [];

  // border
  static borderChar = " ";
  static spacerCount = 1;
  static gridLines = false;

  // colors
  static textColors = [];
  static backgroundColors = [];

  // message & commands
  static message = "";
  static commands = {};
  static keypressCallback = null;
  static initialized = false;


  /* --------------------------------
   * INITIALIZE
   * -------------------------------- */
  static initialize(numRows, numCols) {
    Screen.numRows = numRows;
    Screen.numCols = numCols;
    Screen.grid = [];
    Screen.textColors = [];
    Screen.backgroundColors = [];

    for (let row = 0; row < numRows; row++) {
      Screen.grid.push(new Array(numCols).fill(" "));
      Screen.textColors.push(new Array(numCols).fill(DEFAULT_TEXT_COLOR));
      Screen.backgroundColors.push(new Array(numCols).fill(DEFAULT_BACKGROUND_COLOR));
    }

    Screen.setGridlines(false);
    Screen.setQuitMessage(MESSAGE_GOODBYE);
    const quitCmd = new Command('q', 'quit the game', Screen.quit);
    Screen.commands['q'] = quitCmd;
    Screen.initialized = true;
    Screen.waitForInput();
  }

  /* --------------------------------
   * GAMEPLAY
   * -------------------------------- */
  static updateScreen(grid) {
    for (let col = 0; col < Screen.numCols; col++) {
      for (let row = 0; row < Screen.numRows; row++) {
        let el = grid[row][col];
        Screen.setGrid(el.row, el.col, el.type);
      }
    }
    Screen.render();
  }

  static waitForInput() {
    keypress(process.stdin);
    process.stdin.on('keypress', function (ch, key) {
      if (!key) {
        console.log("Warning: Unknown keypress");
      } else if (!Screen.commands.hasOwnProperty(key.name)) {
        Screen.render();
        console.log(`${key.name} not supported.`);
        Screen.printCommands();
      } else {
        Screen.render();
        Screen.commands[key.name].execute();
      }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  static render() {
    if (!Screen.initialized) return;
    const spacer = new Array(Screen.spacerCount).fill(' ').join('');
    console.clear();
    let borderLength = Screen.numCols * (Screen.spacerCount * 2 + 1) + 2;
    if (Screen.gridLines) borderLength += Screen.numCols - 1;
    let horizontalBorder = new Array(borderLength).fill(Screen.borderChar).join('');
    console.log(horizontalBorder);
    for (let row = 0; row < Screen.numRows; row++) {
      const rowCopy = [...Screen.grid[row]];
      for (let col = 0; col < Screen.numCols; col++) {
        let textColor = Screen.textColors[row][col] ? Screen.textColors[row][col] : "";
        let backgroundColor = Screen.backgroundColors[row][col] ? Screen.backgroundColors[row][col] : "";
        if (!(textColor && backgroundColor)) textColor = '\x1b[0m';

        let vertLine = (Screen.gridLines && col > 0) ? '|' : '';
        rowCopy[col] = `${DEFAULT_BACKGROUND_COLOR}${vertLine}\x1b[0m${textColor}${backgroundColor}${spacer}${rowCopy[col]}${spacer}\x1b[0m`;
      }
      if (Screen.gridLines && row > 0) {
        let horizontalGridLine = new Array(rowCopy.length * 4 - 1).fill('-');
        horizontalGridLine.unshift(`${Screen.borderChar}${DEFAULT_BACKGROUND_COLOR}`);
        horizontalGridLine.push(`\x1b[0m${Screen.borderChar}`);
        console.log(horizontalGridLine.join(''));
      }
      rowCopy.unshift(`${Screen.borderChar}`);
      rowCopy.push(`${Screen.borderChar}`);
      console.log(rowCopy.join(''));
    }
    console.log(horizontalBorder);
    console.log("");
    console.log(Screen.message);
  }

  static setGrid(row, col, char) {
    if (!Screen.initialized) return;
    Screen.grid[row][col] = char;
  }

  static quit(showMessage = true) {
    if (showMessage) console.log(Screen.quitMessage);
    process.exit(1);
  }

  /* --------------------------------
   * SETUP
   * -------------------------------- */
  static addCommand(key, description, action) {
    if (key === 'q') {
      throw new Error("you cannot overwrite 'q'");
    }
    Screen.commands[key] = new Command(key, description, action);
  }

  static addDirectionCommand = (direction, directionFunction, cursor) => {
    Screen.addCommand(direction, `move cursor ${direction}`, directionFunction.bind(cursor));
  }

  static printCommands() {
    console.log('');
    for (let cmd in Screen.commands) {
      let description = Screen.commands[cmd].description;
      console.log(`  ${cmd} - ${description}`);
    }
    console.log('');
  }

  static setBackgroundColor(row, col, color) {
    if (!Screen.initialized) return;
    let code = COLOR_CODES[color + 'Bg'];
    if (!code) {
      throw new Error("Invalid background color");
    }
    Screen.backgroundColors[row][col] = code;
  }

  static setGridlines(gridLines) {
    Screen.gridLines = gridLines;
    Screen.render();
  }

  static setKeypressCallback(keypressCallback) {
    Screen.keypressCallback = keypressCallback;
  }

  static setMessage(msg) {
    Screen.message = msg;
  }

  static setQuitMessage(quitMessage) {
    Screen.quitMessage = quitMessage;
  }

  static setTextColor(row, col, color) {
    if (!Screen.initialized) return;
    let code = COLOR_CODES[color];
    if (!code) {
      throw new Error("Invalid color");
    }
    Screen.textColors[row][col] = code;
  }
}

module.exports = Screen;