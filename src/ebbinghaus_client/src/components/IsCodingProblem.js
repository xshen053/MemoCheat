import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function CodingProblemCount() {
    const [codingProblemCount, setCodingProblemCount] = useState(0);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/memory/")
            .then((response) => {
                const count = response.data.reduce((acc, item) => {
                    return acc + (item.is_coding_problem === 1 ? 1 : 0);
                }, 0);
                setCodingProblemCount(count);
            })
            .catch((error) => {
                console.error("There was an error fetching the memories:", error);
            });
    }, []);

    return (
        <Button
            variant="contained"
            color="primary"
            style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                backgroundColor: '#4b2e83', // Your custom color here
              }}
        >
            Cracked Coding Problems: {codingProblemCount} / 100
        </Button>
    );
}

export default CodingProblemCount;
