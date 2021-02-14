import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';

import { User, UserSchema } from './user.model'
import { Mongoose } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
    ){}

    async getUsers() {
        const users = await this.userModel.find().exec();

        return users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            email: user.email,
        }))
    }

    async registerUser(
        firstName: string, 
        lastName: string,
        password: string, 
        age: number, 
        email: string) {
        let isRegister = null;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            firstName,
            lastName,
            password: hashPassword,
            age,
            email,
        });
        
        const users = await this.userModel.find().exec();
        isRegister = users.filter(user => {
            console.log(user.firstName);
            console.log(newUser.firstName);
            if(user.firstName === newUser.firstName){
                return true;
            }
        })
        console.log(isRegister);

        if(isRegister === null) {
            const result = newUser.save();

            return result;
        }

        return "It doesn t work";
    }

    async loginUser(
        firstName: string, 
        lastName: string,
        password: string,
        age: number,
        email: string): Promise<boolean> {        
        
        // const users = await this.userModel.find().exec();
        // const dbUser = users.filter(user => {
        //     if(user.name === name){
        //         return user;
        //     }
        // })

        // console.log(dbUser);
        // // const response = await bcrypt.compare(password, dbUser);

        return true;
    }


}