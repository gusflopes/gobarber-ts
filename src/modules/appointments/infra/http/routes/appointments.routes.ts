import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import checkJwt from '@shared/infra/http/middlewares/checkJwt';

const appointmentsRouter = Router();

appointmentsRouter.use(checkJwt);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

// appointmentsRouter.get('/:id', async (request, response) => {
//   const { id } = request.params;
//   const appointment = await appointmentsRepository.findOne(id);
//   if (!appointment) {
//     return response
//       .status(404)
//       .json({ message: 'Não foi localizado o agendamento.' });
//   }
//   return response.json(appointment);
// });

export default appointmentsRouter;
