const axios = require('axios').default;
const circularJson = require('circular-json');
const app = require('express')();
const file = require('./file');

const EXTERNAL_HOST_NAME = process.env.EXTERNAL_HOST_NAME;
const PORT = process.env.PORT || 3000;

const timeout = process.env.EXT_TIMEOUT ? parseInt(process.env.EXT_TIMEOUT, 10) : 3100;
const READ_LARGE_FILE = process.env.READ_LARGE_FILE.toLowerCase() === 'true';

let reqCount = 0;

app.get('/health', (_, res) => res.end("ok"));
app.get('/*', (req, res) => {
    console.log(`req${reqCount++}`);
    const end =  axios.get(EXTERNAL_HOST_NAME, {timeout}).then(extRes => {
        res.end("done");
    }).catch(err => {
        const out = (({code, status, data}) => ({code, status, data}))(err);
        console.log(out);

        res.status(500);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(out));
    })

    if (READ_LARGE_FILE) {
        file.readLargeFile();
    }
    return end;
});

app.listen(PORT, () => console.log('server started'));