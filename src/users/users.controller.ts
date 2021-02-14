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

    @Post()
    async registerUser(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('password') password: string,
        @Body('age') age: number,
        @Body('email') email: string
    ) {
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
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('password') password: string,
        @Body('age') age: number,
        @Body('email') email: string,
    ): Promise<boolean>{
        const val = await this.usersService.loginUser(firstName, lastName, password, age, email);
        return val;
    }
}