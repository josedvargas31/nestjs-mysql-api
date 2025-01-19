import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' }) // table name
export class User {
    // columns for the table
  @PrimaryGeneratedColumn() 
  id: number;
  @Column({ unique: true }) // unique column
  username: string;
  @Column()
  password: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // datetime column
  createdAt: Date;
  @Column({ nullable: true }) // nullable column
  authStrategy: string;
}
