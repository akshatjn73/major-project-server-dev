import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class ActiveData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  switchId: string;

  @Column()
  operation: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
