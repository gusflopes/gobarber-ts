import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IFindMonthlyAppointmentsDTO from '@modules/appointments/dtos/IFindMonthlyAppointmentsDTO';
import IFindDailyAppointmentsDTO from '@modules/appointments/dtos/IFindDailyAppointmentsDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }
class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findMonthlyAppointments({
    provider_id,
    month,
    year,
  }: IFindMonthlyAppointmentsDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findDailyAppointments({
    provider_id,
    day,
    month,
    year,
  }: IFindDailyAppointmentsDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    client_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, client_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
