const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Third-party middleware for logging requests
app.use(morgan('dev'));

// Custom middleware for logging request details
app.use((req, res, next) => {
    console.log(`Request Details - Method: ${req.method}, URL: ${req.url}`);
    next();
});

// Additional custom middleware
app.use((req, res, next) => {
    console.log('First custom middleware executed');
    next();
});

app.use((req, res, next) => {
    console.log('Second custom middleware executed');
    next();
});

// Built-in middleware for serving static files
app.use(express.static('public'));

// Route handlers
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// 404 handler middleware
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
