import express, {Router} from 'express';
import History from '../models/History.js';

const router = express.Router();


router.post('/history/create', async (req, res) => {
    try {
        await History.create(req.body);
        res.status(200).json("History was created successfully!");
    } catch (err) {
        res.status(500).json(err.message);
    }
})

router.get('/history/all', async (req, res) => {
    const history = await History.findAll();
    res.status(200).json(history);
})
export default router;