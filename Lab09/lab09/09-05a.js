const rpcWSC = require('rpc-websockets').Client;

const ws = new rpcWSC('ws://localhost:4000');

ws.on('open', () => {
   ws.call('square', [3]).then(res => { console.log(`\nsquare: ${res}`) });
   ws.call('square', [5, 4]).then(res => { console.log(`\nsquare: ${res}`) });
   ws.call('sum', [2]).then(res => { console.log(`sum[2] = ${res}`) });
   ws.call('sum', [2, 4, 6, 8, 10]).then(res => { console.log(`sum[2, 4, 6, 8, 10] = ${res}`) });
   ws.call('mul', [3]).then(res => { console.log(`mul[3] = ${res}`) });
   ws.call('mul', [3, 5, 7, 9, 11, 13]).then(res => { console.log(`mul[3, 5, 7, 9, 11, 13] = ${res}`) });

   ws.login({login: 'Vlad', password: 'VladPass'})
       .then((login) => {
            if(login) {
                ws.call('fib', [1]).catch(e => { console.log('fib: ', e) }).then(res => { console.log(`fib[1] = ${res}`) });
                ws.call('fib', [2]).catch(e => { console.log('fib: ', e) }).then(res => { console.log(`fib[2] = ${res}`) });
                ws.call('fib', [7]).catch(e => { console.log('fib: ', e) }).then(res => { console.log(`fib[7] = ${res}`) });
                ws.call('fact', [0]).catch(e => { console.log('fact: ', e) }).then(res => { console.log(`fact[0] = ${res}`) });
                ws.call('fact', [5]).catch(e => { console.log('fact: ', e) }).then(res => { console.log(`fact[5] = ${res}`) });
                ws.call('fact', [10]).catch(e => { console.log('fact: ', e) }).then(res => { console.log(`fact[10] = ${res}`) });
            } else{
                console.error('incorrect login or password, try again!');
            }
       })
       .then(() => ws.close());
});