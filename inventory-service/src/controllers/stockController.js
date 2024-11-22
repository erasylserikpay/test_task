import express from 'express';
import Stocks from '../models/stocks.js';
import Products from "../models/products.js";
import axios from 'axios'

const router = express.Router();


router.get('/stocks', async (req, res) => {
    try {
        const {plu, shop_id, shelf_quantity_from, shelf_quantity_to, order_quantity_from, order_quantity_to } = req.query;


        let stocks = await Stocks.findAll();
        let products = await Products.findAll();


        if(plu){
            const productId = (products.find(product => product.plu === plu)).id;
            stocks = stocks.filter(stock => stock.product_id === productId);
        }
        if (shop_id) {
            stocks = stocks.filter(stock => stock.shop_id === shop_id);
        }
        if (shelf_quantity_from) {
            stocks = stocks.filter(stock => stock.quantity_on_shelf >= Number(shelf_quantity_from));
        }
        if (shelf_quantity_to) {
            stocks = stocks.filter(stock => stock.quantity_on_shelf <= Number(shelf_quantity_to));
        }
        if (order_quantity_from) {
            stocks = stocks.filter(stock => stock.quantity_in_order >= Number(order_quantity_from));
        }
        if (order_quantity_to) {
            stocks = stocks.filter(stock => stock.quantity_in_order <= Number(order_quantity_to));
        }

        res.status(200).json(stocks);
    } catch (err) {
        res.status(500).json(err.message);
    }
}); //


router.post('/stocks/create', async (req, res) => {
    try {
        const stock = await Stocks.create(req.body);
        res.status(200).json("Stock was created successfully!");
    } catch (err) {
        res.status(500).json(err.message);
    }
});


router.patch('/stocks/decreaseQuantity', async (req, res) => {
    try {
        const stock = await Stocks.findByPk(req.body.id);
        const oldQuantityOnShelf=stock.quantity_on_shelf;
        const oldQuantityInOrder=stock.quantity_in_order;
        if (!stock) return res.status(404).json('Stock not found!');

        if (stock.quantity_on_shelf < req.body.newQuantity)
            return res.status(404).json('Current quantity is less than yours');

        stock.quantity_on_shelf = req.body.newQuantity;
        await stock.save();
         await axios.post('http://localhost:3001/api/history/create',{
            stock_id:stock.id,
            new_quantity_on_shelf:stock.quantity_on_shelf,
            new_quantity_in_order:stock.quantity_in_order,
            old_quantity_on_shelf:oldQuantityOnShelf,
            old_quantity_in_order:oldQuantityInOrder,
             updated_at:Date.now()
        })
        res.status(200).json("Stock quantity was edited successfully!");
    } catch (err) {
        res.status(500).json(err.message);
    }
});


router.patch('/stocks/increaseQuantity', async (req, res) => {
    try {
        const stock = await Stocks.findByPk(req.body.id);
        const oldQuantityOnShelf = stock.quantity_on_shelf;
        const oldQuantityInOrder = stock.quantity_in_order;

        if (!stock) return res.status(404).json('Stock not found!');


        if (stock.quantity_on_shelf > req.body.newQuantity) {
            return res.status(400).json('Current quantity is less than the new quantity');
        }

        stock.quantity_on_shelf = req.body.newQuantity;
        await stock.save();


        await axios.post('http://localhost:3001/api/history/create', {
            stock_id: stock.id,
            new_quantity_on_shelf: stock.quantity_on_shelf,
            new_quantity_in_order: stock.quantity_in_order,
            old_quantity_on_shelf: oldQuantityOnShelf,
            old_quantity_in_order: oldQuantityInOrder,
            updated_at:Date.now()
        });

        res.status(200).json("Stock quantity was edited successfully!");
    } catch (err) {
        res.status(500).json(err.message);
    }
});

export default router;