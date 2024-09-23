import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  //Registrar usuario.
async registerUser(username: string, password: string): Promise<any> {
    const existingUser = await this.usersService.findOneByUsername(username);
    if (existingUser) {
        throw new ConflictException("Este nombre de usuario ya existe.");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create(username, hashPassword);
    return {
        message: "Usuario registrado exitosamente",
        username: newUser.username,
    };
}
// Iniciar sesión
async loginUser(username: string, password: string): Promise<any> {

    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
        throw new UnauthorizedException("Credenciales incorrectas."); //Usuario incorrecto
    }
    //Comparar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciales incorrectas."); // Contraseña incorrecta
    }
    // Generar JWT
    const payload = { username: user.username, sub: user.id }; 
    const token = this.jwtService.sign(payload);

    return {
        message: 'Inicio de sesión exitoso',
        access_token: token, // Devuelve el token generado
        username: user.username,
    };  


}
}
