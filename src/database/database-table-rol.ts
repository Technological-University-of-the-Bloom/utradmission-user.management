import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const rol = pgTable('rol', {
  id_rol: serial('id_rol').primaryKey(),
  nombre: varchar('nombre', { length: 100 }),
  descripcion: varchar('descripcion', { length: 200 }),
});
