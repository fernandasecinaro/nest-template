import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { logger } from './middlewares/logger.middleware';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        explicitConnect: true,
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // Middleware configuration
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(logger).forRoutes(UsersController);
    // You can provide a comma separated list inside the apply() method to execute multiple middlewares sequentially: consumer.apply(Logger, Middleware2, Middleware3)
  }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddlewareMethod)
  //     .forRoutes({ path: 'users', method: RequestMethod.ALL }); // Remove method key to apply middleware to all routes in the specified path
  // }
}
