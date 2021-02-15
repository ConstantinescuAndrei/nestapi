import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module'
import { BlogsModule } from './blogs/blogs.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule, 
    BlogsModule,
    MongooseModule.forRoot(process.env.CONNECT_STRING_TO_MONGO, { useNewUrlParser: true }
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
