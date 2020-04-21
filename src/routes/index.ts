import { Router } from 'express';
import AppointmentsRouter from './appointments.routes';
import UsersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', AppointmentsRouter);
routes.use('/users', UsersRouter);

routes.get('/', (request, response) =>
  response.json({ message: 'Hello World' }),
);

export default routes;
