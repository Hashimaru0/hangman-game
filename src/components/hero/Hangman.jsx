import { useState, useEffect, useRef } from "react";

const Hangman = (props) => {
  const head = useRef(null);
  const body = useRef(null);
  const armLeft = useRef(null);
  const legLeft = useRef(null);
  const legRight = useRef(null);
  const armRight = useRef(null);

  const [headSize, setHeadSize] = useState(0);
  const [bodySize, setBodySize] = useState(0);
  const [armLeftSize, setArmLeftSize] = useState(0);
  const [legLeftSize, setLegLeftSize] = useState(0);
  const [legRightSize, setLegRightSize] = useState(0);
  const [armRightSize, setArmRightSize] = useState(0);

  useEffect(() => {
    setHeadSize(head.current.getTotalLength());
    setBodySize(body.current.getTotalLength());
    setArmLeftSize(armLeft.current.getTotalLength());
    setLegLeftSize(legLeft.current.getTotalLength());
    setLegRightSize(legRight.current.getTotalLength());
    setArmRightSize(armRight.current.getTotalLength());
  }, []);

  return (
    <svg
      style={{ transition: "stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1)" }}
      className="stroke-[#444] dark:stroke-white stroke-[6px] mt-10"
      width="200"
      height="200"
      viewBox="0 0 366 314"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 310C55.883 305.382 172.583 298.916 224.32 310"
        strokeLinecap="round"
      />
      <path
        d="M113.342 303.534C115.533 308.086 120.153 255.167 121.105 7.07092"
        strokeLinecap="round"
      />
      <path
        d="M123.34 6.70333C137.62 4.66333 194.332 1.80733 306.94 6.70333"
        strokeLinecap="round"
      />
      <path
        d="M307.179 7.06C306.708 17.26 306.614 41.944 310 59.08"
        strokeLinecap="round"
      />
      <path
        ref={head}
        style={{
          stroke: props.gameState.mistakes < 1 && "transparent",
          strokeDasharray: headSize,
          strokeDashoffset: props.gameState.mistakes >= 1 ? 0 : headSize,
          transition: "stroke-dashoffset 1s ease-in-out",
        }}
        strokeLinecap="round"
        d="M309 61.5C341.751 64.1751 347.653 83.7212 335.5 104C325.079 121.388 298.143 124.752 284 114C264.647 99.2869 268.061 58.1561 309 61.5Z"
      />
      <path
        style={{
          stroke: props.gameState.mistakes < 2 && "transparent",
          strokeDasharray: bodySize,
          strokeDashoffset: props.gameState.mistakes >= 2 ? 0 : bodySize,
          transition: "stroke-dashoffset 0.5s ease-in-out",
        }}
        ref={body}
        d="M305.41 121.81C300.82 147.82 306.94 196.474 300.82 219.73"
        strokeLinecap="round"
      />
      <path
        style={{
          stroke: props.gameState.mistakes < 3 && "transparent",
          strokeDasharray: armLeftSize,
          strokeDashoffset: props.gameState.mistakes >= 3 ? 0 : armLeftSize,
          transition: "stroke-dashoffset 0.5s ease-in-out",
        }}
        ref={armLeft}
        d="M303.88 155.47C317.14 153.43 347.332 148.126 362.02 143.23"
        strokeLinecap="round"
      />
      <path
        style={{
          stroke: props.gameState.mistakes < 4 && "transparent",
          strokeDasharray: legLeftSize,
          strokeDashoffset: props.gameState.mistakes >= 4 ? 0 : legLeftSize,
          transition: "stroke-dashoffset 0.5s ease-in-out",
        }}
        ref={legLeft}
        d="M300.82 218.2C307.323 225.375 326.83 242.764 352.84 254.92"
        strokeLinecap="round"
      />
      <path
        style={{
          stroke: props.gameState.mistakes < 5 && "transparent",
          strokeDasharray: legRightSize,
          strokeDashoffset: props.gameState.mistakes >= 5 ? 0 : legRightSize,
          transition: "stroke-dashoffset 0.5s ease-in-out",
        }}
        ref={legRight}
        d="M300.82 218.2C288.07 227.89 261.346 249.412 256.45 257.98"
        strokeLinecap="round"
      />
      <path
        style={{
          stroke: props.gameState.mistakes < 6 && "transparent",
          strokeDasharray: armRightSize,
          strokeDashoffset: props.gameState.mistakes >= 6 ? 0 : armRightSize,
          transition: "stroke-dashoffset 0.5s ease-in-out",
        }}
        ref={armRight}
        d="M304 155C290.772 152.667 260.653 146.6 246 141"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Hangman;
