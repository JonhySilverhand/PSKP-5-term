const rpcWSC = require('rpc-websockets').Client;

const ws = new rpcWSC('ws://localhost:4000');

ws.on('open', () => {
    ws.login({ login: 'Vlad', password: 'VladPass' })
        .then(async () => await calculate()).then(() => ws.close());
});

async function calculate() {
    console.log('\nsum(square(3), square(5,4), mul(3,5,7,9,11,13))' +
        ' + fib(7)' +
        ' * mul(2,4,6) = ' +
        (await ws.call('sum',
                [
                    await ws.call('square', [3]),
                    await ws.call('square', [5, 4]),
                    await ws.call('mul', [3, 5, 7, 9, 11, 13])
                ])
            + (await ws.call('fib', [7])).slice(-1)
            * await ws.call('mul', [2, 4, 6]))
    );
}