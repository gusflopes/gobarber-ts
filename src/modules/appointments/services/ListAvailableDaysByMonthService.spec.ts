// import AppError from '@shared/errors/AppError';

// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
// import ListProvidersService from './ListProvidersService';
import ListAvailableDays from './ListAvailableDaysByMonthService';

describe('ListAvailableDays', () => {
  // let fakeUsersRepository: FakeUsersRepository;
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let listAvailableDays: ListAvailableDays;

  beforeEach(() => {
    // fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listAvailableDays = new ListAvailableDays(fakeAppointmentsRepository);
  });

  it('should be able to list the available days for specific provider and month', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 3, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 3, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 3, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 3, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 3, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 3, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 3, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 3, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 3, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 3, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 5, 8, 8, 0, 0),
    });

    const available = await listAvailableDays.execute({
      provider_id: 'provider',
      year: 2020,
      month: 6,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { day: 3, available: false },
        { day: 4, available: true },
        { day: 8, available: true },
        { day: 9, available: true },
      ]),
    );
  });
});
