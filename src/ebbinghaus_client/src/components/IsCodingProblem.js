import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function CodingProblemCount({ label, countCondition, buttonStyle, total}) {
    const [codingProblemCount, setCodingProblemCount] = useState(0);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/memory/")
            .then((response) => {
                const count = response.data.reduce((acc, item) => {
                    return acc + (item.is_coding_problem === countCondition ? 1 : 0);
                }, 0);
                setCodingProblemCount(count);
            })
            .catch((error) => {
                console.error("There was an error fetching the memories:", error);
            });
    }, [countCondition]);

    return (
        <Button
            variant="contained"
            color="primary"
            style={{
                position: 'fixed',
                ...buttonStyle, // Spread the buttonStyle prop here
                backgroundColor: '#4b2e83', // Your custom color here
            }}
        >
            {label}: {codingProblemCount} / {total}
        </Button>
    );
}

export default CodingProblemCount;
