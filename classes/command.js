/**
 * Command class
 * @property {string} key - code representing the key (e.g. 'up', 'down', 'left', 'right', 's', or 'q') note only some names are supported
 * @property {string} description - description of what the command does 
 * @property {function} action - function to call when key is pressed
 */
class Command {
  constructor(key, description, action) {
    this.key = key;
    this.description = description;
    this.action = action;
  }

  execute() {
    this.action();
  }
}

module.exports = Command;