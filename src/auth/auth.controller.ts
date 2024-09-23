import { Body, Controller,Headers, Post, HttpCode, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginDto } from "src/users/dto/login-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Autenticación')
@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registrar o crear un usuario.' })
    @ApiResponse({ status: 201, description: 'Usuario creado extiosamente' })
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @HttpCode(HttpStatus.OK)
  @Post("/register")
  async register(@Body() createUserDTO: CreateUserDto): Promise<any> {
    return this.authService.registerUser(createUserDTO.username, createUserDTO.password);
  }

  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 201,
    description: 'Usuario autenticado exitosamente',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
    @ApiResponse({ status: 400, description: 'Credenciales incorrectas' })
  @HttpCode(HttpStatus.OK)
  @Post("/login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto.username, loginDto.password);
  }

}

