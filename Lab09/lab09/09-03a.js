const WebSocket = require('ws');


setTimeout(() => {
    const wsc = new WebSocket('ws://localhost:4000');

    wsc.on('message', msg => {
        console.log('on message: ', msg.toString());
    })

    wsc.on('pong', data => {
        console.log('on pong: ', data.toString());
    });

    setInterval(() => {
        console.log('\nClient Ping');
        wsc.ping('Client Ping');
    }, 5000);
}, 500);