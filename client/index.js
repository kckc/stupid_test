const http = require('http');

const HOSTNAME = process.env.HOSTNAME;
const INTERVAL = process.env.INTERVAL;
let i = 0;

setInterval(go, INTERVAL);

function go() {
    const id = i++;
    console.log('request sent: ' + id);

    const ts = Date.now();
    const req = http.get(HOSTNAME, res => {
        const duration = Date.now() - ts;
        console.log(id + ': res back to client took ' + duration / 1000 + ' seconds');
    });
    req.on('error', err => {
        console.log(err);
        process.exit(1);
    })
}
