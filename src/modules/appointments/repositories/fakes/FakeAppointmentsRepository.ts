import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import iCreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({ date, provider_id }: iCreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id });
    this.appointments.push(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(ap => isEqual(ap.date, date));
    return findAppointment;
  }
}

export default AppointmentsRepository;
