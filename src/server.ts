import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

// docker run --name gostack_gobarber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
