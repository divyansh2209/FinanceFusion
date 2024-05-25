import express from "express";
import Product from "../modals/Product.js";

const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        console.log('HERE1')
        const products = await Product.find();
        res.status(200).json(products);
        console.log('products ', products)
        
    } catch (error) {
        console.log('HERE2')
        res.status(404).json({ message: error.message });
    }
});

export default router;