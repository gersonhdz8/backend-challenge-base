import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: "DemoUser33",
})
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'El nombre de usuario debe tener minimo 6 caracteres de longitud.',
  })
  username!: string;

  @ApiProperty({
    description: 'Contraseña',
    example: "PassDemo123",
})
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'La contraseña debe tener minimo 6 caracteres de longitud.',
  })
  password!: string;
}
