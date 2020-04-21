import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../app/repositories/AppointmentsRepository';
import CreateAppointmentService from '../app/services/CreateAppointmentService';

const Routes = Router();

Routes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);

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

Routes.post('/', async (request: Request, response: Response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default Routes;
