// **RF**
// [] O usuário deve poder listar todos os prestadores de serviço cadastrados;
// [] O usuário deve poder listar os dias de um mês com pelo menos um com horário disponível de um prestador;
// [] O usuário deve poder listar os horáris disponíveis em um dia específico de um prestador;
// [] O usuário deve poder realizar um novo agendamento com um prestador;

// **RNF**

// [] A listagem de prestadores deve ser armazenada em cache;

// **RN**
// [] Cada agendamento deve durar 1h exatamente;
// [] Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h)
// [] O usuário não pode agendar em um horário já ocupado;
// [] O usuário não pode agendar em um horários que já passou;
// [] O usuário não pode agendar serviços consigo mesmo;

import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(fakeRepository);
  });

  it('should be able create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 16),
      provider_id: '54545',
      client_id: '15154',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('54545');
    expect(appointment.client_id).toBe('15154');
  });

  it('should not be able create two appointments at the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '54545',
      client_id: '15154',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '54545',
        client_id: '15154',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        client_id: '4444122',
        provider_id: '15154',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with himself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        client_id: '15154',
        provider_id: '15154',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8 a.m.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 9, 7).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 7),
        client_id: '15154',
        provider_id: '54545',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment after 5 p.m.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 9, 7).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 18),
        client_id: '15154',
        provider_id: '54545',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
