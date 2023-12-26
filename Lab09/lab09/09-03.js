const fs = require('fs');
const WebSocket = require('ws');

const wss = new WebSocket.WebSocketServer({ port: 4000, host: 'localhost' });
let n = 0;
wss.on('connection', ws => {
    setInterval(() => {
       wss.clients.forEach((client) => {
           if(client.readyState === ws.OPEN)
                client.send(`09-03-server: ${++n}`);
       });
    }, 15000);
    setInterval(() => {
        console.log(`\nAvailable: ${wss.clients.size} client(s)`);
        ws.ping(`Server ping: ${wss.clients.size} clients(s)`);
    }, 5000);
    ws.on('pong', data => {
        console.log(`on pong: ${data.toString()}`);
    });

    ws.on('message', data => {
        console.log('on message: ', data.toString());
        ws.send(data);
    })
});

wss.on('error', error => {
    console.error(error.message);
});