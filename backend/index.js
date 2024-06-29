
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db'); // Import database connection function
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB(); // Call the connectDB function from config/db.js

// Routes
app.get('/', (req, res) => {
  res.send('Smart City Management System API');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
