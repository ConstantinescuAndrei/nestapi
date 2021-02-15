import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service'
import { User } from './user.model'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        const result = await this.usersService.getUsers();
        return result;
    }

    @Post('register')
    async registerUser(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('password') password: string,
        @Body('age') age: number,
        @Body('email') email: string
    ) : Promise<User | string> {
        const registered = await this.usersService.registerUser(
            firstName,
            lastName,
            password,
            age,
            email,
        );

        return registered;
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string        
    ): Promise<boolean | string>{
        const val = await this.usersService.loginUser(password, email);
        return val;
    }

    @Post('token')
    token(
        @Body('token') token : string
    ): string {
        const response = this.usersService.auth(token);

        return response;
    }
}