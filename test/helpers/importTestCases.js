const Game = require("../../classes/game");

const paths = [
  "../../constants/constants.js",
  "../../constants/constants-for-testing-columns.js",
  "../../constants/constants-for-testing-grids.js",
];

module.exports = function testSetup () {
  // Clear the require cache for the modules
  paths.forEach(path => delete require.cache[require.resolve(path)]);

  // Re-import the modules
  const [
    CONSTANTS,
    CONSTANTS_FOR_TESTING_COLUMNS,
    CONSTANTS_FOR_TESTING_GRIDS,
  ] = paths.map(require);

  // Initialize global variables
  Object.assign(global, {
    ...CONSTANTS,
    ...CONSTANTS_FOR_TESTING_COLUMNS,
    ...CONSTANTS_FOR_TESTING_GRIDS,
  });
};
