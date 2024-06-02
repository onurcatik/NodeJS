const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Handle GET request
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Hello, World!</h1>');
        } else if (req.url === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>About Page</h1>');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Page Not Found</h1>');
        }
    } else if (req.method === 'POST') {
        // Handle POST request
        if (req.url === '/data') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                console.log('Received POST data:', body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Data received', data: body }));
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Page Not Found</h1>');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.end('<h1>Method Not Allowed</h1>');
    }
});

// Listen on port 3000
const PORT = 3000;
server.listen(PORT, 'localhost', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});