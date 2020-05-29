import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { SmartSwitch } from '../smart-switch/smart-switch.entity';
import { GCU } from '../gcu/gcu.entity'

@Entity()
export class LCU {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => SmartSwitch, smartSwitch => smartSwitch.lcu)
  @JoinColumn()
  switches: SmartSwitch[];

  @ManyToOne(type => GCU, gcu => gcu.lcu)
  @JoinColumn()
  gcu: GCU;
}
