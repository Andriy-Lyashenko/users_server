const Product = require('../models/product.model');


const createProduct = (req,res) => {
    //To do : create funct which allows push createdBy(user_id following token)
    const {name, price} = req.body;
    const product = new Product({
        name,
        price
    })
    product.save().then(()=> {
        res.status(200).json({
            message: 'Product has added succesfully'
        })
    }).catch(err=>{
        //To do: error status
        res.status(500).json({
            error: err
        })
    })
};

const getProducts = (req,res)=>{
    console.log(req.tokenData)
    Product.find().then(products=> {
        res.status(200).json(products)
    }).catch(error=> res.json({
        error: error
    }))
};

const deleteProduct = (req, res) =>{
    Product.findByIdAndRemove({_id: req.params.id}).then(()=>{
        res.json({
            message: 'Product has been deleted succesfully'
        })
    }).catch(error=> {
        res.status(500).json({
            error
        })
    })
}


module.exports = {
    createProduct,
    getProducts,
    deleteProduct
}