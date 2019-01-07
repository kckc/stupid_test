const axios = require('axios').default;
const circularJson = require('circular-json');
const app = require('express')();

const EXTERNAL_HOST_NAME = process.env.EXTERNAL_HOST_NAME;
const PORT = process.env.PORT || 3000;

const timeout = parseInt(process.env.EXT_TIMEOUT, 10) || 3100;

app.get('/health', (_, res) => res.end("ok"));
app.get('/*', (req, res) => {
    return axios.get(EXTERNAL_HOST_NAME, {timeout}).then(extRes => {
        res.end("done");
    }).catch(err => {
        const out = (({code, status, data}) => ({code, status, data}))(err);
        console.log(out);

        res.status(500);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(out));
    })
});

app.listen(PORT, () => console.log('server started'));