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

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  test('1+2 = 3', () => {
    expect(1 + 2).toBe(3);
  });

  it('should be able create a new appointment', async () => {
    const fakeRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeRepository,
    );
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '15154',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('15154');
  });

  // it('should not be able create two appointments at the same time', () => {
  //   // const createAppointmentService = new CreateAppointmentService()
  // });

  // it('should be able create a new appointment', () => {
  //   // const createAppointmentService = new CreateAppointmentService()
  // });
});
