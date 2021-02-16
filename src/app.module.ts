import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';

import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BlogsModule,
    AuthModule,
    MongooseModule.forRoot(process.env.CONNECT_STRING_TO_MONGO, { useNewUrlParser: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
