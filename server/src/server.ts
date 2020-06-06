import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes'; // mesma pasta do server usa "./"
import { errors } from 'celebrate';

const app = express();

app.use(cors()); // qual o dominio vai poder acessar ( o front-end )

app.use(express.json());

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333);
