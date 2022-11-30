import { useEffect, useRef } from "react";

const HiddenWord = ({ gameState, setWordLettersPositions, windowSize }) => {
  const wordLettersRefs = useRef([]);

  useEffect(() => {
    if (wordLettersRefs.current) {
      let newRefArr = wordLettersRefs.current;
      newRefArr = newRefArr.filter((el) => el);
      let wordLetterPositions = [];
      for (let wordLetterRef of newRefArr) {
        // Changing DOMRect to vanilla object
        let wordLetterPos = wordLetterRef.getBoundingClientRect();
        wordLetterPos = {
          top: wordLetterPos.top,
          right: wordLetterPos.right,
          bottom: wordLetterPos.bottom,
          left: wordLetterPos.left,
          width: wordLetterPos.width,
          height: wordLetterPos.height,
          x: wordLetterPos.x,
          y: wordLetterPos.y,
        };
        wordLetterPositions.push(wordLetterPos);
      }
      setWordLettersPositions(wordLetterPositions);
    }
  }, [windowSize, gameState, setWordLettersPositions]);

  return (
    <div className="flex max-w-full gap-2 px-6">
      {gameState.word.map((letterObj, i) => (
        <div
          key={i}
          ref={(el) => (wordLettersRefs.current[i] = el)}
          className="flex justify-center items-center w-7 h-10 pb-2 border-b-2 border-neutral-300 dark:border-[#888] transition-all"
        ></div>
      ))}
    </div>
  );
};

export default HiddenWord;
