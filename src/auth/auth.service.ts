import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { User, } from './user.model';
import { RefreshToken } from './refreshToken.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('Users') private readonly userModel: Model<User>,
        @InjectModel('RefreshTokens') private readonly refreshTokenModel: Model<RefreshToken>,
        private readonly jwtService: JwtService,
    ){}

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
        password: string, 
        email: string): Promise<string> {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            firstName,
            lastName,
            password: hashPassword,
            email,
        });
        
        const emailExist = await this.userModel.findOne({email}).exec();

        if(emailExist) {
            console.log("hello");

            return "An account with this email is already register";
        }

        const { token, refreshToken } = this.createToken(email);
        const newRefreshToken = new this.refreshTokenModel({
            email,
            refreshToken
        })
        await newRefreshToken.save();
        await newUser.save();
        return token;
        
    }

    // LOGIN USER
    async loginUser(
        password: string,
        email: string): Promise<Object | string> {                
        const user = await this.userModel.findOne({email}).exec(); 

        if(user) {
            const passwordMatch = await bcrypt.compare(password, user['password']);

            if(passwordMatch) {
                console.log(user['_id']);
                const token = this.createToken(user['_id']);
                const refreshToken = this.jwtService.sign({userId: user['_id']}, {
                    secret: process.env.REFRESH_SECRET_TOKEN,
                })
                console.log(token);
                console.log(refreshToken);
                
                return token;
            }
        }  
        return "Failed to login"
    }    

    async logout(
        email: string,
    ) : Promise<boolean> {
        const response = await this.refreshTokenModel.deleteOne({ email }).exec();
        console.log(response);

        if(response) {
            return true;
        }
        
        return false;
    }

    checkToken(token: string) : string {
        const result = this.auth(token);

        return result;
    }

    auth(token : string) : string {
        if(!token) {
            return "invalid token";
        }
    
        try {
            const verify = this.jwtService.verify(token);
    
            console.log(typeof verify);
            return verify;
        }
        catch (err) {
            console.log(typeof err)
            return err;
        }
    }

    private createToken(email: string) {
        const token = this.jwtService.sign({email: email});
        const refreshToken = this.jwtService.sign(
            {email: email},
            {secret: process.env.REFRESH_SECRET_TOKEN}
        )
        const result = {
            "token": token,
            "refreshToken": refreshToken,
        }

        return result;
    }
    
}