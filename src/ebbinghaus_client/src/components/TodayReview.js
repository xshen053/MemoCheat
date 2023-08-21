import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function TodayReview() {
  const [memories, setMemories] = useState([]);
  const today = moment().tz("America/Los_Angeles").startOf("day");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/memory/")
      .then((response) => {
        const todaysMemories = response.data.filter((memory) => {
          return memory.review_dates.some((reviewDateObj) =>
            moment(reviewDateObj.date)
              .tz("America/Los_Angeles")
              .isSame(today, "day")
          );
        });
        setMemories(todaysMemories);
      })
      .catch((error) => {
        console.error("Error fetching today's memories:", error);
      });
  }, []);

  function markMemoryAsReviewed(memoryId) {
    axios
      .post(`http://127.0.0.1:8000/api/mark_as_reviewed/${memoryId}/`)
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Memory marked as reviewed.") {
          // Remove this memory from the list
          setMemories((prevMemories) =>
            prevMemories.filter((memory) => memory.id !== memoryId)
          );
        }
      })
      .catch((error) => {
        console.error("Error marking memory as reviewed:", error);
      });
  }

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
              transition: "transform 0.3s, box-shadow 0.3s",
              ":hover": {
                transform: "scale(1.05)",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {memory.title}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#4b2e83",
                  "&:hover": { backgroundColor: "#85754d" },
                }} // Custom color and hover effect
                onClick={() => markMemoryAsReviewed(memory.id)}
              >
                Mark as Reviewed
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TodayReview;
