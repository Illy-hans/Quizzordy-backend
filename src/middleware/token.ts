require('dotenv').config();
import jwt, { SignOptions } from 'jsonwebtoken';

const private_key : string = process.env.JWT_SECRET;

interface TokenPayload {
    user_id: string;
    iat: number;
    exp: number;
};

const generateToken = (user_id: string): string => {
    const token: TokenPayload = { 
        user_id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
    }; 

    const signOptions : SignOptions = {
        algorithm: 'HS256'
    };

    return jwt.sign(token, private_key, signOptions)
};

const decodeToken = (token: string) : TokenPayload => {
    return jwt.verify(token, private_key) as TokenPayload;
};

const token = generateToken('user1');
console.log(token);

export { generateToken };
export { decodeToken };