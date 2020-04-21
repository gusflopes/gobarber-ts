import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../app/repositories/AppointmentsRepository';
import CreateAppointmentService from '../app/services/CreateAppointmentService';

const Routes = Router();
const appointmentsRepository = new AppointmentRepository();

Routes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

Routes.get('/:id', (request, response) => {
  const { id } = request.params;
  const appointment = appointmentsRepository.findById(id);
  if (!appointment) {
    return response
      .status(404)
      .json({ message: 'Não foi localizado o agendamento.' });
  }
  return response.json(appointment);
});

Routes.post('/', (request: Request, response: Response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default Routes;
