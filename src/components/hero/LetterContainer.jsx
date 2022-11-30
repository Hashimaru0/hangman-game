import { useState, useEffect, useRef } from "react";
import ReloadIcon from "./ReloadIcon";

const LetterContainer = ({
  gameState,
  restartGame,
  setLetterContainerPosition,
  windowSize,
}) => {
  const containerRef = useRef();
  const [restartEnabled, setRestartEnabled] = useState(false);

  useEffect(() => {
    if (containerRef) {
      // Changing DOMRect to vanilla object
      let letterContainerPos = containerRef.current.getBoundingClientRect();
      letterContainerPos = {
        top: letterContainerPos.top,
        right: letterContainerPos.right,
        bottom: letterContainerPos.bottom,
        left: letterContainerPos.left,
        width: letterContainerPos.width,
        height: letterContainerPos.height,
        x: letterContainerPos.x,
        y: letterContainerPos.y,
      };

      setLetterContainerPosition(letterContainerPos);
    }
  }, [windowSize, setLetterContainerPosition]);

  useEffect(() => {
    if (!restartEnabled && gameState.gameStatus !== "") {
      setRestartEnabled(true);
    }
  }, [gameState]);

  return (
    <div
      ref={containerRef}
      className={`relative max-w-[4.5rem] sm:max-w-[5rem] w-full h-[4.5rem] sm:h-[5rem] z-20`}
    >
      <button
        style={
          restartEnabled
            ? {
                opacity: 1,
                transition:
                  "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1) 3s, background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }
            : {
                opacity: 0,
                transition:
                  "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }
        }
        className={`flex justify-center items-center w-full h-full
         bg-button_light hover:bg-button_light_hover dark:bg-button_dark dark:hover:bg-button_dark_hover rounded`}
        disabled={!restartEnabled}
        onClick={() => {
          setRestartEnabled(false);
          restartGame();
        }}
      >
        <ReloadIcon />
      </button>
    </div>
  );
};

export default LetterContainer;
