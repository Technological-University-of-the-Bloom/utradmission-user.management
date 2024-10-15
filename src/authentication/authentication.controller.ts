import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LogInWithCredentialsGuard } from './LoginWithCredentialsGuard';
import { CookieAuthenticationGuard } from './cookieAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register') //POST localhost:3000/authentication/register
  async register(@Body() registrationData: RegisterDto) {
    console.log(`registrationData: ${registrationData}`);
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LogInWithCredentialsGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    console.log(`request: ${JSON.stringify(request.body)}`);
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser) {
    // Call Passport's logOut method to destroy the session
    request.logOut((error) => {
      if (error) {
        return {
          success: false,
          message: error,
        };
      }
    });
    request.session.cookie.maxAge = 0;
    return { success: true, message: 'Logged out successfully' };
  }
}
