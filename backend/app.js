import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(bodyParser.json());

const initDb = require('./src/pg-db').initDb;
initDb();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require('./src/routes'));
app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
