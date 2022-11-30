import { useState, useEffect, useRef } from "react";
import AbsoluteKeys from "./AbsoluteKeys";

const KeyButton = ({
  letter,
  index,
  gameState,
  letterStateArr,
  wordLettersPositions,
  letterContainerPosition,
  windowSize,
  onKeyDown,
}) => {
  const keyRef = useRef(null);
  const [keyPosition, setKeyPosition] = useState(null);

  const [targetStylesObj, setTargetStylesObj] = useState(null); // { target: "KEYBOARD", styles: [{styles...}]}

  const changeTargetStylesObj = (
    target,
    position,
    fontSize,
    opacity,
    transparentBackground,
    transition
  ) => {
    let posArr = [];

    for (let pos of position) {
      let posObj = {
        top: pos.top,
        left: pos.left,
        width: pos.width,
        height: pos.height,
        fontSize: fontSize,
        opacity: opacity,
        transitionProperty: transition,
        transitionDuration: "0.2s",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      };

      if (transparentBackground) {
        posObj.backgroundColor = "transparent";
      }

      posArr.push(posObj);
    }

    setTargetStylesObj({ target: target, styles: posArr });
  };

  // Key position update on window resize
  useEffect(() => {
    if (keyRef) {
      let keyPos = keyRef.current.getBoundingClientRect();
      keyPos = {
        top: keyPos.top,
        right: keyPos.right,
        bottom: keyPos.bottom,
        left: keyPos.left,
        width: keyPos.width,
        height: keyPos.height,
        x: keyPos.x,
        y: keyPos.y,
      };

      setKeyPosition(keyPos);
    }
  }, [windowSize]);

  useEffect(() => {
    if (letterStateArr[index] && keyPosition && letterContainerPosition) {
      let absKeysToDisplay = 1;
      let ltrsInWord = 0;
      for (let i = 0; i < gameState.word.length; i++) {
        if (gameState.word[i].letter === letter) {
          ltrsInWord++;
        }
      }

      if (ltrsInWord > 1) absKeysToDisplay = ltrsInWord;
      let absPositionsArr = [];

      switch (letterStateArr[index].state) {
        case "KEYBOARD":
          for (let i = 0; i < absKeysToDisplay; i++) {
            let posObj = { ...keyPosition, top: keyPosition.top - 48 };
            absPositionsArr.push(posObj);
          }

          changeTargetStylesObj(
            "KEYBOARD",
            absPositionsArr,
            "1.2rem",
            1,
            false,
            "top, left, width, height, font-size, background-color"
          );
          break;
        case "CONTAINER":
          for (let i = 0; i < absKeysToDisplay; i++) {
            let posObj = {
              ...letterContainerPosition,
              top: letterContainerPosition.top - 48,
            };
            absPositionsArr.push(posObj);
          }

          changeTargetStylesObj(
            "CONTAINER",
            absPositionsArr,
            "2rem",
            1,
            false,
            "top, left, width, height, font-size, background-color"
          );
          break;
        case "DISABLED":
          for (let i = 0; i < absKeysToDisplay; i++) {
            let posObj = {
              ...letterContainerPosition,
              top: letterContainerPosition.top - 41,
              left: letterContainerPosition.left - 7,
            };
            absPositionsArr.push(posObj);
          }

          changeTargetStylesObj(
            "DISABLED",
            absPositionsArr,
            "2rem",
            0,
            false,
            "top, left, width, height, font-size, background-color, opacity"
          );
          break;
        case "FOUND":
          let ltrPositionsInWord = [];

          for (let i = 0; i < gameState.word.length; i++) {
            if (gameState.word[i].letter === letter) {
              ltrPositionsInWord.push({
                ...wordLettersPositions[i],
                top: wordLettersPositions[i].top - 48,
              });
            }
          }

          changeTargetStylesObj(
            "FOUND",
            ltrPositionsInWord,
            "1.5rem",
            1,
            true,
            "top, left, width, height, font-size, background-color, opacity"
          );
          break;
        default:
          return;
      }
    }
  }, [letterStateArr, letterContainerPosition]);

  return (
    <div
      className={`group w-[2.5rem] h-[3.5rem] mr-[0.3rem] ${
        letter === "P" && "mr-0"
      }`}
    >
      <button
        ref={keyRef}
        className={`relative w-full h-full z-20`}
        disabled={targetStylesObj && targetStylesObj.target !== "KEYBOARD"}
        onClick={() => onKeyDown({ key: letter })}
      ></button>
      {targetStylesObj && (
        <AbsoluteKeys letter={letter} targetStylesObj={targetStylesObj} />
      )}
    </div>
  );
};

export default KeyButton;
