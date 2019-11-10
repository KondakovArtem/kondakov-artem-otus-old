// include dependencies
const express = require('express');
const proxy = require('http-proxy-middleware');
 
// mount `exampleProxy` in web server
const app = express();
const APPID = `5889a7f61de1b229de651a162a505404`;


app.use(proxy('/api/city/find', {
  target: 'http://api.openweathermap.org/data/2.5/find',
  changeOrigin: true,
  ws: true, // proxy websockets
  logLevel: 'debug',
  selfHandleResponse: true,
  pathRewrite: {
    '^/api/city/find' : ''
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.pipe(res);
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.path+= `&APPID=${APPID}`;
  }
}));

app.use(proxy('/api/city/group', {
  target: 'http://api.openweathermap.org/data/2.5/group',
  changeOrigin: true,
  ws: true, // proxy websockets
  logLevel: 'debug',
  selfHandleResponse: true,
  pathRewrite: {
    '^/api/city/group' : ''
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.pipe(res);
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.path+= `&APPID=${APPID}`;
  }
}));

app.use(proxy('/',{
  target: 'http://localhost:8080',
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  logLevel: 'debug'
}))



app.listen(3000);