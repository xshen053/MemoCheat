import React, { useState, useEffect } from 'react';

function MemoryTable() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/memory/')
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(memory => {
          const totalPossibleReviews = memory.type !== 1 ? 13 : 181; // Example, adjust as needed
          const reviewCount = memory.review_dates.length;
          return {
            ...memory,
            reviewRatio: `${totalPossibleReviews - reviewCount}/${totalPossibleReviews}`,
            remainingReviews: totalPossibleReviews - reviewCount // Add this for sorting
          };
        });

        // Sorting the data in descending order of remaining reviews
        updatedData.sort((a, b) => a.remainingReviews - b.remainingReviews);

        setMemories(updatedData);
      });
  }, []);

  // Inline style for hover effect
  const rowStyle = {
    color: 'white',
    backgroundColor: 'transparent', // Default background
  };

  const rowHoverStyle = {
    color: 'white',
    backgroundColor: 'grey', // Hover background
    cursor: 'pointer',
  };

  return (
    <table>
      <thead>
        <tr>
          <th style={{ color: 'yellow' }}>Title</th>
          <th style={{ color: 'yellow' }}>Reviewed</th>
        </tr>
      </thead>
      <tbody>
        {memories.map(memory => (
          <tr key={memory.id }style={rowStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = rowHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = rowStyle.backgroundColor} >
            <td style={{ color: 'white' }}>{memory.title}</td>
            <td style={{ color: 'white' }}>{memory.reviewRatio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MemoryTable;
