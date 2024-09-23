import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
    description: 'Nombre de usuario',
    example: "UserDemaUpdate",
})
    @IsOptional()
    @IsString()
    username?: string;    

    @ApiProperty({
        description: 'Constraseña',
        example: "PassDemo33Update",
    })
    @IsOptional()
    @IsString()
    password?: string;
    
}
