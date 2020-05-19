const express = require('express')
const productsController = require('./app/controllers/productController')

const routes = express.Router()

routes.get("/", function (req, res) {
    return res.render("layout")
})

routes.get("/products/create", productsController.create)

routes.get('/ads/create', function (req, res) {
    return res.redirect("/products/create")
})

module.exports = routes