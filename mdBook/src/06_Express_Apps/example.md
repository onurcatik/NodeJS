# Examples: Express Apps

## Code

```javascript
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
```

## Detailed Explanation

1. **Import the Express Module**
   ```javascript
   const express = require('express');
   ```
   This line imports the Express module, which is required to create an Express application.

2. **Create an Instance of an Express Application**
   ```javascript
   const app = express();
   ```
   This line creates an instance of an Express application, which will be used to define routes and middleware.

3. **Define the Port Number**
   ```javascript
   const PORT = 3000;
   ```
   The server will listen on port 3000. You can change this to any available port number.

4. **Route for the Homepage**
   ```javascript
   app.get('/', (req, res) => {
     res.sendFile(__dirname + '/views/index.html');
   });
   ```
   This route handles GET requests to the root URL (`/`). It sends the `index.html` file located in the `views` folder.

5. **Route for the About Page**
   ```javascript
   app.get('/about', (req, res) => {
     res.sendFile(__dirname + '/views/about.html');
   });
   ```
   This route handles GET requests to the `/about` URL. It sends the `about.html` file located in the `views` folder.

6. **Route for Redirecting `/about-us` to `/about`**
   ```javascript
   app.get('/about-us', (req, res) => {
     res.redirect('/about');
   });
   ```
   This route handles GET requests to the `/about-us` URL. It redirects the request to the `/about` URL.

7. **Handle 404 Errors**
   ```javascript
   app.use((req, res) => {
     res.status(404).sendFile(__dirname + '/views/404.html');
   });
   ```
   This middleware handles all requests that do not match any defined routes. It sends the `404.html` file located in the `views` folder and sets the response status to 404.

8. **Start the Server**
   ```javascript
   app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```
   This line starts the server and listens for incoming requests on the defined port. It logs a message to the console when the server is running.

## Required HTML Files

Create the following HTML files in a folder named `views`:

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homepage</title>
</head>
<body>
  <h1>Homepage</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</body>
</html>
```

### `about.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About</title>
</head>
<body>
  <h1>About Page</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</body>
</html>
```

### `404.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 Not Found</title>
</head>
<body>
  <h1>404 - Page Not Found</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</body>
</html>
```

## Running the Application

1. Ensure you have installed Express by running:
   ```bash
   npm install express
   ```

2. Save the JavaScript code in a file named `app.js`.

3. Create the `views` folder and add the HTML files (`index.html`, `about.html`, and `404.html`).

4. Start the application by running:
   ```bash
   node app.js
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the homepage. Navigate to `http://localhost:3000/about` to see the about page. Test the redirect by navigating to `http://localhost:3000/about-us`. Finally, test the 404 page by navigating to a non-existent URL such as `http://localhost:3000/unknown`.

This example demonstrates the fundamental concepts of routing, redirection, and error handling in an Express application. By following this structure, you can build more complex and scalable web applications with ease.