const Product = require('../models/Product');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();


//Create Router
router.post('/', verifyTokenAndAuthorization , async (req,res)=>{

    const newProduct = new Product(req.body);
  
    try {
         const savedProduct = await newProduct.save();
         res.status(200).json(savedProduct);
       
    } catch(err) {
        res.status(500).json(err);
    }

});

// Update Product
router.put('/:id', verifyTokenAndAdmin , async (req,res)=>{
      
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
        {
            $set:req.body,
        },
        {
            new : true 
        }
        );
     res.status(200).json(updatedProduct);
    try {

    } catch(err) {
        res.status(500).json(err);
    }

});

//DELETE Router
router.delete('/:id', verifyTokenAndAdmin , async (req,res)=>{

    try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json("Product Has been Deleted ...")
       
    } catch(err) {
        res.status(500).json(err);
    }
s
});

//Get Product Router
router.get('/find/:id', async (req,res)=>{

    try {
         const product =    await Product.findById(req.params.id);
            res.status(200).json(product);
       
    } catch(err) {
        res.status(500).json(err);
    }

});


//Get all Products Router
router.get('/', async (req,res)=>{

    const newQ = req.query.new;
    const categoryQ = req.query.category ;


    try {
        let products;
        if (newQ) {
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if (categoryQ) {
            products = await Product.find({categories : {

                $in : [categoryQ],
            },
        });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
       
    } catch(err) {
        res.status(500).json(err);
    }

});




module.exports = router 