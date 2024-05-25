import express from "express";
import KPI from "../modals/KPI.js";

const router = express.Router();

router.get("/kpis/", async (req, res) => {
    try {
        console.log('HERE1')
        const kpis = await KPI.find();
        res.status(200).json(kpis);
        console.log('kpis', kpis)
        
    } catch (error) {
        console.log('HERE2')
        res.status(404).json({ message: error.message });
    }
});

export default router;