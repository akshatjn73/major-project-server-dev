import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Temperature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  switchId: string;

  @Column({ type: "float" })
  value: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
