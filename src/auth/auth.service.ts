import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { User, } from './user.model';
import { RefreshToken } from './refreshToken.model';
import { AuthTokenService } from './JwtVerification/auth.token.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('Users') private readonly userModel: Model<User>,
        @InjectModel('RefreshTokens') private readonly refreshTokenModel: Model<RefreshToken>,
        private readonly jwtService: JwtService,
        private readonly authTokenService: AuthTokenService
    ) { }

    // RETURN ALL USERS
    async getUsers() {
        const users = await this.userModel.find().exec();

        return users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }))
    }

    // REGISTER USER
    async registerUser(
        firstName: string,
        lastName: string,
        username: string,
        password: string,
        email: string): Promise<Object> {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            firstName,
            lastName,
            username,
            password: hashPassword,
            email,
        });

        const emailExist = await this.userModel.findOne({ email }).exec();

        if (emailExist) {
            console.log("hello");

            const result: Object = {
                registered: false,
                reason: "An account with this email is already register"
            };
            return result;
        }

        const token = this.authTokenService.createToken(email);
        await newUser.save();

        const result: Object = {
            token,
            registered: true,
        }

        return result;
    }

    // LOGIN USER
    async loginByUsername(
        username: string,
        password: string
    ): Promise<Object | string> {
        const user = await this.userModel.findOne({ username }).exec();

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user['password']);

            if (passwordMatch) {
                const token = await this.authTokenService.createToken(username);

                const resultObject: Object = {
                    token,
                    user,
                    connected: true
                }
                return resultObject;
            }
        }
        const resultObject: Object = {
            connected: false,
            reason: "Username or password invalid!"
        }
        return resultObject;
    }

    async loginByEmail (
        email: string,
        password: string
    ): Promise<Object | string> {
        const user = await this.userModel.findOne({email}).exec();

        if(user) {
            const passwordMatch = await bcrypt.compare(password, user['password']);

            if(passwordMatch) {
                const token = await this.authTokenService.createToken(email);

                const resultObject: Object = {
                    token,
                    user,
                    connected: true
                }
                return resultObject;
            }
        }
        const resultObject: Object = {
            reason: "Email or password invalid!",
            connected: false
        }

        return resultObject;
    }

    logout(
        email: string,
    ): string {
        // const response = await this.refreshTokenModel.deleteOne({ email }).exec();
        // console.log(response);

        // if(response) {
        //     return true;
        // }

        // return false;

        return "Logout";
    }

    async checkToken(token: string) {
        const result = this.authTokenService.tokenValidation(token);
        console.log(result);

        return result;
    }





}