const http = require('http');
const app = require('express')();

const EXTERNAL_HOST_NAME = process.env.EXTERNAL_HOST_NAME;
const PORT = process.env.PORT || 3000;

app.get('/health', (_, res) => res.end("ok"));
app.get('/*', (req, res) => {
    extReq = http.get(EXTERNAL_HOST_NAME, extRes => {
        res.end("done");
    })
    extReq.on('error', err => {
        console.log(err)
        res.status(500);
        res.end();
    });
});

app.listen(PORT, () => console.log('server started'));