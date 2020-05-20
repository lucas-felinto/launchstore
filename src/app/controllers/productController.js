const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {
    create (req, res) {

        Category.all()
        .then(function (results) {
            
            const categories = results.rows

            return res.render("products/create", { categories })
        })
        .catch(function (err) {
            throw new Error(err)
        }) 

    },
    async post (req, res) {
        
        let results = await Product.create(req.body)
        const productId = results.rows[0].id

        results = await Category.all()
        const categories = results.rows

        return res.render("products/create", { categories, productId })
    }
}

