import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LogInWithCredentialsGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Extract the request from the context
    const requestb = context.switchToHttp().getRequest();

    //Log the email and password from the request body
    const { correo, contraseña } = requestb.body;
    console.log(`email: ${correo}, password: ${contraseña}`);
    //check the email and the password
    await super.canActivate(context);

    // initialize the session
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    // if no exception were thrown, allow the access to the route
    //return true;
    return true;
  }
}
