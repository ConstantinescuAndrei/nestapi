import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

import { Blog } from './blog.model';
import { AuthTokenService } from '../auth/JwtVerification/auth.token.service'

@Injectable()
export class BlogsService {
    constructor(
        @InjectModel('Blog') private readonly blogModel: Model<Blog>,
        private readonly authTokenService: AuthTokenService,
    ) {}

    async getBlogs(token: string) : Promise<Object> {
        const tokenIsValid = this.authTokenService.tokenValidation(token);
        if(tokenIsValid) {
            const blogs = await this.getBlogsDB();

            return blogs;
        }
        
        return "You must have a valid token";
    }

    async getBlog() : Promise<Object> {
        const blogs = await this.getBlogsDB();

        return blogs;        
    }

    async addNewBlog(title: string, content: string, imageLink: string, author: string) : Promise<Object | string> {
        if(!title || !content || !author ) {
            return "You must write a valid blog!";
        }
        
        const newBlog = new this.blogModel({
            title,
            content,
            author,
            imageLink
        });
        const result = await newBlog.save();

        return result;
    }

    async updateBlog(
        identifier: string, 
        columnName: string, 
        updateContent: string, 
        token: string) : Promise<Object | string> {
        let result: Object;
        const validToken = this.authTokenService.tokenValidation(token);
        if(!validToken) {
            return "Invalid token";
        }

        switch(columnName) {
            case 'title':
                result = await this.blogModel.findOneAndUpdate({_id: identifier}, {title: updateContent});
                break;
            case 'content':
                result = await this.blogModel.findOneAndUpdate({_id: identifier}, {content: updateContent});
                break;
            case 'author':
                result = await this.blogModel.findOneAndUpdate({_id: identifier}, {author: updateContent});
                break;
            default:
                return "Cannot find the field who need to be updated!";
        }
        console.log(result);

        return result;
    }

    async deleteBlog (_id: string, token: string) {
        const validToken = this.authTokenService.tokenValidation(token);
        if(!validToken) {
            return "invalid token";
        }

        const result = await this.blogModel.findByIdAndDelete({_id});

        return result;
    }

    private async getBlogsDB() {
        const blogs = await this.blogModel.find().exec();
        return blogs;
    }
}