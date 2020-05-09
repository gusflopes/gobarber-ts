import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
// import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  month: number; // range seria 1 | 2 | ...rest
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListAvailableDays {
  constructor(
    //   @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findMonthlyAppointments(
      {
        provider_id,
        month,
        year,
      },
    );

    const daysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1,
    );
    // console.log(eachDayArray);

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}
