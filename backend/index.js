const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import database connection function
const Issue = require('./models/Issue'); // Import Issue model
const CityService = require('./models/CityService');
const EmergencyContact = require('./models/EmergencyContact');

const port = process.env.PORT || 5000;


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB(); 


// Routes
app.get('/', (req, res) => {
  res.send('Smart City Management System API');
});
app.get('/api/emergency-contacts', async (req, res) => {
  try {
    const emergencyContacts = await EmergencyContact.find();
    res.json(emergencyContacts);
  } catch (error) {
    console.error('Error fetching emergency contacts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new emergency contact
app.post('/api/emergency-contacts', async (req, res) => {
  const { type, contact } = req.body;

  try {
    const newEmergencyContact = new EmergencyContact({ type, contact });
    await newEmergencyContact.save();
    res.status(201).json({ message: 'Emergency contact added successfully', emergencyContact: newEmergencyContact });
  } catch (error) {
    console.error('Error adding emergency contact:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update an existing emergency contact
app.put('/api/emergency-contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { type, contact } = req.body;

  try {
    const updatedEmergencyContact = await EmergencyContact.findByIdAndUpdate(id, { type, contact }, { new: true });
    if (!updatedEmergencyContact) {
      return res.status(404).json({ error: 'Emergency contact not found' });
    }
    res.json({ message: 'Emergency contact updated successfully', emergencyContact: updatedEmergencyContact });
  } catch (error) {
    console.error('Error updating emergency contact:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete an emergency contact
app.delete('/api/emergency-contacts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmergencyContact = await EmergencyContact.findByIdAndDelete(id);
    if (!deletedEmergencyContact) {
      return res.status(404).json({ error: 'Emergency contact not found' });
    }
    res.json({ message: 'Emergency contact deleted successfully', emergencyContact: deletedEmergencyContact });
  } catch (error) {
    console.error('Error deleting emergency contact:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/issues - Create a new issue
app.post('/api/issues', async (req, res) => {
  try {
    const { type, location, description, urgency } = req.body;

    // Create a new issue instance
    const newIssue = new Issue({
      type,
      location,
      description,
      urgency,
    });

    // Save the issue to the database
    const savedIssue = await newIssue.save();

    res.status(201).json(savedIssue); // Return the saved issue as JSON response
  } catch (error) {
    console.error('Error saving issue:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/issues/:id - Update issue status
app.patch('/api/issues/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedIssue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.status(200).json(updatedIssue);
  } catch (error) {
    console.error('Error updating issue status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// POST /api/city-services - Create a new city service
app.post('/api/city-services', async (req, res) => {
  try {
    const { name, description, contact } = req.body;
    const newService = new CityService({
      name,
      description,
      contact,
    });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error('Error saving city service:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/city-services - Get all city services
app.get('/api/city-services', async (req, res) => {
  try {
    const services = await CityService.find();
    res.json(services);
  } catch (error) {
    console.error('Error fetching city services:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/issues/:id - Update the status of an issue
app.patch('/api/issues/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedIssue);
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
