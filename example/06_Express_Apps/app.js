// Import the Express module
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port number
const PORT = 3000;

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Route for the about page
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

// Route for redirecting /about-us to /about
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
