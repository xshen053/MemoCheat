import axios from "axios";
import React, { useState } from "react";

function AddMemory() {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    // Get the current date
    const currentDate = new Date();

    // Calculate the review date (2 days from now for this example)
    const reviewDate = new Date(currentDate);
    reviewDate.setDate(currentDate.getDate() + 2);

    // Convert review date to ISO string format
    const reviewDateString = reviewDate.toISOString();

    axios
      .post("http://127.0.0.1:8000/api/memory/", {
        title: title,
        review_date: reviewDateString,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error adding the memory:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Memory</button>
    </div>
  );
}
export default AddMemory;
