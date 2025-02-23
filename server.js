const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const uri = "mongodb+srv://ikramlechqer:ikramlechqer@cluster0.owgf0.mongodb.net/Form-database?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Schema
const formSchema = new mongoose.Schema({
  name: String,
  surname: String,
  age: Number,
  country: String,
  gender: String,
  occupation: String,
  interest: String,
  file: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Create Model
const Form = mongoose.model('form', formSchema);

// POST endpoint to handle form submission
app.post('/api/submit-form', async (req, res) => {
  try {
    const formData = new Form({
      name: req.body.name,
      surname: req.body.surname,
      age: req.body.age,
      country: req.body.country,
      gender: req.body.gender,
      occupation: req.body.occupation,
      interest: req.body.interest,
      file: req.body.file
    });

    await formData.save();
    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Error saving form data' });
  }
});

// GET endpoint to retrieve all form submissions
app.get('/api/form-submissions', async (req, res) => {
  try {
    const submissions = await Form.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error retrieving form submissions:', error);
    res.status(500).json({ message: 'Error retrieving form submissions' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});