import { Router, Request, Response } from 'express';
import { uuid } from 'uuidv4';

const Routes = Router();

const appointments = [];

Routes.post('/', (request: Request, response: Response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default Routes;
