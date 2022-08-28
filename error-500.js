const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = 3002

server.use(middlewares)

server.get('/500-error', (req, res) => {
    console.log('/500-error, error 500')
    res.status(500).jsonp({
        error: "Internal Server Error"
    })
})

server.use(router)

server.listen(port, () => {
    console.log('JSON Server is running on http://localhost:' + port)
})