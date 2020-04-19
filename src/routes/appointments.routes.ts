import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateappointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const service = new CreateappointmentService();
    const appointment = await service.execute({ provider, date: parseISO(date) });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message});
  }
});

appointmentsRouter.get('/', async (request, response) => {
  const repository = getCustomRepository(AppointmentsRepository);
  const appointments = await repository.find();

  if (appointments) {
    return response.json(appointments);
  } else {
    return response.status(400).json({error: 'No registered appointment.'})
  }
});

export default appointmentsRouter;
