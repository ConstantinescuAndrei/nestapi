import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { User, } from './user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
    ){}

    // RETURN ALL USERS
    async getUsers() {
        const users = await this.userModel.find().exec();;

        return users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            email: user.email,
        }))
    }

    // REGISTER USER
    async registerUser(
        firstName: string, 
        lastName: string,
        password: string, 
        age: number, 
        email: string) {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            firstName,
            lastName,
            password: hashPassword,
            age,
            email,
        });
        
        const emailExist = await this.userModel.findOne({email}).exec();

        if(emailExist) {
            console.log("hello");

            return "An account with this email is already register";
        }

        const result = newUser.save();
        return result;
        
    }

    // LOGIN USER
    async loginUser(
        password: string,
        email: string): Promise<string> {                
        const user = await this.userModel.findOne({email}).exec(); 

        if(user) {
            const passwordMatch = await bcrypt.compare(password, user['password']);

            if(passwordMatch) {
                console.log(user['_id']);
                const token = this.createToken(user['_id']);
                
                return token;
            }
        }  
        return "Failed to login"
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

    private createToken(userId: string) {
        const token = this.jwtService.sign({_id: userId});

        return token;
    }
    
}