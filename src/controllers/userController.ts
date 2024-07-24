import { User, IUser } from "../models/userModel";
import { generateToken } from "../middleware/token";
import { Request, Response } from 'express';
import { QuizEntry } from "../models/quizModel";


interface CustomRequest extends Request {
    user_id?: string;
}
const getAllUserData = async (req: CustomRequest, res: Response): Promise<Response> => {
    let user: IUser | null = null

    try {
        const userId = req.query.user_id as string | undefined || req.user_id;

        if (userId != null) {
            user = await User.findById(userId);
        } else {
            user = await User.findById(req.user_id as string);
        }
    
        const token = generateToken(req.user_id);
        res.status(200).json({username: user.username, email: user.email, token: token, quiz: user.quiz });
        } 
    catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'User not found' })
        }
    };


const updateUserData = async (req: CustomRequest, res: Response): Promise<Response> => {
    
    try {
        const user = await User.findById(req.user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };

        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        await user.save();

        const token = generateToken(user.id)

        return res.status(200).json({ message: "User updated", token: token });

    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error });
    };
};


const saveQuiz = async( req: CustomRequest, res: Response): Promise<Response> => {

    try {
        const user = await User.findById(req.user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };

        const { score, questionArray } = req.body;

        const newQuizEntry: QuizEntry = {
            score:score,
            questionArray: questionArray,
            createdAt: new Date()
        };

        user.quiz.push(newQuizEntry);
        await user.save();

        const token = generateToken(req.user_id)
        return res.status(201).json({ message: 'Quiz added to user successfully', token: token});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
};


const UsersController = {
    getAllUserData: getAllUserData, 
    updateUserData: updateUserData,
    saveQuiz: saveQuiz,
};


export { UsersController };



