import { User, IUser } from "../models/userModel";
import { generateToken } from "../middleware/token";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const create = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, password } = req.body;

    try {
        const existingUser: IUser | null = await User.findOne({ email });
    
        if (existingUser) {
            return res.status(401).json({ message: 'Email already in use' });
        };

        const newUser = new User({ username, email, password });

        await newUser.save();
        console.log("User created, id:", newUser._id.toString());
        const token = generateToken(newUser.id);
        return res.status(201).json({ message: "User created", token});
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Something went wrong" });
        };
    
};

const authenticate = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(existingUser.id);
        return res.status(200).json({ message: "Authentication successful", token: token, username: existingUser.username, user_id: existingUser._id});

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Authentication failed" });
    }
};



const AuthenticationController = {
    create: create,
    authenticate: authenticate,
};


export { AuthenticationController };

