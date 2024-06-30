// SmartCityManagement/frontend/src/components/EmergencyContactsManager.jsx

import React, { useState, useEffect } from 'react';
import './EmergencyContacts.css'; 

const BASE_URL = 'http://localhost:5000';

const EmergencyContactsManager = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [newContact, setNewContact] = useState({ type: '', contact: '' });
  const [editContact, setEditContact] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {
    fetchEmergencyContactsData();
  }, []);

  const fetchEmergencyContactsData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/emergency-contacts`);
      if (!response.ok) {
        throw new Error('Failed to fetch emergency contacts');
      }
      const data = await response.json();
      setEmergencyContacts(data);
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
    }
  };

  const handleAddContact = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/emergency-contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
      if (!response.ok) {
        throw new Error('Failed to add emergency contact');
      }
      const data = await response.json();
      setEmergencyContacts([...emergencyContacts, data.emergencyContact]);
      setNewContact({ type: '', contact: '' });
    } catch (error) {
      console.error('Error adding emergency contact:', error);
    }
  };

  const handleEditContact = async () => {
    if (!editContact) return;

    try {
      const response = await fetch(`${BASE_URL}/api/emergency-contacts/${editContact._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editContact),
      });
      if (!response.ok) {
        throw new Error('Failed to update emergency contact');
      }
      const updatedContact = await response.json();
      const updatedContacts = emergencyContacts.map(contact =>
        contact._id === updatedContact._id ? updatedContact : contact
      );
      setEmergencyContacts(updatedContacts);
      setEditContact(null);
    } catch (error) {
      console.error('Error updating emergency contact:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/emergency-contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete emergency contact');
      }
      const updatedContacts = emergencyContacts.filter(contact => contact._id !== id);
      setEmergencyContacts(updatedContacts);
    } catch (error) {
      console.error('Error deleting emergency contact:', error);
    }
  };

  return (
    <div className="emergency-contacts">
      <h2>Emergency Contacts</h2>
      <button onClick={() => setShowDropdown(!showDropdown)}>View Contacts</button>
      {showDropdown && (
        <div className="contacts-dropdown">
          <ul>
            {emergencyContacts.map(contact => (
              <li key={contact._id}>
                <strong>Type:</strong> {contact.type}<br />
                <strong>Contact:</strong> {contact.contact}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Add New Contact</h3>
      <div className="add-contact">
        <label>Type:</label>
        <input type="text" value={newContact.type} onChange={(e) => setNewContact({ ...newContact, type: e.target.value })} />
        <label>Contact:</label>
        <input type="text" value={newContact.contact} onChange={(e) => setNewContact({ ...newContact, contact: e.target.value })} />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>

      {editContact && (
        <div className="edit-contact">
          <h3>Edit Contact</h3>
          <label>Type:</label>
          <input type="text" value={editContact.type} onChange={(e) => setEditContact({ ...editContact, type: e.target.value })} />
          <label>Contact:</label>
          <input type="text" value={editContact.contact} onChange={(e) => setEditContact({ ...editContact, contact: e.target.value })} />
          <button onClick={handleEditContact}>Save Changes</button>
        </div>
      )}

      <ul className="contact-list">
        {emergencyContacts.map(contact => (
          <li key={contact._id}>
            <strong>Type:</strong> {contact.type}<br />
            <strong>Contact:</strong> {contact.contact}<br />
            <button onClick={() => setEditContact(contact)}>Edit</button>
            <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyContactsManager;
