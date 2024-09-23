import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Session } from './session.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string; 
  
  @Column({ default: false })
  deleteStatus!: boolean;


  @OneToMany(() => Session, session => session.user)
  sessions!: Session[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites!: Favorite[];
  
}
