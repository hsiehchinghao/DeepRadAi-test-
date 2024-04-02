import { useState } from "react";
import "./styles/style.scss";
import ValueContextProvider from "./context/valueContext";
import ValueData from "./ValueData";
import ScrollSection from "./ScrollSection";

function App() {
  return (
    <ValueContextProvider>
      <div className="App">
        <ValueData />
        <ScrollSection />
      </div>
    </ValueContextProvider>
  );
}

export default App;
