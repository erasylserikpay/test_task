import express from 'express';
import Products from "../models/products.js";

const router = express.Router();


router.get('/products', async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


router.get('/products/filter', async (req, res) => {
    try {
        const { name, plu } = req.query;

        let products = await Products.findAll();

        if (name) {
            products = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (plu) {
            products = products.filter(product => product.plu === plu);
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


router.post('/products/create', async (req, res) => {
    try {
        await Products.create(req.body);
        res.status(200).json("Product was created successfully!");
    } catch (err) {
        res.status(500).json(err.message);
    }
});

export default router;