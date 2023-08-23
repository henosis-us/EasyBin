// Routes File
// - Defines the endpoints for the application.
// - Includes routes for paste creation, sharing, API access, etc.
// - Handles requests and responses by calling appropriate functions or controllers.
// - May include specific middleware for individual routes (e.g., authentication).

const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the database connection
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs
// Home page - could include a form to create a new paste
router.get('/', (req, res) => {
    res.render('home', { title: 'EasyBin', pasteContent: '' }); // Provide a default empty value for pasteContent
  });
  
  
// Create a new paste
router.post('/paste', (req, res) => {
    console.log("Request body:", req.body); // Log entire request body
    const content = req.body.content; // Get the content from the request
    console.log("Extracted content:", content); // Log extracted content
    const id = uuidv4(); // Generate a unique ID
    const created_at = new Date().toISOString(); // Get the current datetime
  
    // Insert the paste into the database
    db.run('INSERT INTO pastes (id, content, created_at) VALUES (?, ?, ?)', [id, content, created_at], (err) => {
      if (err) {
        res.status(500).send('Error creating paste');
        return;
      }
      const pasteUrl = `/paste/${id}`; // Construct the URL
      res.json({ url: pasteUrl }); // Return the URL as JSON
    });
});
// View a specific paste by ID
router.get('/paste/:id', (req, res) => {
    const pasteId = req.params.id;
    console.log("Paste ID:", pasteId);
    // Retrieve the paste with the given ID from the SQLite database
    db.get('SELECT content FROM pastes WHERE id = ?', [pasteId], (err, row) => {
      if (err) {
        console.log("SQL Error:", err);
        res.status(500).send('Error retrieving paste');
        return;
      }
      console.log("Retrieved row:", row);
      if (!row) {
        res.status(404).send('Paste not found');
        return;
      }
      console.log(row.content);
      // Render the home.ejs template with the retrieved content
      res.render('home', { title: 'EasyBin', pasteContent: row.content });
    });
  });
  
  

// Create a New Paste (POST)
router.post('/api/paste', (req, res) => {
    const content = req.body.content;
    const id = uuidv4();
    const created_at = new Date().toISOString();
  
    db.run('INSERT INTO pastes (id, content, created_at) VALUES (?, ?, ?)', [id, content, created_at], (err) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
      const pasteUrl = `/paste/${id}`;
      res.json({ url: pasteUrl });
    });
  });
  
  // Retrieve a Specific Paste by ID (GET)
  router.get('/api/paste/:id', (req, res) => {
    const pasteId = req.params.id;
  
    db.get('SELECT content FROM pastes WHERE id = ?', [pasteId], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
      if (!row) {
        res.status(404).json({ error: 'Paste not found' });
        return;
      }
  
      res.json({ content: row.content });
    });
  });
  
  // Retrieve All Pastes (GET)
  router.get('/api/pastes', (req, res) => {
    db.all('SELECT id, content, created_at FROM pastes', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(rows);
    });
  });
module.exports = router;
