# Tropical
Tropical is a Node.js terminal game inspired by Bejeweled. The goal of the game is to to match at least three of the same item by swapping 2 items. When there's a match, the matched items turn into stars temporarily and new items fall in from above to fill the gaps.

<img src="https://storage.googleapis.com/frankie-esparza-portfolio/gifs/tropical.gif" width="500">

Let's say the game initially looks like this in the upper left corner: 
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
5) If in the process of steps 1-4, any new matches were created, these matches will also count towards the the player's score

## Setup
1. Download this repository by clicking **Code**, then **Download ZIP**
2. Install dependencies `npm install`
3. Run the game `node game.js`
4. Run the tests `mocha`
