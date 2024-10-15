import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/postgres.ErrorCode.enum';
import { RegisterDto } from 'src/dto/register.dto';
//Authentication service that uses sessions
//TODO: Implement authentication

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  //authentication
  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.contraseña, 10);
    try {
      console.log(`registrationData: ${registrationData}`);
      return this.usersService.create({
        ...registrationData,
        contraseña: hashedPassword,
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(correo: string, plainTextPassword: string) {
    //email type perchance
    console.log(`emailgetAuthenticatedUser: ${correo},
      password: ${plainTextPassword}`);
    try {
      const user = await this.usersService.getByEmail(correo);
      console.log(`Found user: ${user.correo}`);
      await this.verifyPassword(plainTextPassword, user.contraseña);
      console.log('Password is correct');
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
