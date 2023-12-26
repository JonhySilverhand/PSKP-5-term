const fs = require('fs');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000, host: 'localhost' });

let c = 0;

wss.on('connection', ws => {
   const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf8' });
   let wfile = fs.createWriteStream(`./upload/File${++c}.txt`);
   duplex.pipe(wfile);
   console.log('File was uploaded.')
});

wss.on('error', error => {
   console.error(error.message);
});