const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')

const { formatPrice } = require('../../lib/utils')

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

        //criando um array em filePromise com a função map que retornará cada file criado
        const filesPromise = req.files.map(file => File.create({...file, product_id: productId}))
        await Promise.all(filesPromise)

        return res.redirect(`/products/${productId}/edit`)

    },
    async edit (req, res) {
        
        let results = await Product.find(req.params.id)
        const product = results.rows[0]

        if (!product) return res.send("Product not found")

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        results = await Category.all()
        const categories = results.rows

        results = await Product.files(product.id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        })) 

        console.log(req)

        return res.render("products/edit", { categories, product, files })
        
    },
    async put (req, res) {
        if (req.files.length != 0) {
            const newFilesPromise = req.files.map(file =>
                File.create({...file, product_id: req.body.id}))

            await Promise.all(newFilesPromise)
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(id => File.delete(id))
            await Promise.all(removedFilesPromise)
        }

        req.body.price = req.body.price.replace(/\D/g, "")
        
        if (req.body.old_price != req.body.price) {
            const oldProduct = await Product.find(req.body.id)
            req.body.old_price = oldProduct.rows[0].price
        }

        await Product.update(req.body)

        return res.redirect("/")

    },
    async delete (req, res) {
        await Product.delete(req.body.id)

        return res.redirect("/")
    }
}