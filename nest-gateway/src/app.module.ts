import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service'; //

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    {
      provide: 'HEALTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const options = configService.get('healthService');
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    AppService,
  ],
})
export class AppModule {}
