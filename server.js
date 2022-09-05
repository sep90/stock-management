const { faker } = require('@faker-js/faker');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = 3002

server.use(middlewares)

function generateProducts () {
    const products = [];

    for (let i = 0; i < 1000; i++) {
        let id = "test_sku_" + i.toString();
        let qty = faker.datatype.number({min: -1000, max: 9999});
        let inStock = true;

        if (qty <= 0) {
            inStock = false;
        }

        products.push({
            "id": id,
            "in_stock": inStock,
            "qty": qty,
        });
    }

    return products;
}

let products = generateProducts();
console.log("*** Generated Products *** \n")
console.log(products)

server.get('/stock-management/products', (req, res) => {
    let bool = faker.datatype.number({min: 0, max: 1});
    console.log("Bool > " + bool)

    if (bool) {
        res.status(200).jsonp(products)
    } else {
        let number = faker.datatype.number({min: 0, max: 9999});
        console.log("Number > " + number)
        var remainder = number % 2;

        if (remainder === 0) {
            res.status(400).jsonp({
                error: "Bad Request Error"
            })
        } else {
            res.status(500).jsonp({
                error: "Internal Server Error"
            })
        }
    }
})

server.get('/stock-management/products/:id', function (req, res) {
    console.log("Id GET Param > " + req.params.id)
    let bool = faker.datatype.number({min: 0, max: 1});
    console.log("Bool > " + bool)

    if (bool) {
        const productPicked = products.find(p => p.id === req.params.id);

        if (productPicked) {
            res.status(200).jsonp(productPicked)
        } else {
            res.status(404).jsonp({
                error: "Product Not Found"
            })
        }
    } else {
        let number = faker.datatype.number({min: 0, max: 9999});
        console.log("Number > " + number)
        var remainder = number % 2;

        if (remainder === 0) {
            res.status(400).jsonp({
                error: "Bad Request Error"
            })
        } else {
            res.status(500).jsonp({
                error: "Internal Server Error"
            })
        }
    }
})

server.use(router)

server.listen(port, () => {
    console.log('JSON Server is running on http://localhost:' + port)
})