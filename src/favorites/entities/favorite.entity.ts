import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  movieId!: number;   

  @ManyToOne(() => User, user => user.favorites)
  user!: User;
}