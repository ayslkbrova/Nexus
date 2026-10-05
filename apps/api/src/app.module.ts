import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
        type:'postgres',
        host:config.get('DB_HOST'),
        port:Number(config.get('DB_PORT')),
        database:config.get('DB_NAME'),
        username:config.get('DB_USER'),
        password:config.get('DB_PASSWORD')
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
