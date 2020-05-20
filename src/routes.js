const express = require('express')
const productsController = require('./app/controllers/productController')

const routes = express.Router()

routes.get("/", function (req, res) {
    return res.render("layout")
})

routes.get('/ads/create', function (req, res) {
    return res.redirect("/products/create")
})

routes.get("/products/create", productsController.create)
routes.get("/products/:id/edit", productsController.edit)
routes.post("/products", productsController.post)
routes.put("/products", productsController.put)
routes.delete("/products", productsController.delete)

module.exports = routes