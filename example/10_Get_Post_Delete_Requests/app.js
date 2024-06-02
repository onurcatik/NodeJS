const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

let blogs = [
  { id: 1, title: 'First Blog', snippet: 'This is the first blog', body: 'Content of the first blog' },
  { id: 2, title: 'Second Blog', snippet: 'This is the second blog', body: 'Content of the second blog' },
];

// Route to get all blogs
app.get('/blogs', (req, res) => {
  res.render('index', { blogs });
});

// Route to create a new blog (form)
app.get('/blogs/create', (req, res) => {
  res.render('create');
});

// Route to handle form submission
app.post('/blogs', (req, res) => {
  const newBlog = {
    id: blogs.length + 1,
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  };
  blogs.push(newBlog);
  res.redirect('/blogs');
});

// Route to get a single blog by ID
app.get('/blogs/:id', (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  if (blog) {
    res.render('details', { blog });
  } else {
    res.status(404).send('Blog not found');
  }
});

// Route to handle delete request
app.delete('/blogs/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  blogs = blogs.filter(b => b.id !== blogId);
  res.json({ redirect: '/blogs' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
