import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAvailableTimes from '@modules/appointments/services/ListAvailableTimes';

export default class MonthlyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { provider_id } = request.params;

    const listAvailableTimes = container.resolve(ListAvailableTimes);

    const availability = await listAvailableTimes.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
