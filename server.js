const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const path = require('path')
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'store.next-store-example.tech'
const port = 443
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const tls = {
  key: fs.readFileSync(path.join(__dirname, 'certs/store.local.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/store.local.crt'))
}

app.prepare().then(() => {
  createServer(tls, async(req, res) => {
    try {

      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)

    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, '0.0.0.0', (err) => {
    if (err) { throw err }
    console.log(`> Ready on https://${hostname}:${port}`)
  })
})