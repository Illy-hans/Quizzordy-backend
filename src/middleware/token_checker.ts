import jwt from 'jsonwebtoken';
require('dotenv').config();
import { Request, Response, NextFunction } from 'express';

const private_key : string = process.env.JWT_SECRET;

// Interface for the JWT payload
interface JWTPayload {
    user_id: string;
    iat: number;
    exp: number;
}

interface CustomRequest extends Request {
    user_id?: string; 
};

const tokenChecker = (req: CustomRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    const authHeader = req.get('Authorization');
    if (authHeader) {
        token = authHeader.slice(7);
    }

  // Verify the token
    if (token) {
        jwt.verify(token, private_key as string, (err, payload) => {
            if (err) {
                console.log(err);
                res.status(401).json({ message: 'auth error' });
    } else {
        // Add the user_id from the payload to the req object
        req.user_id = (payload as JWTPayload).user_id;
        next();
        }
    });
    } else {
    // No token provided
    res.status(401).json({ message: 'auth error' });
    }
};


export { tokenChecker };
