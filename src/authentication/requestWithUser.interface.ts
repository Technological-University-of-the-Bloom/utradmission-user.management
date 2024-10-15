// import { CreateUserDto } from 'src/dto/create-user.dto';
import { Request } from 'express';
import { LoginUserDto } from 'src/dto/login-user.dto';
interface RequestWithUser extends Request {
  user: LoginUserDto;
}

export default RequestWithUser;
