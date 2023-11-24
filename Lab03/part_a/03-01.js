var http = require('http');

let currentState = "norm";

http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<h2>${currentState}</h2>`);
}).listen(5000);

console.log('Server running at http://localhost:5000');

process.stdin.setEncoding('utf-8');
process.stdout.write(currentState + "->");
process.stdin.on('readable', () => {
    let inp = null;
    while((inp = process.stdin.read()) !== null){
       switch (inp.trim().toLowerCase()){
           case "norm":
           case "stop":
           case "test":
           case "idle":
               process.stdout.write("reg = " + currentState + " -->" + inp);
               currentState = inp.trim().toLowerCase();
               break;
           case "exit":
               process.exit(0);
               break;
           default:
               process.stdout.write(inp);
       }
       process.stdout.write(currentState + "->");
    }
});