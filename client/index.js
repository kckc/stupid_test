const http = require('http');

const HOSTNAME = process.env.HOSTNAME;
const INTERVAL = process.env.INTERVAL;
const DELAY_START = process.env.DELAY_START || 0;
let i = 0;

setTimeout(() => setInterval(go, INTERVAL), DELAY_START);

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
        if (err.code === 'ENOTFOUND' || err.code === "ECONNREFUSED") {
            process.exit(1)
        }
    })
}
