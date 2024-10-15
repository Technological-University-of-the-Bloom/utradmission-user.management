import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationService } from './auth.service';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'correo',
      passwordField: 'contraseña',
    });
  }

  async validate(correo: string, contraseña: string): Promise<LoginUserDto> {
    console.log(`emailvalidate: ${correo}, passwordvalidate: ${contraseña}`);
    return this.authenticationService.getAuthenticatedUser(correo, contraseña);
  }
}
