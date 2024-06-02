# Example

```
my-node-server/
├── views/
│   ├── index.html
│   ├── about.html
│   ├── 404.html
├── server.js
```

## Step-by-Step Guide

1. **Create the Project Directory**

   Create a directory for your project:

   ```bash
   mkdir my-node-server
   cd my-node-server
   ```

2. **Create HTML Files**

   Inside the `views` directory, create the following HTML files:

   - `index.html`:

     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Home</title>
     </head>
     <body>
         <h1>Welcome to the Home Page</h1>
         <p>This is the home page of our Node.js server.</p>
     </body>
     </html>
     ```

   - `about.html`:

     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>About</title>
     </head>
     <body>
         <h1>About Us</h1>
         <p>This is the about page of our Node.js server.</p>
     </body>
     </html>
     ```

   - `404.html`:

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
         <p>Oops! The page you are looking for does not exist.</p>
     </body>
     </html>
     ```

3. **Create the Server Script**

   Create a file named `server.js` in the root directory and add the following code:

   ```javascript
   const http = require('http');
   const fs = require('fs');
   const path = require('path');

   const server = http.createServer((req, res) => {
       res.setHeader('Content-Type', 'text/html');

       let filePath = './views/';
       let statusCode = 200;

       switch (req.url) {
           case '/':
               filePath += 'index.html';
               break;
           case '/about':
               filePath += 'about.html';
               break;
           case '/about-me':
               statusCode = 301;
               res.setHeader('Location', '/about');
               res.end();
               return;
           default:
               filePath += '404.html';
               statusCode = 404;
               break;
       }

       fs.readFile(path.resolve(filePath), (err, data) => {
           if (err) {
               console.error(err);
               res.statusCode = 500;
               res.end('Internal Server Error');
           } else {
               res.statusCode = statusCode;
               res.end(data);
           }
       });
   });

   const PORT = 3000;
   const HOSTNAME = 'localhost';

   server.listen(PORT, HOSTNAME, () => {
       console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
   });
   ```

4. **Run the Server**

   In the terminal, run the server using Node.js:

   ```bash
   node server.js
   ```

5. **Test the Server**

   - Open your browser and navigate to `http://localhost:3000/` to see the home page.
   - Navigate to `http://localhost:3000/about` to see the about page.
   - Navigate to `http://localhost:3000/about-me` to see the redirect in action.
   - Navigate to any non-existent route, such as `http://localhost:3000/nonexistent`, to see the 404 page.

## Explanation

- **Server Creation**: The server is created using `http.createServer()`. The callback function handles incoming requests.
- **Routing Logic**: A `switch` statement is used to handle different routes. The appropriate HTML file path is set based on the requested URL.
- **Reading and Sending Files**: The `fs.readFile` method reads the HTML files. If an error occurs, a 500 status code and error message are sent. Otherwise, the content of the HTML file is sent with the appropriate status code.
- **Redirects**: A special case for `/about-me` is handled by setting a 301 status code and the `Location` header to redirect the request to `/about`.

This example illustrates how to handle basic routing, serve HTML files, and manage redirects in a Node.js server.