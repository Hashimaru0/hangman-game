import { useState, useEffect } from "react";

const HowToPlay = ({ howToEnabled, setHowToEnabled }) => {
  const [visible, setVisible] = useState(false);

  const disable = () => {
    setVisible(false);

    let timer = setTimeout(() => {
      setHowToEnabled(false);
    }, 200);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    setVisible(howToEnabled);
  }, [howToEnabled]);

  return (
    <>
      {howToEnabled && (
        <div
          className={`${
            visible ? "opacity-100" : "opacity-0"
          } absolute w-full h-full z-50 transition`}
        >
          <div
            className="absolute w-full h-full bg-[#000]/80"
            onClick={() => disable()}
          ></div>
          <div className="absolute left-0 right-0 text-black dark:text-white bg-white dark:bg-black w-full sm:w-[25rem] h-full sm:h-[30rem] mx-auto sm:mt-20 rounded shadow-lg">
            <button
              className="absolute right-5 top-2"
              onClick={() => disable()}
            >
              X
            </button>
            <div className="text-center text-xl mt-5">How To Play</div>
            <div className="mt-10 px-7">Guess the word in 6 tries.</div>
            <div className="mt-5 px-7">
              Enter a letter one at a time. If the letter is in the word it will
              be added, otherwise a body part of the stickman will be added.
            </div>
            <div className="mt-5 px-7">
              If the hangman is completed, the game is over.
            </div>
            <svg
              className="mx-auto mt-8 stroke-black dark:stroke-white"
              width="150"
              height="150"
              viewBox="0 0 366 314"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M300.82 218.2C288.07 227.89 261.346 249.412 256.45 257.98"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M300.82 218.2C307.323 225.375 326.83 242.764 352.84 254.92"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M303.88 155.47C317.14 153.43 347.332 148.126 362.02 143.23"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M304 155C290.772 152.667 260.653 146.6 246 141"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M309 61.5C341.751 64.1751 347.653 83.7212 335.5 104C325.079 121.388 298.143 124.752 284 114C264.647 99.2869 268.061 58.1561 309 61.5Z"
                strokeWidth="7"
              />
              <path
                d="M4 310C55.883 305.382 172.583 298.916 224.32 310"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M113.342 303.534C115.533 308.086 120.153 255.167 121.105 7.07092"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M123.34 6.70333C137.62 4.66333 194.332 1.80733 306.94 6.70333"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M307.179 7.06C306.708 17.26 306.614 41.944 310 59.08"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M305.41 121.81C300.82 147.82 306.94 196.474 300.82 219.73"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default HowToPlay;
