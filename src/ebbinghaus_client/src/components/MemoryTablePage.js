import React, { useState, useEffect } from 'react';

function MemoryTable() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/memory/')
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(memory => {
          const totalPossibleReviews = 13; // This is an example, adjust as needed
          const reviewCount = memory.review_dates.length;
          return {
            ...memory,
            reviewRatio: `${reviewCount}/${totalPossibleReviews}`
          };
        });
        setMemories(updatedData);
      });
  }, []);

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
         <tr key={memory.id}>
         <td style={{ color: 'white' }}>{memory.title}</td>
         <td style={{ color: 'white' }}>{memory.reviewRatio}</td>
       </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MemoryTable;
