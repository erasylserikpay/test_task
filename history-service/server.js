import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routesHistory from './src/controllers/HistoryController.js';


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routesHistory);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});