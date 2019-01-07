const app = require('express')();

const PORT = process.env.PORT || 3000;
const DELAY = parseInt(process.env.DELAY) || 1000;
const INCREMENT = parseInt(process.env.INCREMENT)|| 1;

let i = DELAY;

app.get('/health', (_, res) => res.end("ok"));
app.get('/*', (req, res) => {
    req.on('error', err => {
        console.log(err);
    })
    req.on('close', () => {
        console.log('connection closed');
    })
    setTimeout(() => res.end("done"), i += INCREMENT)
});

app.listen(PORT, () => console.log('external started'));