import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateappointmentService from '@modules/appointments/services/CreateAppointmentService';
import authentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(authentication);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   if (appointments) {
//     return response.json(appointments);
//   } else {
//     return response.status(400).json({ error: 'No registered appointment.' })
//   }
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const service = container.resolve(CreateappointmentService)
  // const service = new CreateappointmentService(appointmentsRepository);
  const appointment = await service.execute({ provider_id, date: parseISO(date) });

  return response.json(appointment);
});

export default appointmentsRouter;
