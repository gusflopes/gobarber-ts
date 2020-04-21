import { Router } from 'express';
import AppointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', AppointmentsRouter);

routes.post('/users', (request, response) => {
  const { name, email } = request.body;
  const user = { name, email };

  return response.json(user);
});

routes.get('/', (request, response) =>
  response.json({ message: 'Hello World' }),
);

export default routes;
