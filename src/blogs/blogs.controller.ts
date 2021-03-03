import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
    constructor(
        private readonly blogsService: BlogsService
    ) {}

    @Get()
    async getBlog() : Promise<Object> {
        const blogs = await this.blogsService.getBlog();

        return blogs;
    }
    @Post()
    async getBlogs(@Body('token') token: string) : Promise<Object> {
        const blogs = await this.blogsService.getBlogs(token);

        return blogs;
    }

    @Post('new-blog')
    async newBlog(
        @Body('title') title: string,        
        @Body('content') content: string,
        @Body('imageLink') imageLink: string,
        @Body('author') author: string,
    ) {
        console.log("Hello");
        const newBlog = this.blogsService.addNewBlog(title, content, imageLink, author);

        return newBlog;
    }

    @Post('update-blog')
    async updateBlog(
        @Body('identifier') identifier: string,
        @Body('columnName') columnName: string,
        @Body('update') updateContent: string,
        @Body('token') token: string
    ) {
        console.log(columnName);
        const result = await this.blogsService.updateBlog(identifier, columnName, updateContent, token);

        return result;
    }

    @Post('delete-blog')
    async deleteBlog(
        @Body('id') id: string,
        @Body('token') token: string
    ) : Promise<Object | string> {
        const result = await this.blogsService.deleteBlog(id, token);

        return result;
    }
}