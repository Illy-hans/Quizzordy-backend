import { User, IUser } from "../models/userModel";
import { generateToken } from "middleware/token";
import { Request, Response } from 'express';


const create = async (req: Request, res: Response): Promise<Response> => {
    const username: string = req.body.username;
    const email:  string = req.body.email;
    const password: string = req.body.password;

    try {
        // Checks if the email is already in use
        const existingUser: IUser | null = await User.findOne({ email });
    
        if (existingUser) {
            return res.status(401).json({ message: 'Email already in use', code: 1 });
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




const UsersController = {
    create: create,
    getAllUserInfo: getAllUserInfo, 
    updateUserInfo: updateUserInfo,
    saveQuiz: saveQuiz,
};


export { UsersController };