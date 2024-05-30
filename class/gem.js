class Gem {
    static GEM_TYPES = ['🥥', '🍓', '🥝', '🍉'];
  
    constructor(row, col, type) {
      this.row = row;
      this.col = col;
      this.type = type;
    }
  
    static getRandomGemType() {
      let min = 0;
      let max = Gem.GEM_TYPES.length - 1;
      let randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
      return Gem.GEM_TYPES[randomIndex];
    }
}

module.exports = Gem;