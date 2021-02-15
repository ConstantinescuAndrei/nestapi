import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

import { Blog } from './blog.model';

@Injectable()
export class BlogsService {
    constructor(
        @InjectModel('Blog') private readonly blogModel: Model<Blog>,
    ) {}

    async getBlogs() {
        const blogs = await this.getBlogsDB();

        return blogs;
    }

    private async getBlogsDB() {
        const blogs = await this.blogModel.find().exec();
        return blogs;
    }
}