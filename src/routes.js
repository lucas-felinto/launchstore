const express = require('express')

const routes = express.Router()

//site
routes.get("/", function (req, res) {
    return res.send("OK")
})

module.exports = routes