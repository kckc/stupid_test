const app = require('express')();

const DELAY = process.env.DELAY || 1000;
const PORT = process.env.PORT || 3000;

let i = DELAY;

app.get('/health', (_, res) => res.end("ok"));
app.get('/*', (req, res) => {
    setTimeout(() => res.end("done"), i++)
});

app.listen(PORT, () => console.log('external started'));