import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewIssuesStyles.css';

const ViewIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/issues');
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="issues-container">
      <h2>Reported Issues</h2>
      <ul>
        {issues.map(issue => (
          <li key={issue._id}>
            <h3>{issue.type}</h3>
            <p>{issue.description}</p>
            <p><strong>Status:</strong> {issue.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewIssues;
