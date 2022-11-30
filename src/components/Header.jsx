import DarkModeIcon from "../components/header/DarkModeIcon";
import HintIcon from "../components/header/HintIcon";

const Header = ({ setDarkMode, setHowToEnabled }) => {
  return (
    <div className="flex justify-between items-center h-[3rem] px-5 sm:px-10 border-b border-black/40 dark:border-[#444]">
      <button onClick={() => setHowToEnabled(true)}>
        <HintIcon />
      </button>
      <div className="text-2xl tracking-wide">Hangman</div>
      <button onClick={() => setDarkMode((prev) => !prev)}>
        <DarkModeIcon />
      </button>
    </div>
  );
};

export default Header;
