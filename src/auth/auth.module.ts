import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './user.model';
import { RefreshTokenSchema } from './refreshToken.model'
import { AuthTokenService } from './JwtVerification/auth.token.service'

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.SECRET_TOKEN
        }),
        MongooseModule.forFeature([
            { name: 'Users', schema: UserSchema },
            { name: 'RefreshTokens', schema: RefreshTokenSchema}
        ])   
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthTokenService],
    exports: [AuthTokenService],
})

export class AuthModule{}