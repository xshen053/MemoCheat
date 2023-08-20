import React from "react";
import "./App.css";
import MemoryList from "./components/MemoryView";
import AddMemory from "./components/AddMemory";

function App() {
  return (
    <div className="App">
      <AddMemory />
      <MemoryList />
    </div>
  );
}

export default App;
