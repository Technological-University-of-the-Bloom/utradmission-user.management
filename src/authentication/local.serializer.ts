import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PassportSerializer } from '@nestjs/passport';
//import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: LoginUserDto, done: CallableFunction) {
    console.log(`Serializing user: ${JSON.stringify(user)}`);
    done(null, user.id_usuario.toString());
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.getById(Number(userId));
    done(null, user);
  }
}
