const fs = require('fs');
const WebSocket = require('ws');

const wsc = new WebSocket('ws://localhost:4000');

let count = 0;

wsc.on('open', () => {
    const duplex = WebSocket.createWebSocketStream(wsc, {encoding:'utf-8'});
    let wfile = fs.createWriteStream(`./MyFile${++count}.txt`);
    duplex.pipe(wfile);
    console.log('File was downloaded successfully');
});
wsc.on('error', err => {
    console.error(err.message);
});