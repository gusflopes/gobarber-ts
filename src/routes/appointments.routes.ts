import { Router, Request, Response } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../app/repositories/AppointmentsRepository';

const Routes = Router();
const appointmentsRepository = new AppointmentRepository();

// const appointments: Appointment[] = [];

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
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'Já existe um agendamento para este horário.' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default Routes;
