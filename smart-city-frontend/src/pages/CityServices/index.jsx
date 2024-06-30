import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const CityServices = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/city-services', formData);
      console.log('Service added:', response.data);
      setFormData({
        name: '',
        description: '',
        contact: ''
      });
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <div className="city-services-container">
      <h2>Add City Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Service Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default CityServices;
