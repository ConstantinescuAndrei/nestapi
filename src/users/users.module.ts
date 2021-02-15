import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config';

import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { UserSchema } from "./user.model"

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secretOrPrivateKey: process.env.SECRET
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule{}