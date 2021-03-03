import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'
import { User } from './user.model';

@Controller('users')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Get()
    async getUsers() {
        const result = await this.authService.getUsers();
        return result;
    }

    @Post('token')
    async isValid(
        @Body('token') token: string
    ) {
        const result = this.authService.checkToken(token);

        return result;
    }

    @Post('register')
    async registerUser(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('email') email: string
    ): Promise<Object> {
        const userToken = await this.authService.registerUser(
            firstName,
            lastName,
            username,
            password,
            email,
        );

        return userToken;
    }

    @Post('loginByUsername')
    async loginByUsername(
        @Body('username') username: string,
        @Body('password') password: string
    ): Promise<Object | string> {
        const val = await this.authService.loginByUsername(username, password);

        return val;
    }

    @Post('loginByEmail')
    async loginByEmail(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        const val = await this.authService.loginByEmail(email, password);

        return val;
    }

    @Post('logout')
    logout(
        @Body('email') email: string
    ): string {
        const response = this.authService.logout(email);

        return response;
    }
}