import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: "DemoUser33",
})
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    description: 'Constrseña',
    example: "PassDemo123",
})
  @IsString()
  @IsNotEmpty()
  password!: string;
}