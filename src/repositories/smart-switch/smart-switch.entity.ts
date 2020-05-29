import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { LCU } from '../lcu/lcu.entity'

@Entity()
export class SmartSwitch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  state: boolean;

  @ManyToOne(type => LCU, lcu => lcu.switches)
  @JoinColumn()
  lcu: LCU;
}
