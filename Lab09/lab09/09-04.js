const WebSocket = require('ws');

const wss = new WebSocket.WebSocketServer({port: 4000, host: 'localhost'});
wss.on('connection', ws => {
   let count = 0;
   ws.on('message', msg => {
        console.log('\nMessage: ',msg.toString());
        let data = JSON.parse(msg);
        ws.send(JSON.stringify({
            server: ++count,
            client: data.client,
            timestamp: new Date().toISOString(),
        }, null, 2));
   });
});
wss.on('error', err => {console.error(err.message);});