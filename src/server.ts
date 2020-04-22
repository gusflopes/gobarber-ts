import 'reflect-metadata';
import './database';
import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

const port = 3333;
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}!`);
});
