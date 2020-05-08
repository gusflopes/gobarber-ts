import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import checkJwt from '@shared/infra/http/middlewares/checkJwt';

const Routes = Router();

Routes.use(checkJwt);

Routes.post('/', async (request: Request, response: Response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

Routes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);

  console.log(request.user);

  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

Routes.get('/:id', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const { id } = request.params;
  const appointment = await appointmentsRepository.findOne(id);
  if (!appointment) {
    return response
      .status(404)
      .json({ message: 'Não foi localizado o agendamento.' });
  }
  return response.json(appointment);
});

export default Routes;
