import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
    constructor(
        private readonly blogsService: BlogsService
    ) {}

    @Get()
    async getBlogs() {
        const blogs = await this.blogsService.getBlogs();

        return blogs;
    }
}