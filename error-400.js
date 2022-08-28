const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = 3002

server.use(middlewares)

server.get('/400-error', (req, res) => {
    console.log('/400-error, error 400')
    res.status(400).jsonp({
        error: "Bad Request Error"
    })
})

server.use(router)

server.listen(port, () => {
    console.log('JSON Server is running on http://localhost:' + port)
})