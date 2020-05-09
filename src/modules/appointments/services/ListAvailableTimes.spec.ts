// import AppError from '@shared/errors/AppError';

// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
// import ListProvidersService from './ListProvidersService';
import ListAvailableTimes from './ListAvailableTimes';

describe('ListAvailableDays', () => {
  // let fakeUsersRepository: FakeUsersRepository;
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let listAvailableTimes: ListAvailableTimes;

  beforeEach(() => {
    // fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listAvailableTimes = new ListAvailableTimes(fakeAppointmentsRepository);
  });

  it('should be able to list the available times for specific provider and day', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      client_id: 'client',
      date: new Date(2020, 5, 3, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      client_id: 'client',
      date: new Date(2020, 5, 3, 10, 0, 0),
    });

    const available = await listAvailableTimes.execute({
      provider_id: 'provider',
      day: 3,
      year: 2020,
      month: 6,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });

  it('should not list available times in the closest 2 hours from current time', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      client_id: 'client',
      date: new Date(2020, 5, 3, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      client_id: 'client',
      date: new Date(2020, 5, 3, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 3, 11).getTime();
    });

    const available = await listAvailableTimes.execute({
      provider_id: 'provider',
      day: 3,
      year: 2020,
      month: 6,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 11, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 13, available: true },
        { hour: 16, available: true },
      ]),
    );
  });
});
