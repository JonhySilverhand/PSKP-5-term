var http = require('http');

http.createServer(function (request, response){
    if(request.url === '/api/name' && request.method === 'GET'){
        response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        response.end('Смирнов Владислав Юрьевич');
    }
    else{
        response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        response.end('<h2>Not found</h2>');
    }
}).listen(3000);

console.log('Server running at http://localhost:3000/');