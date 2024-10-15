export class CreateUserDto {
  id_usuario?: number;
  correo: string;
  usuario: string;
  contraseña: string;
  fecha_creacion?: Date;
  id_rol?: number;
}
