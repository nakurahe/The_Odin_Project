const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    let path = '';
    switch (req.url) {
        case '/index.html':
            path = 'index.html';
            res.statusCode = 200;
            break;
        case '/about.html':
            path = 'about.html';
            res.statusCode = 200;
            break;
        case '/contact-me.html':
            path = 'contact-me.html';
            res.statusCode = 200;
            break;
        default:
            path = '404.html';
            res.statusCode = 404;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on port 3000');
});