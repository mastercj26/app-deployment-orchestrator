const express = require('express')
const httpProxy = require('http-proxy')

const app = express()
const PORT = 8000

const proxy = httpProxy.createProxy()
const BASE_PATH = 'https://project26-cj.s3.ap-south-1.amazonaws.com/__outputs'

app.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];
    
    const resolvesTo = `${BASE_PATH}/${subdomain}`
    
    return proxy.web(req, res, { 
      target: resolvesTo,
      changeOrigin: true,
      headers: {
        'Host': 'project26-cj.s3.ap-south-1.amazonaws.com'
      }
    })
})
proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if (url === '/')
        proxyReq.path += 'index.html'

})
app.listen(PORT, () => {
    console.log(`Reverse Proxy running on port ${PORT}`)
})