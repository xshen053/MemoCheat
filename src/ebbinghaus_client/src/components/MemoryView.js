import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../css/style.css"; // Import the CSS
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function MemoryList() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/memory/")
      .then((response) => {
        setMemories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the memories:", error);
      });
  }, []);

  return (
    <div>
      <h1>Today's Review</h1>
      <div>
        {memories.map((memory) => (
          <Card
            key={memory.id}
            sx={{
              maxWidth: 345,
              margin: "20px auto",
              backgroundColor: "#e8e3d3",
              transition: "transform 0.3s, box-shadow 0.3s", // This ensures a smooth transformation
              ":hover": {
                transform: "scale(1.05)", // Zooms the card by 5% when hovered
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)", // Adds a deeper shadow
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {memory.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MemoryList;
