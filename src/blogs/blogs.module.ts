import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogSchema } from './blog.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema}]),
    ],
    controllers: [BlogsController],
    providers: [BlogsService],
})

export class BlogsModule{}