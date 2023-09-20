const mongoose = require("mongoose");
const Product = require('../models/Product.js');
const { validationResult } = require('express-validator');

const listAllProduct =  async (req, res) => {
    try {
        const products = await Product.find().populate([
            {path:'brand', select: 'name'},
            {path:'seller', select: 'name description'},
            {path:'role', select: 'name'},
        ]);
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).send('ocurrió un error al listar las productos');
    }
}

const createProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()})
        }
        const internalIdExist = await Product.findOne({internalId: req.body.internal_id});
        if (internalIdExist) {
            return res.status(400).json({
                msg: `ya existe el producto con el id interno: ${req.body.internal_id}`
            })
        }
        const {internal_id, name, description, image, price, inventory, seller, brand, category} = req.body;
        const product = new Product;
        product.internalId = internal_id;
        product.name = name;
        product.description = description;
        product.image = image;
        product.price = price;
        product.inventory = inventory;
        product.seller = seller;
        product.brand = brand;
        product.category = category;
        product.createDate = new Date();
        product.updateDate = new Date();
        const productSaved = await product.save();
        console.log(product)
        res.status(200).json(productSaved);
    } catch (error) {
        console.log(error)
        res.status(500).send('ocurrió un error al crear el producto');
    }
}

const getOneProduct = async (req, res) => {
    try {
        let isIdValid = mongoose.Types.ObjectId.isValid(req.params.productId);
        if (!isIdValid) {
            return res.status(400).send('la extensión o formato del id ingresado es invalido');
        };
        let product = await Product.findById(req.params.productId).populate([
            {path:'brand', select: 'name'},
            {path:'seller', select: 'name description'},
            {path:'role', select: 'name'},
        ]);
        if (!product) {
            return res.status(400).send('el producto a consultar no existe');
        };
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).send('ocurrió un error al consultar el producto');
    }
}

const deleteProduct = async (req, res) => {
    try {
        let isIdValid = mongoose.Types.ObjectId.isValid(req.params.productId);
        if (!isIdValid) {
            return res.status(400).send('la extensión o formato del id ingresado es invalido');
        };
        let product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(400).send('el producto a eliminar no existe');
        };
        const deletedProduct = await Product.deleteOne({_id: req.params.productId})
        res.status(200).json({resume: deletedProduct, product: product});
    } catch (error) {
        console.log(error)
        res.status(500).send('ocurrió un error al borrar el producto');
    }
}

const updateProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()})
        }
        let isIdValid = mongoose.Types.ObjectId.isValid(req.params.productId);
        if (!isIdValid) {
            return res.status(400).send('la extensión o formato del id ingresado es invalido');
        };
        let product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(400).send('el producto a actualizar no existe');
        };
        const internalIdExist = await Product.findOne({internalId: req.body.internal_id, _id:{ $ne: product._id}});
        if(internalIdExist){
            return res.status(400).send('el id interno ingresado ya está asignado a otro producto distinto al que está intentando actualizar')
        }
        const {internal_id, name, description, image, price, inventory, seller, brand, category} = req.body;
        product.internalId = internal_id;
        product.name = name;
        product.description = description;
        product.image = image;
        product.price = price;
        product.inventory = inventory;
        product.seller = seller;
        product.brand = brand;
        product.category = category;
        product.updateDate = Date.now();

        product = await product.save()

        return res.status(200).json({message: "actualizado", product_saved: product});
    } catch (error) {
        res.status(500).send('ocurrió un error al actualizar el producto');
        console.log(error);
    }
}

module.exports = {getOneProduct, createProduct, deleteProduct, listAllProduct, updateProduct}
