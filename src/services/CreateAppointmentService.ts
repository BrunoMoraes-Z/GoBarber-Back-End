import Appointment from '../models/Appointment';
import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: String;
  date: Date;
}

class CreateAppointmentService {


  public async execute({ provider, date }: Request): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await repository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked.');
    }

    const appointment = repository.create({
      provider,
      date: appointmentDate
    });

    await repository.save(appointment);

    return appointment;
  }

}

export default CreateAppointmentService;
