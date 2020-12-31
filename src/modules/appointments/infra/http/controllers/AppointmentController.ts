import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateappointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointMentController{

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const service = container.resolve(CreateappointmentService)
    // const service = new CreateappointmentService(appointmentsRepository);
    const appointment = await service.execute({ provider_id, date: parseISO(date) });

    return response.json(appointment);
  }

}
