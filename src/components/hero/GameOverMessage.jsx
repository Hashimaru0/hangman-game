import { useState, useEffect } from "react";

const MESSAGES = [
  "PERFECT",
  "AMAZING",
  "GREAT",
  "WELL DONE",
  "NOT BAD",
  "PHEW",
];

const GameOverMessage = ({ gameState }) => {
  const [message, setMessage] = useState(MESSAGES[0]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (gameState) {
      if (gameState.gameStatus === "WON") {
        setMessage(MESSAGES[gameState.mistakes]);
        setVisible(true);
      } else if (gameState.gameStatus === "LOST") {
        let hiddenWord = gameState.word
          .map((letterObj) => letterObj.letter)
          .join("");
        setMessage(hiddenWord);
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  }, [gameState]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (visible) setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <div
      style={
        visible
          ? {
              opacity: 1,
              transition:
                "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1) 1s, background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }
          : {
              opacity: 0,
              transition:
                "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }
      }
      className="
      absolute top-3 text-base font-bold text-black dark:text-white tracking-[0.1rem] px-2 py-[0.2rem] bg-button_light dark:bg-button_dark rounded"
    >
      {message}
    </div>
  );
};

export default GameOverMessage;
