import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthenticationService } from 'src/authentication/auth.service';
import { AuthenticationController } from 'src/authentication/authentication.controller';
import { LocalStrategy } from 'src/authentication/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalSerializer } from 'src/authentication/local.serializer';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [UsersController, AuthenticationController],
  providers: [
    UsersService,
    AuthenticationService,
    LocalStrategy,
    LocalSerializer,
  ],
  exports: [UsersService],
})
export class UsersModule {}
