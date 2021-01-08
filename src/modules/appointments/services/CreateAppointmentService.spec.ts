import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('sould be able to create a new appointment', async () => {
    const repository = new FakeAppointmentsRepository()
    const service = new CreateAppointmentService(repository);
    const appointment = await service.execute({
      date: new Date(),
      provider_id: 'as5da645'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('as5da645');
  });

  // it('sould not be able to create two appointments on the same time', () => {
    // expect(1 + 2).toBe(3);
  // });
});
