import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateappointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const repository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const appointment = new CreateappointmentService(repository).execute({ provider, date: parseISO(date) });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message});
  }
});

appointmentsRouter.get('/', (request, response) => {

  return response.json(repository.all());
});

export default appointmentsRouter;
