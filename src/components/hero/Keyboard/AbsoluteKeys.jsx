import { useState, useEffect } from "react";

const AbsoluteKeys = ({ letter, targetStylesObj }) => {
  const [currentTarget, setCurrentTarget] = useState(null);
  const [currentStyles, setCurrentStyles] = useState(null);

  // Filter style so that the transitions get turned off for when resizing the window
  useEffect(() => {
    let newTargetStylesObj = JSON.parse(JSON.stringify(targetStylesObj));
    let newStylesArr = [...newTargetStylesObj.styles];
    let timer;

    if (currentTarget === newTargetStylesObj.target) {
      for (let newStyle of newStylesArr) {
        newStyle.transitionProperty = "background-color";
      }
    } else {
      setCurrentTarget(newTargetStylesObj.target);
      timer = setTimeout(() => {
        let unfrozenNewStylesArr = JSON.parse(JSON.stringify(newStylesArr));
        for (let newStyle of unfrozenNewStylesArr) {
          newStyle.transitionProperty = "background-color";
        }

        setCurrentStyles(newStylesArr);
      }, 200);
    }

    setCurrentStyles(newStylesArr);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetStylesObj]);

  return (
    <>
      {currentStyles &&
        currentStyles.map((style, i) => (
          <div
            key={i}
            style={style}
            className={`
      absolute flex justify-center items-center bg-button_light dark:bg-button_dark ${
        currentTarget === "KEYBOARD" &&
        "md:group-hover:bg-button_light_hover md:dark:group-hover:bg-button_dark_hover"
      } rounded z-10`}
          >
            {letter}
          </div>
        ))}
    </>
  );
};

export default AbsoluteKeys;
