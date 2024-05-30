# Tropical
Welcome to Tropical!
Tropical is a terminal game made with Javascript & Node.js that mimics the game, Game. Tests where written used mocha, chai, & chai spies.

The goal of the game is to to match three of the same item (either horizontally or vertically) by swapping items. When there's a match, the matched items disappear and new items fall in from above to fill the gaps.

Let's say the game initially looks like this:
```
    🍉  🥝  🍓  🍉  🥝  🥥  🥝  🥥  
    🍓  🥥  🥥  🥝  🍓  🥝  🥥  🍓  
    🥥  🥥  🍓  🥝  🍉  🍉  🍓  🥥  
    🍉  🥝  🥥  🍓  🍓  🍉  🥝  🥥  
    🥥  🍉  🥥  🍓  🥥  🍓  🍉  🍓  
    🥥  🍉  🥝  🍉  🥝  🍉  🍓  🍓  
    🍓  🥥  🍉  🥝  🥥  🍓  🍓  🥝  
    🍓  🍓  🥥  🍉  🍓  🍉  🥝  🍉
```

Let's focus on the upper left corner: 
```
    🍉  🥝  🍓
    🍓  🥥  🥥
    🥥  🥥  🍓
```


If we swap the `🥥` with the `🍓` below it, we'll get a match since there are three `🥥` in a row.

Before Swap:               
```
    🍉  🥝  🍓             
    🍓  🥥  🥥 <--         
    🥥  🥥  🍓 <--     
```

After Swap: 
```
    🍉  🥝  🍓
    🍓  🥥  🍓
--> 🥥  🥥  🥥 <--
```

This will result in a few things happening:
1) The `🥥`s will briefly turn into `⭐️` & then disappear
2) The match will be added to the player's score
3) The `🍓 🥥 🍓` will fall down to replace the row that used to be `🥥 🥥 🥥`
4) Three new random items will fall down to replace the row that used to be `🍓 🥥 🍓`
5) If in the process of steps 1-4, any new matches were created, 
   these matches will also disappear and be added to the player's score


## Running the game
1. Type `npm install` to install all packages
2. Run `node game.js` to run the game
3. Run `mocha` to run tests


## Screen API 
The Screen API was written by App Academy

### Initialize
* `Screen.initialize(numRows, numCols)` will initialize a grid with the given
  dimensions.
* `Screen.setGridlines(gridLines)` will insert lines between each grid element
  is `gridLines` is true, or hide them if `gridLines` is false.

### Commands
* `Screen.addCommand(key, description, action)` will add a command that calls
  the `action` callback anytime `key` is typed on the keyboard. `description`
  will be displayed in the help message.
* `Screen.printCommands()` will show a list of all loaded commands and their
  descriptions.

### Updating the grid
* `Screen.setGrid(row, col, char)` sets the character at `row` and `col` to
  the given `char`.
* `Screen.setTextColor(row, col, color)` sets the text color at `row` and
  `col` to the given `color`.
* `Screen.setBackgroundColor(row, col, color)` sets the background color at
  `row` and `col` to the given `color` (e.g. black, red, green, yellow, blue, cyan, white, magenta)

### Quitting
* `Screen.setQuitMessage(quitMessage)` sets a message to be printed when the
  user quits.
* `Screen.quit(showMessage=true)` quits the game and prints the message if
  `showMessage` is true.

### Rendering
* `Screen.render()` will update the display. This must be called anytime the
  grid or messages change.

### Displaying a message
* `Screen.setMessage(msg)` takes in a string to be printed below the grid each
  time it is rendered.
