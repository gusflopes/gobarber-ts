import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAvailableDays from '@modules/appointments/services/ListAvailableDaysByMonthService';

export default class MonthlyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.body;
    const { provider_id } = request.params;
    const listAvailableDays = container.resolve(ListAvailableDays);

    const availability = await listAvailableDays.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
