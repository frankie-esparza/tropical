/* -----------------------------------
 * 0 Sets of Falling Gems, 0 matches
 * ----------------------------------- */
const col1 = [
  { row: 0, col: 0, type: '🥥' }, // no matches
  { row: 1, col: 0, type: '🥥' },
  { row: 2, col: 0, type: '🍇' },
  { row: 3, col: 0, type: '🍇' },
  { row: 4, col: 0, type: '🥭' },
  { row: 5, col: 0, type: '🥭' },
  { row: 6, col: 0, type: '🍑' },
  { row: 7, col: 0, type: '🍑' },
];

const lowestStar1 = null;
const lowestGemAboveStar1 = null;

/* -----------------------------------
 * 0 Sets of Falling Gems, 1 match
 * ----------------------------------- */
const col2 = [
  { row: 0, col: 0, type: '⭐️' }, // nothing will fall down, ⭐️ will become random gems
  { row: 1, col: 0, type: '⭐️' },
  { row: 2, col: 0, type: '⭐️' },
  { row: 3, col: 0, type: '⭐️' },
  { row: 4, col: 0, type: '🥭' },
  { row: 5, col: 0, type: '🫐' },
  { row: 6, col: 0, type: '🍑' },
  { row: 7, col: 0, type: '🍒' },
];

const lowestStar2 = { row: 3, col: 0, type: '⭐️' };
const lowestGemAboveStar2 = null;

/* -----------------------------------
 * 1 Set of Falling Gems
 * ----------------------------------- */
const col3 = [
  { row: 0, col: 0, type: '🥭' }, // 🥭's will fall down
  { row: 1, col: 0, type: '🥭' },
  { row: 2, col: 0, type: '⭐️' },
  { row: 3, col: 0, type: '⭐️' },
  { row: 4, col: 0, type: '⭐️' },
  { row: 5, col: 0, type: '🫐' },
  { row: 6, col: 0, type: '🍑' },
  { row: 7, col: 0, type: '🍒' },
];

const col3_afterFall = [
  { row: 0, col: 0, type: '🥭' }, // 🥭 will fall down
  { row: 1, col: 0, type: '⭐️' },
  { row: 2, col: 0, type: '⭐️' },
  { row: 3, col: 0, type: '⭐️' },
  { row: 4, col: 0, type: '🥭' },
  { row: 5, col: 0, type: '🫐' },
  { row: 6, col: 0, type: '🍑' },
  { row: 7, col: 0, type: '🍒' },
];

const lowestStar3 = { row: 4, col: 0, type: '⭐️' };
const lowestGemAboveStar3 = { row: 1, col: 0, type: '🥭' };

const col3_afterAllGemsFall = [
  { row: 0, col: 0, type: '⭐️' }, // mangos will fall down
  { row: 1, col: 0, type: '⭐️' },
  { row: 2, col: 0, type: '⭐️' },
  { row: 3, col: 0, type: '🥭' },
  { row: 4, col: 0, type: '🥭' },
  { row: 5, col: 0, type: '🫐' },
  { row: 6, col: 0, type: '🍑' },
  { row: 7, col: 0, type: '🍒' },
];

const numStars3 = 3;

/* -----------------------------------
 * 2 Sets of Falling Gems
 * ----------------------------------- */
const col4 = [
  { row: 0, col: 0, type: '⭐️' },
  { row: 1, col: 0, type: '🍉' },
  { row: 2, col: 0, type: '⭐️' },
  { row: 3, col: 0, type: '🥭' },
  { row: 4, col: 0, type: '🫐' },
  { row: 5, col: 0, type: '⭐️' },
  { row: 6, col: 0, type: '⭐️' },
  { row: 7, col: 0, type: '⭐️' },
];

const col4_afterFall = [
  { row: 0, col: 0, type: '⭐️' },
  { row: 1, col: 0, type: '🍉' },
  { row: 2, col: 0, type: '⭐️' },
  { row: 3, col: 0, type: '🥭' },
  { row: 4, col: 0, type: '⭐️' },
  { row: 5, col: 0, type: '⭐️' },
  { row: 6, col: 0, type: '⭐️' },
  { row: 7, col: 0, type: '🫐' },
];

const lowestStar4 = { row: 7, col: 0, type: '⭐️' };
const lowestGemAboveStar4 = { row: 4, col: 0, type: '🫐' };

const col4_afterAllGemsFall = [
  { row: 0, col: 0, type: '⭐️' },
  { row: 1, col: 0, type: '⭐️' },
  { row: 2, col: 0, type: '⭐️' },
  { row: 3, col: 0, type: '⭐️' },
  { row: 4, col: 0, type: '⭐️' },
  { row: 5, col: 0, type: '🍉' },
  { row: 6, col: 0, type: '🥭' },
  { row: 7, col: 0, type: '🫐' },
];

const numStars4 = 5;

module.exports = {
  col1, 
  lowestStar1, 
  lowestGemAboveStar1, 
  col2, 
  lowestStar2, 
  lowestGemAboveStar2, 
  col3, 
  col3_afterFall, 
  lowestStar3, 
  lowestGemAboveStar3,
  col3_afterAllGemsFall,
  numStars3,
  col4, 
  col4_afterFall,
  lowestStar4,
  lowestGemAboveStar4,
  col4_afterAllGemsFall,
  numStars4
}