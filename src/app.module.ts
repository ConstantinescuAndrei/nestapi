import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    UsersModule, 
    MongooseModule.forRoot('mongodb+srv://Andrei:YOGQS605AsEMw7aK@cluster0.fjb2k.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
