import { Router } from 'express';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import authentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentContoller = new AppointmentController();

appointmentsRouter.use(authentication);

appointmentsRouter.post('/', appointmentContoller.create);

export default appointmentsRouter;
