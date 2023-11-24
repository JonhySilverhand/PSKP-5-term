http = require('http');
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
                response.end(JSON.stringify({k: k, fact: factorial(k)}))
            }
        }
    }
    else{
        response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        response.end('<h2>Not found</h2>');
    }
}).listen(5000);

console.log('Server running at http://localhost:5000/');