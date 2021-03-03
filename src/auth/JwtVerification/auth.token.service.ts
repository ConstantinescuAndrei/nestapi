import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthTokenService {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    tokenValidation(token : string) : string | boolean {

        if(!token) {
            return "Invalid token";
        }
        try {
            this.jwtService.verify(token);
            console.log('asd');
            return true;
        }
        catch (err) {
            console.log(err);
            return false;

        }           
    }

    createToken(email: string) {
        const token = this.jwtService.sign(
            {email: email},
            {secret: process.env.SECRET_TOKEN}
            );
        console.log(token);

        return token;
    }
}