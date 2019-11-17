// include dependencies
const express = require('express');
const proxy = require('http-proxy-middleware');
const http = require('http');
const axios = require('axios');

// mount `exampleProxy` in web server
const app = express();
const APPID = `5889a7f61de1b229de651a162a505404`;

var agent = new http.Agent({
    keepAlive: true,
    keepAliveMsecs: 10000
});

async function proxyReq (url, params) {
    let res;
    try{
        res = await axios.get(url, {
            agent: agent,
            params: { ...params, APPID: APPID}
        })
    } catch (e){
        console.error(e.code);
        res = {data: {error: true}};
    }
    return res.data;
}

app.use('/api/city/find', async (request, response) => {
    response.send(await proxyReq('http://api.openweathermap.org/data/2.5/find', request.query));
});

app.use('/api/city/group', async (request, response) => {
    response.send(await proxyReq('http://api.openweathermap.org/data/2.5/group', request.query));
});

app.use(proxy('/', {
    target: 'http://localhost:8080',
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    logLevel: 'debug'
}))


app.listen(3000);
