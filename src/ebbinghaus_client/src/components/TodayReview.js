import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function TodayReview() {
  const [memories, setMemories] = useState([]);
  const today = moment().tz("America/Los_Angeles").startOf("day");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  function triggerTestSnackbar() {
    setSnackbarOpen(true);
  }

  function fetchTodaysMemories() {
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
  }

  useEffect(() => {
    fetchTodaysMemories(); // Use the extracted function here
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
          setSnackbarOpen(true); // Open the Snackbar to display the success message
        }
      })
      .catch((error) => {
        console.error("Error marking memory as reviewed:", error);
      });
  }

  return (
    <div>
      <h1>Today's Review</h1>
      <Button
        variant="contained"
        color="secondary"
        onClick={triggerTestSnackbar}
      >
        Test "Good Job!" Snackbar
      </Button>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            width: "100%",
            bgcolor: "#4b2e83", // Blue background color 4b2e83
            color: "#fff", // White text color
            ".MuiAlert-icon": { color: "#e8e3d3" }, // This targets the checkmark icon e8e3d3
            ".MuiAlert-message": {
              color: "#e8e3d3",
              fontWeight: "bold", // Bold text
            }, // Yellow text color for the "Good Job!" message
          }}
        >
          Good Job!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TodayReview;
