// include dependencies
const express = require('express');
const proxy = require('http-proxy-middleware');
const http = require('http');
const querystring = require('querystring');
const axios = require('axios');

// mount `exampleProxy` in web server
const app = express();
const APPID = `5889a7f61de1b229de651a162a505404`;

var agent = new http.Agent({keepAlive: true, keepAliveMsecs: 10000});


function proxyReq2(url, client_req, client_res) {
    console.log('serve: ', client_req.url);
    console.log('client_req.url: ', client_req.url);
    var options = {
        hostname: 'api.openweathermap.org',
        port: 80,
        path: `${url}?${querystring.stringify({
            ...client_req.query,
            APPID
        })}`,
        method: client_req.method,
        headers: client_req.headers
    };

    var proxy = http.request(options, (res) => {
        client_res.writeHead(res.statusCode, res.headers)
        res.pipe(client_res, {end: true});
    });
    client_req.pipe(proxy, {end: true});
}

async function proxyReq(url, params) {
    let res;

    try {
        res = await axios.get(url, {
            agent: agent,
            params: {
                ... params,
                APPID: APPID
            }
        })
    } catch (e) {
        console.error(e.code);
        res = {
            data: {
                error: true
            }
        };
    }
    return res.data;
}

app.use('/api/city/find', async (request, response) => {
    proxyReq2('/data/2.5/find', request, response);
});

app.use('/api/city/group', async (request, response) => {
    proxyReq2('/data/2.5/group', request, response);
});

app.use('/api/city/forecast', async (request, response) => {
    proxyReq2('/data/2.5/forecast', request, response);
    // response.send(await proxyReq('http://api.openweathermap.org/data/2.5/forecast', request.query));
});

app.use(proxy('/city/*', {
    target: 'http://localhost:8080',
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    logLevel: 'debug',
    pathRewrite: function (path, req) {
        return ''
    }
}))

app.use(proxy('/', {
    target: 'http://localhost:8080',
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    logLevel: 'debug'
}))


app.listen(3000);
