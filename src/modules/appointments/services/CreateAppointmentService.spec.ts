import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from "@shared/errors/AppError";

let repository: FakeAppointmentsRepository;
let service: CreateAppointmentService;

describe('CreateAppointment', () => {

  beforeEach(() => {
    repository = new FakeAppointmentsRepository()
    service = new CreateAppointmentService(repository);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await service.execute({
      date: new Date(),
      provider_id: 'as5da645'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('as5da645');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await service.execute({
      date: appointmentDate,
      provider_id: 'as5da645'
    });

     await expect(service.execute({
      date: appointmentDate,
      provider_id: 'as5da645a'
    })).rejects.toBeInstanceOf(AppError);

  });

});
