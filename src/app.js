// Main Application File
// - Initializes the web server (e.g., Express).
// - Sets up global configurations, middleware, and error handling.
// - Imports and uses the routes defined in routes.js.
// - Starts the server, listening on the specified port.


// Importing required modules
const express = require('express');
const path = require('path');

// Importing routes
const routes = require('./routes');

// Creating an Express application
const app = express();

// Setting up middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files from the 'public' directory (Optional)
app.use(express.static(path.join(__dirname, 'public')));

// Using the routes defined in 'routes.js'
app.use('/', routes);

// Handling 404 - Not Found
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Handling global errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Setting up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Assuming your templates are in a 'views' folder


// Port number to listen on
const PORT = process.env.PORT || 7755;

// IP address to bind to (0.0.0.0 binds to all available network interfaces)
const HOST = '0.0.0.0';

// Starting the server on the specified port and IP address
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

