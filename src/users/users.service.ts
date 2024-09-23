import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Método para encontrar un usuario por ID
  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
  //Buscar todos los usuarios
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Método para encontrar un usuario por nombre de usuario
  async findOneByUsername(username: string): Promise<User | null> {
    const user = this.usersRepository.findOne({ where: { username } });
    return user;
  }

  // Método para registrar un usuario
  async create(username: string, password: string): Promise<User> {
    
    const user = this.usersRepository.create({ username, password });
    return this.usersRepository.save(user); // Asegúrate de guardar el usuario
  }

  // Soft Delete o delete Lógico
  async softDelete(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    // Marcar el usuario como eliminado
    await this.usersRepository.update(id, { deleteStatus: true });

    // Devolver el usuario actualizado
    return { ...user, deleteStatus: true };
  }

  //Actualizar el usuario
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null > {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    // Si se proporciona una nueva contraseña, se hashea
    if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        updateUserDto.password = hashedPassword;
    }

    // Actualizar el usuario con los nuevos datos
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { id } });
}  
}



