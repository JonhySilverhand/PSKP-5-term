var http = require('http');
var fs = require('fs');

http.createServer(function (request, response){
    if(request.url === '/png'){
        const fname = 'johnxina-intro.png';
        let png = null;

        fs.stat(fname, (err, stat) => {
            if(err){console.log('error', err);}
            else{
                png = fs.readFileSync(fname);
                response.writeHead(200, {'Content-Type': 'image/png', 'Content-Length':stat.size});
                response.end(png, 'binary');
            }
        })
    }
    else{
        response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        response.end('<h2>Not found</h2>');
    }
}).listen(3000);

console.log('Server running at http://localhost:3000/');