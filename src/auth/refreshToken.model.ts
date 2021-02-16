import * as mongoose from 'mongoose';

export const RefreshTokenSchema = new mongoose.Schema({
    email: {type: String, required: true},
    refreshToken: {type: String, required: true},
})

export interface RefreshToken extends mongoose.Document {
    id: string;
    email: string;
    refreshToken: string;
}