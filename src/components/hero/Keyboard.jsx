import KeyButton from "./Keyboard/KeyButton";

let ALL_LETTERS = "QWERTYUIOPASDFGHJKLZXCVBNM";

const Line = ({
  gameState,
  letterStateArr,
  wordLettersPositions,
  letterContainerPosition,
  windowSize,
  onKeyDown,
  letterLineCutoff,
  index,
}) => {
  return (
    <div className="flex mb-[0.4rem]">
      {index === 2 && (
        <button
          style={{
            transitionProperty: "background-color",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "200ms",
          }}
          className="w-[3.9rem] h-[3.5rem] mr-[0.3rem] bg-button_light md:hover:bg-button_light_hover dark:bg-button_dark md:dark:hover:bg-button_dark_hover rounded"
          onClick={() => onKeyDown({ key: "Enter" })}
        >
          ENTER
        </button>
      )}
      {index === 1 && <div className="w-[1.4rem]"></div>}
      {ALL_LETTERS.split("")
        .slice(letterLineCutoff[0], letterLineCutoff[1])
        .map((letter, i) => (
          <KeyButton
            key={letter}
            letter={letter}
            index={letterLineCutoff[0] + i}
            gameState={gameState}
            letterStateArr={letterStateArr}
            wordLettersPositions={wordLettersPositions}
            letterContainerPosition={letterContainerPosition}
            windowSize={windowSize}
            onKeyDown={onKeyDown}
          />
        ))}
      {index === 1 && <div className="w-[1.1rem]"></div>}
      {index === 2 && (
        <button
          style={{
            transitionProperty: "background-color",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "200ms",
          }}
          className="flex justify-center items-center w-[3.9rem] h-[3.5rem] bg-button_light md:hover:bg-button_light_hover dark:bg-button_dark md:dark:hover:bg-button_dark_hover rounded"
          onClick={() => onKeyDown({ key: "Backspace" })}
        >
          <svg
            className="fill-black/90 dark:fill-white transition"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.7 15.3C10.8833 15.4833 11.1167 15.575 11.4 15.575C11.6833 15.575 11.9167 15.4833 12.1 15.3L14 13.4L15.9 15.3C16.0833 15.4833 16.3167 15.575 16.6 15.575C16.8833 15.575 17.1167 15.4833 17.3 15.3C17.4833 15.1167 17.575 14.8833 17.575 14.6C17.575 14.3167 17.4833 14.0833 17.3 13.9L15.4 12L17.3 10.1C17.4833 9.91667 17.575 9.68333 17.575 9.4C17.575 9.11667 17.4833 8.88333 17.3 8.7C17.1167 8.51667 16.8833 8.425 16.6 8.425C16.3167 8.425 16.0833 8.51667 15.9 8.7L14 10.6L12.1 8.7C11.9167 8.51667 11.6833 8.425 11.4 8.425C11.1167 8.425 10.8833 8.51667 10.7 8.7C10.5167 8.88333 10.425 9.11667 10.425 9.4C10.425 9.68333 10.5167 9.91667 10.7 10.1L12.6 12L10.7 13.9C10.5167 14.0833 10.425 14.3167 10.425 14.6C10.425 14.8833 10.5167 15.1167 10.7 15.3V15.3ZM9 19C8.66667 19 8.354 18.925 8.062 18.775C7.77067 18.625 7.53333 18.4167 7.35 18.15L3.825 13.15C3.59167 12.8 3.475 12.4167 3.475 12C3.475 11.5833 3.59167 11.2 3.825 10.85L7.35 5.85C7.53333 5.58333 7.77067 5.375 8.062 5.225C8.354 5.075 8.66667 5 9 5H19C19.55 5 20.021 5.196 20.413 5.588C20.8043 5.97933 21 6.45 21 7V17C21 17.55 20.8043 18.021 20.413 18.413C20.021 18.8043 19.55 19 19 19H9ZM5.45 12L9 17H19V7H9L5.45 12ZM19 12V7V17V12Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

const Keyboard = ({
  gameState,
  letterStateArr,
  wordLettersPositions,
  letterContainerPosition,
  windowSize,
  onKeyDown,
}) => {
  return (
    <div className="max-w-full px-[0.3rem] select-none">
      <Line
        gameState={gameState}
        letterStateArr={letterStateArr}
        wordLettersPositions={wordLettersPositions}
        letterContainerPosition={letterContainerPosition}
        windowSize={windowSize}
        onKeyDown={onKeyDown}
        letterLineCutoff={[0, 10]}
        index={0}
      />
      <Line
        gameState={gameState}
        letterStateArr={letterStateArr}
        wordLettersPositions={wordLettersPositions}
        letterContainerPosition={letterContainerPosition}
        windowSize={windowSize}
        onKeyDown={onKeyDown}
        letterLineCutoff={[10, 19]}
        index={1}
      />
      <Line
        gameState={gameState}
        letterStateArr={letterStateArr}
        wordLettersPositions={wordLettersPositions}
        letterContainerPosition={letterContainerPosition}
        windowSize={windowSize}
        onKeyDown={onKeyDown}
        letterLineCutoff={[19, 26]}
        index={2}
      />
    </div>
  );
};

export default Keyboard;
