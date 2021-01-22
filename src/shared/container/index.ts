import { container } from 'tsyringe';

import '@modules/users/providers'
import './providers'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';

container.registerSingleton<IAppointmentRepository>('AppointmentsRepository', AppointmentsRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUserTokenRepository>('UsersTokenRepository', UsersTokenRepository);
