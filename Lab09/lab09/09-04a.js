const WebSocket = require('ws');
let parm = process.argv[2];
let clientName = typeof parm == 'undefined' ? 'defaultName' : parm;

const wsc = new WebSocket('ws://localhost:4000/');

wsc.on('open', ()=> {
    wsc.on('message', (mess) => {
        console.log('\nmessage: ', mess.toString());
    });

    setInterval(() => {
        wsc.send(JSON.stringify({
            client: clientName,
            timestamp: new Date().toISOString()
            }, null, 2))
    }, 2000);

});

wsc.on('error', err => {console.error(err.message);});