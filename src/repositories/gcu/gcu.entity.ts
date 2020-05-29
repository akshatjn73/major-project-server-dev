import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { LCU } from '../lcu/lcu.entity';

@Entity()
export class GCU {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => LCU, lcu => lcu.gcu)
  @JoinColumn()
  lcu: LCU[];
}
