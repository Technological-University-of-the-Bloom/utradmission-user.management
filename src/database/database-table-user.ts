import {
  pgTable,
  serial,
  varchar,
  timestamp,
  smallint,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { rol } from './database-table-rol';

export const usuario = pgTable(
  'usuario',
  {
    id_usuario: serial('id_usuario').primaryKey(),
    usuario: varchar('usuario', { length: 125 }),
    correo: varchar('correo', { length: 50 }),
    contraseña: varchar('contraseña', { length: 255 }),
    fecha_creacion: timestamp('fecha_creacion'),
    id_rol: smallint('id_rol').references(() => rol.id_rol),
    fecha_actualizada: timestamp('fecha_actualizada'),
  },
  (table) => ({
    fk: foreignKey({
      name: 'id_rol_fk',
      columns: [table.id_rol],
      foreignColumns: [rol.id_rol],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  }),
);
