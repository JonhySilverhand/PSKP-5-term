const fs = require('fs');
const WebSocket = require('ws');

const wsc = new WebSocket('ws://localhost:4000');

wsc.on('open', () => {
    const duplex = WebSocket.createWebSocketStream(wsc, {encoding:'utf-8'});
    let rfile = fs.createReadStream('./MyFile.txt');
    rfile.pipe(duplex);
});
wsc.on('error', err => {
    console.error(err.message);
});