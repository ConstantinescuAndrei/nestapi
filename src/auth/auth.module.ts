import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './user.model';
import { RefreshTokenSchema } from './refreshToken.model'

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secretOrPrivateKey: process.env.SECRET_TOKEN,   
            signOptions: {
                expiresIn: '15s',
            }
        }),
        MongooseModule.forFeature([
            { name: 'Users', schema: UserSchema },
            { name: 'RefreshTokens', schema: RefreshTokenSchema}
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})

export class AuthModule{}