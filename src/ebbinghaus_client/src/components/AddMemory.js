import axios from "axios";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function AddMemory() {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    axios
      .post("http://127.0.0.1:8000/api/memory/", {
        title: title,
      })
      .then((response) => {
        console.log(response.data);
        setTitle("");
        setOpen(false);
      })
      .catch((error) => {
        console.error("There was an error adding the memory:", error);
      });
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="add-memory-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: "80%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: "20px" }}
          >
            Add Memory
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Add New Memory"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            style={{
              padding: "10px",
              transition: "background-color 0.3s",
            }}
            hover={{
              backgroundColor: "#1976D2", // A slightly darker shade of blue for hover effect
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddMemory;
