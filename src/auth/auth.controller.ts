import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'
import { User } from './user.model';

@Controller('users')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        ) {}

    @Get()
    async getUsers() {
        const result = await this.authService.getUsers();
        return result;
    }

    @Post('token')
    isValid(
        @Body('token') token: string
    ) : string {
        const result = this.authService.checkToken(token);

        return result;
    }

    @Post('register')
    async registerUser(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('password') password: string,
        @Body('age') age: number,
        @Body('email') email: string
    ) : Promise<string> {    
        const userToken = await this.authService.registerUser(
            firstName,
            lastName,
            password,
            email,
        );

        return userToken;
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string        
    ): Promise<Object | string>{
        const val = await this.authService.loginUser(password, email);

        return val;
    }

    @Post('token')
    token(
        @Body('token') token : string
    ): string {
        const response = this.authService.auth(token);

        return response;
    }

    @Post('logout')
    async logou(
        @Body('email') email: string
    ) : Promise<boolean> {
        const response = this.authService.logout(email);

        return response;
    }
}