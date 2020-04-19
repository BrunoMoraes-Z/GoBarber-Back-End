import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {

  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  provider: String;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;
