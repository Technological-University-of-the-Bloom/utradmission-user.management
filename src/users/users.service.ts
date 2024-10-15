import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../database/drizzle.service';
import { databaseSchema } from '../database/database-schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DateTime } from 'luxon';
// import { LoginUserDto } from '../dto/login-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}
  //_______________________________GET__________________________________________
  getDate() {
    const luxonDate: DateTime = DateTime.now().setZone('America/Mexico_city');
    const JSDate: Date = new Date();
    const toJsDate: Date = luxonDate.toJSDate();

    console.log(`luxonDate: ${luxonDate}\n testDate: ${JSDate}`);
    return `luxonDate: ${luxonDate}\ntestDate: ${JSDate}\ntoJSDATE: ${toJsDate}`;
  }
  async getAll() {
    return this.drizzleService.db.select().from(databaseSchema.usuario);
  }

  async getById(id: number) {
    const users = await this.drizzleService.db
      .select()
      .from(databaseSchema.usuario)
      .where(eq(databaseSchema.usuario.id_usuario, id));
    const user = users.pop();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  // async getByUsername(username: LoginUserDto) {
  //   const users = await this.drizzleService.db
  //     .select()
  //     .from(databaseSchema.usuario)
  //     .where(eq(databaseSchema.usuario.usuario, username.usuario));
  //   const user = users.pop();
  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   return user;
  // }

  async getByEmail(email: string) {
    const users = await this.drizzleService.db
      .select()
      .from(databaseSchema.usuario)
      .where(eq(databaseSchema.usuario.correo, email));
    const user = users.pop();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  //_______________________________CREATE__________________________________________
  async create(userData: CreateUserDto) {
    const date: Date = new Date();
    const rol_id: number = 1;
    userData.fecha_creacion = date;
    userData.id_rol = rol_id;
    const createdUser = await this.drizzleService.db
      .insert(databaseSchema.usuario)
      .values(userData)
      .returning();
    return createdUser.pop();
  }

  //_______________________________UPDATE__________________________________________
  async updateUserById(id: number, user: UpdateUserDto) {
    user.fecha_actualizada = new Date();
    const updatedUser = await this.drizzleService.db
      .update(databaseSchema.usuario)
      .set(user)
      .where(eq(databaseSchema.usuario.id_usuario, id))
      .returning();
    if (updatedUser.length === 0) {
      throw new NotFoundException();
    }
    return updatedUser.pop();
  }

  //_______________________________DELETE__________________________________________
  async deleteUserById(id: number) {
    const deletedUser = await this.drizzleService.db
      .delete(databaseSchema.usuario)
      .where(eq(databaseSchema.usuario.id_usuario, id))
      .returning();

    if (deletedUser.length === 0) {
      throw new NotFoundException();
    }
    return deletedUser.pop();
  }
}
