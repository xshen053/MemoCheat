import React from "react";
import "./App.css";
import MemoryCalendar from "./components/MemoryCalendar";
import AddMemory from "./components/AddMemory";
import TodayReview from "./components/TodayReview";
import TomorrowReview from "./components/TomorrowReview";
function App() {
  return (
    <div className="App">
      <MemoryCalendar />
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Align the items to the center
          gap: "20px",
          maxWidth: "800px", // Set a maximum width for the container
          margin: "0 auto", // Center the container on the screen
        }}
      >
        <AddMemory />
        <TodayReview />
        <TomorrowReview />
      </div>
    </div>
  );
}

export default App;
