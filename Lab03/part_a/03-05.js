http = require('http');
fs = require('fs');
url = require('url');

let factorial = (k) => {
    return k <= 1 ? k : k * factorial(k - 1);
};


http.createServer((request, response) => {
    let path = url.parse(request.url).pathname;
    if(path === '/fact') {
        let param = url.parse(request.url, true).query.k;
        if (typeof param !== 'undefined') {
            let k = parseInt(param, 10);
            if (Number.isInteger(k)) {
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                setImmediate(() => response.end(JSON.stringify({k: k, fact: factorial(k)})));
            }
        }
    }
    else if (path === '/'){
        let html = fs.readFileSync('./03-03.html', 'utf-8');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html);
    }
}).listen(5002);

console.log('Server running at http://localhost:5002/');