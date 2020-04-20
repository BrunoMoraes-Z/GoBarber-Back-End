import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateappointmentService from '../services/CreateAppointmentService';
import authentication from '../middlewares/ensureAuthnticated';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.use(authentication);

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const service = new CreateappointmentService();
  const appointment = await service.execute({ provider_id, date: parseISO(date) });

  return response.json(appointment);
});

appointmentsRouter.get('/', async (request, response) => {
  const repository = getCustomRepository(AppointmentsRepository);
  const appointments = await repository.find();

  if (appointments) {
    return response.json(appointments);
  } else {
    return response.status(400).json({ error: 'No registered appointment.' })
  }
});

export default appointmentsRouter;
