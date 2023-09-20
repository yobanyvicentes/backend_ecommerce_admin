const mongoose = require("mongoose");
const Category = require('../models/Category.js');
const { validationResult } = require('express-validator');

const listAllCategory =  async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(500).send('ocurrió un error al listar las categorias');
    }
}

const createCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()})
        }
        const internalIdExist = await Category.findOne({internalId: req.body.internal_id});
        if (internalIdExist) {
            return res.status(400).json({
                msg: `ya existe la categoria con el id interno: ${req.body.internal_id}`
            })
        }
        const {internal_id, name} = req.body;
        const category = new Category;
        category.internalId = internal_id;
        category.name = name;
        category.createDate = new Date();
        category.updateDate = new Date();
        const categorySaved = await category.save();
        console.log(category)
        res.status(200).json(categorySaved);
    } catch (error) {
        console.log(error)
        res.status(500).send('ocurrió un error al crear la categoria');
    }
}

const getOneCategory = async (req, res) => {
    try {
        let isIdValid = mongoose.Types.ObjectId.isValid(req.params.categoryId);
        if (!isIdValid) {
            return res.status(400).send('la extensión o formato del id ingresado es invalido');
        };
        let category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(400).send('la categoria a consultar no existe');
        };
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(500).send('ocurrió un error al consultar la categoria');
    }
}

const deleteCategory = async (req, res) => {
    try {
        let isIdValid = mongoose.Types.ObjectId.isValid(req.params.categoryId);
        if (!isIdValid) {
            return res.status(400).send('la extensión o formato del id ingresado es invalido');
        };
        let category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(400).send('la categoria a eliminar no existe');
        };
        const deletedCategory = await Category.deleteOne({_id: req.params.categoryId})
        res.status(200).json({resume: deletedCategory, category: category});
    } catch (error) {
        console.log(error)
        res.status(500).send('ocurrió un error al borrar la categoria');
    }
}

const updateCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()})
        }
        let isIdValid = mongoose.Types.ObjectId.isValid(req.params.categoryId);
        if (!isIdValid) {
            return res.status(400).send('la extensión o formato del id ingresado es invalido');
        };
        let category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(400).send('la categoria a actualizar no existe');
        };
        const internalIdExist = await Category.findOne({internalId: req.body.internal_id, _id:{ $ne: category._id}});
        if(internalIdExist){
            return res.status(400).send('el id interno ingresado ya está asignado a otra categoria distinta a la que está intentando actualizar')
        }
        const {name, internal_id} = req.body;
        category.name = name;
        category.internalId = internal_id;
        category.updateDate = Date.now();

        category = await category.save()

        return res.status(200).json({message: "actualizado", category_saved: category});
    } catch (error) {
        res.status(500).send('ocurrió un error al actualizar la categoria');
        console.log(error);
    }
}

module.exports = {getOneCategory, createCategory, deleteCategory, listAllCategory, updateCategory}
