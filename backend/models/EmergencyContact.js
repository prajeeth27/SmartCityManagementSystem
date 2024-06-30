// SmartCityManagement/backend/models/EmergencyContact.js

const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema({
  type: { type: String, required: true },  // Type of emergency contact (e.g., ambulance, fire station)
  contact: { type: String, required: true } // Contact details (phone number, email, etc.)
});

const EmergencyContact = mongoose.model('EmergencyContact', EmergencyContactSchema);

module.exports = EmergencyContact;
