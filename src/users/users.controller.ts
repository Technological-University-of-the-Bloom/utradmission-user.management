import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

//Users route (localhost:3000/users)
//GET USERS
//CREATE USERS
//UPDATE USERS
//DELETE USERS

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //Get all users
  @Get() // localhost:3000/users
  getAll() {
    return this.userService.getAll();
  }

  //Get user using id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  //Create a user
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  //Update a user using id
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, user);
  }

  //Delete a user
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }

  //TEST DATE
  @Get('date')
  getDate() {
    return this.userService.getDate();
  }
}
