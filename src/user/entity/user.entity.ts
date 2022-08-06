import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @Column({ type: 'bigint' })
  createdAt!: string;

  @Column({ type: 'bigint' })
  updatedAt!: string;

  @Column()
  version!: number;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;
}
