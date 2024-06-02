const express = require('express');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    const blogs = [
        { title: 'First Blog', snippet: 'This is the first blog snippet.' },
        { title: 'Second Blog', snippet: 'This is the second blog snippet.' },
        { title: 'Third Blog', snippet: 'This is the third blog snippet.' }
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
