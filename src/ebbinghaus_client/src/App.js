import React from "react";
import "./App.css";
import MemoryCalendar from "./components/MemoryCalendar";
import AddMemory from "./components/AddMemory";
import TodayReview from "./components/TodayReview";
import TomorrowReview from "./components/TomorrowReview";
import CodingProblemCount from "./components/IsCodingProblem"
function App() {
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Align the items to the center
          gap: "20px",
          maxWidth: "800px", // Set a maximum width for the container
          margin: "0 auto", // Center the container on the screen
        }}
      >
        <CodingProblemCount />
        <AddMemory />
        <TodayReview />
        <TomorrowReview />
      </div>
      <MemoryCalendar style={{ marginTop: "1000px" }} />
    </div>
  );
}

export default App;
