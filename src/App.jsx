import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowToPlay from "./components/hero/HowToPlay";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [howToEnabled, setHowToEnabled] = useState(false);

  return (
    <div className={`${darkMode && "dark"} h-full`}>
      <div className="flex flex-col text-black/90 dark:text-white h-full bg-white dark:bg-black/90 transition">
        <HowToPlay
          howToEnabled={howToEnabled}
          setHowToEnabled={setHowToEnabled}
        />
        <Header setDarkMode={setDarkMode} setHowToEnabled={setHowToEnabled} />
        <Hero howToEnabled={howToEnabled} />
      </div>
    </div>
  );
}

export default App;
