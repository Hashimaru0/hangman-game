# [Hangman](https://hangman-game-hashimaru.netlify.app/)
#### Game / SVG Animation
A classic game of hangman.  
Guess the word in 6 tries before the hangman is completed to win the game.  
  
## How It Works

### Pick random hidden word
A list of words is stored in words.json and one is picked randomly on game start and restart.
```
let randWord = WordData[Math.floor(Math.random() * WordData.length)].toUpperCase();
```
### Game state
The `gameState` reducer holds data about the current state of the game:
- Hidden word and which letter is revealed
- Selected letter
- Number of mistakes made
- Which letters have been entered
- If the game is ongoing, won or lost
```
const [gameState, dispatchGameState] = useReducer(gameStateReducer, {
    word: [{ letter: "", revealed: false }],
    selectedletter: "",
    mistakes: 0,
    enteredLetters: [{ letter: "", inWord: false }],
    gameStatus: "", // '' | 'WON' | 'LOST'
  });
```
The game state gets updated on every key press.
```
case "change_letter":
      if (
        gameState.gameStatus === "" &&
        !gameState.enteredLetters.some(
          (e) => e.letter === action.payload.newLetter
        )
      ) {
        let letterStateArrCopy = action.payload.letterStateArr.slice(0);
        for (let letterObj of letterStateArrCopy) {
          if (
            letterObj.letter === action.payload.newLetter &&
            letterObj.state === "KEYBOARD"
          ) {
            letterObj.state = "CONTAINER";
          } else if (
            letterObj.letter !== action.payload.newLetter &&
            letterObj.state === "CONTAINER"
          ) {
            letterObj.state = "KEYBOARD";
          }
        }
        action.payload.setLetterStateArr(letterStateArrCopy);
        return { ...gameState, selectedLetter: action.payload.newLetter };
      }
      return currentGameState;
```
### Letter positions
Letter container and each keyboard button position is stored and updated on window resize using Element.getBoundingClientRect(). These positions determine the position of absolute letters that will transition between them based upon which letter is selected or entered.
```
const [wordLettersPositions, setWordLettersPositions] = useState([null]);
const [letterContainerPosition, setLetterContainerPosition] = useState(null);
```
### On letter enter
```
 case "enter_letter":
      if (
        gameState.gameStatus === "" &&
        currentGameState.selectedLetter !== ""
      ) {
        if (
          !currentGameState.enteredLetters.some(
            (e) => e.letter === currentGameState.selectedLetter
          ) ||
          currentGameState.enteredLetters.length === 0
        ) {
          // Update letter state array
          let letterStateArrCopy = action.payload.letterStateArr.slice(0);
          let newState = "";
          if (
            currentGameState.word.some(
              (e) => e.letter === currentGameState.selectedLetter
            )
          ) {
            newState = "FOUND";
          } else {
            newState = "DISABLED";
          }
          for (let ltrObj of letterStateArrCopy) {
            if (ltrObj.letter === currentGameState.selectedLetter) {
              ltrObj.state = newState;
            }
          }
          action.payload.setLetterStateArr(letterStateArrCopy);

          // Update game state
          let madeMistake = true;

          for (let letterObj of currentGameState.word) {
            if (letterObj.letter === currentGameState.selectedLetter) {
              letterObj.revealed = true;
              madeMistake = false;
            }
          }
          currentGameState.enteredLetters = [
            ...currentGameState.enteredLetters,
            { letter: currentGameState.selectedLetter, inWord: !madeMistake },
          ];
          if (madeMistake) currentGameState.mistakes += 1;

          // Check if game over
          if (currentGameState.mistakes >= 6) {
            currentGameState.gameStatus = "LOST";
          }
          if (
            currentGameState.word.every(
              (letterObj) => letterObj.revealed === true
            )
          ) {
            currentGameState.gameStatus = "WON";
          }
          currentGameState.selectedLetter = "";
        }
        return currentGameState;
      }
      return currentGameState;
```
Check is performed to see if the game is over, if true, a restart button appears with a message based on number of mistakes made.
