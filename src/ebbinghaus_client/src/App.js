import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MemoryCalendar from "./components/MemoryCalendar";
import AddMemory from "./components/AddMemory";
import TodayReview from "./components/TodayReview";
import TomorrowReview from "./components/TomorrowReview";
import CodingProblemCount from "./components/IsCodingProblem";
import MemoryTablePage from "./components/MemoryTablePage"; // Import your new component

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link> | <Link to="/memory-table">Memory Table</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <CodingProblemCount />
              <AddMemory />
              <TodayReview />
              <TomorrowReview />
            </div>
          } />
          <Route path="/memory-table" element={<MemoryTablePage />} />
        </Routes>
        <MemoryCalendar style={{ marginTop: "1000px" }} />
      </div>
    </Router>
  );
}

export default App;
