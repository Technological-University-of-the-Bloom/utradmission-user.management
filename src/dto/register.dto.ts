import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  // IsDate,
  // IsNumber,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  contraseña: string;

  @IsOptional()
  fecha_creacion?: Date;

  @IsOptional()
  id_rol?: number;
}
