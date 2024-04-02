import { useState } from "react";
import "./styles/style.scss";
import ValueContextProvider from "./context/valueContext";
//Test1
import ValueData from "./Test1/ValueData";
import ScrollSection from "./Test1/ScrollSection";
//Test2
import List from "./Test2/List";
function App() {
  return (
    <>
      <ValueContextProvider>
        <main className="whole-tests">
          <div className="test1">
            <h1>Test 1</h1>
            <ValueData />
            <ScrollSection />
          </div>
          <div className="test2">
            <h1>Test 2</h1>
            <List />
          </div>
        </main>
      </ValueContextProvider>
    </>
  );
}

export default App;
