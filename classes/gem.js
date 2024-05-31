const { GEM_TYPES } = require("../constants/constants.js");

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