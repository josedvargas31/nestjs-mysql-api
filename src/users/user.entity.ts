import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from 'src/posts/post.entity';

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

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile

  @OneToMany( () => Post, post => post.author)
  posts: Post[]
}