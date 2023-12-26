const net = require('net');

let HOST = '127.0.0.1';
let PORT = 4000;

let client = new net.Socket();

client.connect(PORT, HOST, () => {
   console.log('Client CONNECTED: ', client.remoteAddress + ' ' + client.remotePort);
   client.write('Hello');
});

client.on('data', (data) => {
   console.log('Client DATA: ' + data.toString());
   client.destroy();
});

client.on('close', () => { console.log('Client DISCONNECTED'); });
client.on('error', (err) => { console.log('Client ERROR:'); });