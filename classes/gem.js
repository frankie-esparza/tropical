const { GEM_TYPES } = require("../constants/constants.js");

/** 
 * Gem class 
 * @property { string } type - the type of gem e.g. '🥥', '🍓', '🥝', '🍉';
 * @property { number } row - current row location of the gem 
 * @property { number } col - current col location of the gem 
 */
class Gem {  
    constructor(row, col, type) {
      this.row = row;
      this.col = col;
      this.type = type;
    }
  
    static getRandomGemType() {
      let min = 0;
      let max = GEM_TYPES.length - 1;
      let randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
      return GEM_TYPES[randomIndex];
    }
}

module.exports = Gem;