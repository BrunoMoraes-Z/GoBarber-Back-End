import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO {
  provider: String,
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[]

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const app = new Appointment({ provider, date });
    this.appointments.push(app);
    return app;
  }

  public findByDate(date: Date): Appointment | null {
    const appointment = this.appointments.find(appointment => isEqual(date, appointment.date));
    return appointment || null;
  }

}

export default AppointmentsRepository;
