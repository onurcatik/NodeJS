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
