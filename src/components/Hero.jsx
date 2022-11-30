import {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useLayoutEffect,
} from "react";
import WordData from "../data/words.json";
import Hangman from "./hero/Hangman";
import HiddenWord from "./hero/HiddenWord";
import LetterContainer from "./hero/LetterContainer";
import Keyboard from "./hero/Keyboard";
import GameOverMessage from "./hero/GameOverMessage";

const LETTERS = "QWERTYUIOPASDFGHJKLZXCVBNM";

export const ACTIONS = {
  RESTART: "restart",
  CHANGE_LETTER: "change_letter",
  ENTER_LETTER: "enter_letter",
};

function gameStateReducer(gameState, action) {
  let currentGameState = {
    word: gameState.word,
    selectedLetter: gameState.selectedLetter,
    mistakes: gameState.mistakes,
    enteredLetters: gameState.enteredLetters,
    gameStatus: gameState.gameStatus,
  };

  switch (action.type) {
    case "restart":
      let ltrStateArr = [];
      for (let letter of LETTERS) {
        let ltrStateObj = { letter: letter, state: "KEYBOARD" };
        ltrStateArr.push(ltrStateObj);
      }
      action.payload.setLetterStateArr(ltrStateArr);

      let randWord =
        WordData[Math.floor(Math.random() * WordData.length)].toUpperCase();
      let randWordArr = randWord.split("");
      let randWordObjArr = [];
      for (let letter of randWordArr) {
        let letterObj = { letter: letter, revealed: false };
        randWordObjArr.push(letterObj);
      }
      return {
        word: randWordObjArr,
        selectedLetter: "",
        mistakes: 0,
        enteredLetters: [],
        gameStatus: "",
      };
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
    default:
      return;
  }
}

const Hero = ({ howToEnabled }) => {
  const [gameState, dispatchGameState] = useReducer(gameStateReducer, {
    word: [{ letter: "", revealed: false }],
    selectedletter: "",
    mistakes: 0,
    enteredLetters: [{ letter: "", inWord: false }],
    gameStatus: "", // '' | 'WON' | 'LOST'
  });

  const [letterStateArr, setLetterStateArr] = useState([{}]); // For each letter [{ letter: '', state: 'KEYBOARD | CONTAINER | DISABLED | FOUND'}]

  const [windowSize, setWindowSize] = useState([0, 0]);

  const [wordLettersPositions, setWordLettersPositions] = useState([null]);
  const [letterContainerPosition, setLetterContainerPosition] = useState(null);

  // On start
  useEffect(() => {
    dispatchGameState({
      type: ACTIONS.RESTART,
      payload: { setLetterStateArr: setLetterStateArr },
    });
  }, []);

  // Updating window size
  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // When key is pressed
  const onKeyDown = useCallback(
    ({ key }) => {
      if (!howToEnabled) {
        if (/^[A-Za-z]$/.test(key))
          dispatchGameState({
            type: ACTIONS.CHANGE_LETTER,
            payload: {
              newLetter: key.toUpperCase(),
              setLetterStateArr: setLetterStateArr,
              letterStateArr: letterStateArr,
            },
          });
        if (key === "Backspace")
          dispatchGameState({
            type: ACTIONS.CHANGE_LETTER,
            payload: {
              newLetter: "",
              setLetterStateArr: setLetterStateArr,
              letterStateArr: letterStateArr,
            },
          });
        if (key === "Enter") {
          dispatchGameState({
            type: ACTIONS.ENTER_LETTER,
            payload: {
              setLetterStateArr: setLetterStateArr,
              letterStateArr: letterStateArr,
            },
          });
        }
      }
    },
    [letterStateArr, howToEnabled]
  );

  const restartGame = () => {
    dispatchGameState({
      type: ACTIONS.RESTART,
      payload: { setLetterStateArr: setLetterStateArr },
    });
  };

  // Get key input
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="relative flex flex-col justify-between items-center grow overflow-hidden">
      <GameOverMessage gameState={gameState} />
      <Hangman gameState={gameState} />
      <HiddenWord
        gameState={gameState}
        setWordLettersPositions={setWordLettersPositions}
        windowSize={windowSize}
      />
      <LetterContainer
        gameState={gameState}
        restartGame={restartGame}
        setLetterContainerPosition={setLetterContainerPosition}
        windowSize={windowSize}
      />
      <Keyboard
        gameState={gameState}
        windowSize={windowSize}
        wordLettersPositions={wordLettersPositions}
        letterContainerPosition={letterContainerPosition}
        onKeyDown={onKeyDown}
        letterStateArr={letterStateArr}
      />
    </div>
  );
};

export default Hero;
