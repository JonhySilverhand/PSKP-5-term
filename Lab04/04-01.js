let http = require('http');
let url = require('url');
let fs = require('fs');
let db_module = require('./db_module');

let db = new db_module.DB();

db.on('GET', (req, res) => {
    console.log('DB_GET');
    db.select().then((results) => {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(results));
    });
});

db.on('POST', (req, res) => {
    console.log('DB_POST');
    req.on('data', (data) => {
        let r = JSON.parse(data);
        console.log(r);

        if (r.id === '' || r.name === '' || r.bday === '') {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({error: 'Error: "Поля не могут быть пустыми"'}));
            return;
        }
        const dateInput = new Date(r.bday);
        const currentDate = new Date();

        if (dateInput <= currentDate) {
            db.insert(r).then(data => {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify(data));
            }).catch((err) => {
                     res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
                     res.end(JSON.stringify(err));
            });
        } else {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({ error: 'Введенная дата должна быть меньше текущей даты.' }));
        }

    });
});

db.on('PUT', (req, res) => {
   console.log('DB_PUT');
    req.on('data', (data) => {
        let r = JSON.parse(data);

        if (r.id === '' || r.name === '' || r.bday === '') {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({error: 'Error: "Поля не могут быть пустыми"'}));
            return;
        }

        const dateUpdate = new Date(r.bday);
        const currentDate = new Date();

        if (dateUpdate <= currentDate) {
            db.update(r).then(data => {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify(data));
            }).catch((err) => {
                res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify(err));
            });
        } else {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({ error: 'Введенная дата должна быть меньше текущей даты.' }));
        }
    });
});

db.on('DELETE', (req, res) => {
    console.log('DB_DELETE');
    req.on('data', (data) => {
        let r = JSON.parse(data);

        if (r.id === '' || r.name === '' || r.bday === '') {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify({error: 'Error: "Поля не могут быть пустыми"'}));
            return;
        }

        db.delete(r.id).then(data => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        }).catch((err) => {
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(err));
        });
    });
});

http.createServer((req, res) => {
    if(url.parse(req.url).pathname === '/'){
        let html = fs.readFileSync("./04-01.html", 'utf8');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(html);
    } else if(url.parse(req.url).pathname === "/api/db"){
        db.emit(req.method, req, res);
    }
}).listen(5000)

console.log('Server is running at http://localhost:5000');