const rpcWSC = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:4000');

let count = 0;
ws.on('open', () => {
    let data = '';

    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
        while ((data = process.stdin.read()) != null) {
            switch (data.trim().toUpperCase()) {
                case 'A':
                    ws.notify('A');
                    break;
                case 'B':
                    ws.notify('B');
                    break;
                case 'C':
                    ws.notify('C');
                    break;
                default:
                    console.error('Wrong notification type');
            }
        }
    });
});