const productsControllers = require('./products.controllers')

const getAllProducts = (req, res) => {
    productsControllers.findAllProducts()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: 'Bad request', err})
        })
}

const getProductById = (req, res) => {
    const id = Number(req.params.id)
    productsControllers.findProductById(id)
        .then(data => {
            if(!data){
                return res.status(404).json({message: `Product with id: ${id}, not found`})
            }
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad request', err})
        })
};

const postNewProduct = (req, res) => {
    const productObj = req.body
    productsControllers.createProduct(productObj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad request', err})
        })
};

const patchProducts = (req, res) => {

    const id = Number(req.params.id) 
    const productObj = req.body 

    productsControllers.updateProduct(id, productObj)
        .then(data => {
            if(!data) {
                return res.status(404).json({message: 'Invalid ID'})
            }
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad request', err})
        })
};

const deleteProduct = (req, res) => {
    const id = req.params.id 
    productsControllers.deleteProduct(id)
        .then(data => {
            if(!data) {
                return res.status(404).json({message: 'Invalid ID'})
            }
            res.status(204).json()
        })
        .catch(err => {
            res.status(400).json({message: 'Bad request', err})
        })
}

module.exports = {
    getAllProducts,
    getProductById,
    postNewProduct,
    patchProducts,
    deleteProduct
}