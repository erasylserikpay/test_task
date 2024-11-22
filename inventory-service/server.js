import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routesStock from './src/controllers/stockController.js';
import routesProduct from './src/controllers/productController.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routesStock);
app.use('/api', routesProduct);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});