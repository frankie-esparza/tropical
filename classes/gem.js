const { createHash } = require('crypto');
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

  static #lastRandomSeed = process.env.TROPICAL_RANDOM_SEED ?? Math.random().toString();

  static getRandomGemType() {
    let seed = BigInt(`0x${this.#getNextRandomSeed()}`)
    let randomIndex = seed % BigInt(GEM_TYPES.length);
    return GEM_TYPES[randomIndex];
  }

  static #getNextRandomSeed() {
    let seed = createHash('sha256').update(this.#lastRandomSeed).digest('hex');
    this.#lastRandomSeed = seed;
    return seed;
  }
}

module.exports = Gem;