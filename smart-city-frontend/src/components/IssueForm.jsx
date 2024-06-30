import React, { useState } from 'react';
import axios from 'axios';
import './issueFormStyles.css'; // Import your styles

const IssueForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    urgency: 'low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/issues', formData);
      console.log('Issue submitted:', response.data);
      // Optionally, show a success message or clear form fields
      setFormData({
        type: '',
        location: '',
        description: '',
        urgency: 'low',
      });
    } catch (error) {
      console.error('Error submitting issue:', error);
      // Handle error display or logging
    }
  };

  return (
    <div className="issue-form-container">
      <h2>Report an Issue</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Issue Type</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Road Maintenance">Road Maintenance</option>
            <option value="Trash Collection">Trash Collection</option>
            <option value="Water Supply">Water Supply</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="urgency">Urgency</label>
          <select id="urgency" name="urgency" value={formData.urgency} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IssueForm;
