import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogSchema } from './blog.model';
import { AuthTokenService } from '../auth/JwtVerification/auth.token.service'

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema}]),
        JwtModule.register({
            secret: process.env.SECRET_TOKEN
        })
    ],
    controllers: [BlogsController],
    providers: [BlogsService, AuthTokenService],
})

export class BlogsModule{}