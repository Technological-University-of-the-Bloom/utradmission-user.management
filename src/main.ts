// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as session from 'express-session';
// import * as passport from 'passport';
// import { ConfigService } from '@nestjs/config';
// import { ValidationPipe } from '@nestjs/common';
// import { createClient } from 'redis';
// import redis from 'redis';
// //import RedisStore from 'connect-redis';
// import connectRedis from 'connect-redis';
// import type { Client } from 'connect-redis';

// const PORT = 3000;
// const rdc = (<unknown>redis) as Client;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true,
//     }),
//   );
//   const configService = app.get(ConfigService);
//   const redisClient = createClient({
//     legacyMode: true,
//     url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`,
//   });

//   redisClient.on('connect', () => console.log('Redis Client Connected'));
//   redisClient.on('error', (err) => console.log('Redis Client Error', err));
//   await redisClient.connect().catch(console.error);
//   const RedisStore = connectRedis(session);
//   const rds = new RedisStore({ client: rdc });

//   app.use(
//     session({
//       store: rds,
//       secret: configService.get('SESSION_SECRET'),
//       resave: false,
//       saveUninitialized: false,
//     }),
//   );
//   app.use(passport.initialize());
//   app.use(passport.session());
//   await app.listen(PORT);
//   console.log(`Listening to port http://localhost:${PORT}`);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as redis from 'redis';
const connectRedis = require('connect-redis');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);

  // Creating redis client using Redis v3.x
  const redisClient = redis.createClient({
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
  });

  redisClient.on('connect', () => console.log('Redis Client Connected'));
  redisClient.on('error', (err) => console.error('Redis Client Error', err));

  // Initialize RedisStore with session
  const RedisStore = connectRedis(session);

  // Correct instantiation of RedisStore
  const store = new RedisStore({ client: redisClient });

  app.use(
    session({
      store: store, // Using the Redis store instance
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
  console.log('Listening on port 3000');
}

bootstrap();
