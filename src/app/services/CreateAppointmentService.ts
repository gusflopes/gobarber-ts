import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * SOLID
 * Dependency Inversion: evitar que vários repositórios sejam instanciados
 */

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // public run() { // alternativa

  public async execute({ provider_id, date }: Request): Promise<any> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('Já existe um agendamento para este horário.');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
