import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsDate,
  IsNumber,
} from 'class-validator';
//import { DateTime } from 'luxon';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  usuario?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  contraseña?: string;

  @IsOptional()
  @IsDate()
  fecha_creacion?: Date;

  @IsOptional()
  @IsNumber()
  id_rol?: number;

  @IsOptional()
  @IsDate()
  fecha_actualizada?: Date;
}
