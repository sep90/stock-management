const { faker } = require('@faker-js/faker');

module.exports = () => {
    const data = { products: [] }

    for (let i = 0; i < 1000; i++) {
        let id = "test_sku_" + i.toString();
        let qty = faker.datatype.number({min: -1000, max: 9999});
        let inStock = true;

        if (qty <= 0) {
            inStock = false;
        }

        data.products.push({
            "id": id,
            "in_stock" : inStock,
            "qty": qty,
        });
    }

    return data;
}