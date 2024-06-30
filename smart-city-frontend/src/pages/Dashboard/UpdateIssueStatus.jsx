import React, { useState } from 'react';
import axios from 'axios';
import './viewIssuesStyles.css';

const UpdateIssueStatus = () => {
  const [issueId, setIssueId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/api/issues/${issueId}`, { status });
      console.log('Issue status updated:', response.data);
      setIssueId('');
      setStatus('');
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };

  return (
    <div className="update-issue-status-container">
      <h2>Update Issue Status</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="issueId">Issue ID</label>
          <input
            type="text"
            id="issueId"
            value={issueId}
            onChange={(e) => setIssueId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
};

export default UpdateIssueStatus;
