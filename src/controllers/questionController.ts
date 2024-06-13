import { Question } from '../models/questionModel';
import { Request, Response } from 'express';
import { generateToken } from "../middleware/token";
import axios from 'axios';
import { User } from 'src/models/userModel';

interface CustomRequest extends Request {
    user_id?: string;
}

const createQuiz = async (req: CustomRequest, res: Response): Promise<Response> => {

    const queryCategory: string = req.query.category as string || null;

    try { 
        let questions; 
        if ( queryCategory ) { 
            questions = await Question.find({ category: queryCategory }).limit(5);
        } else {
            questions = await Question.aggregate([{ $sample : { size: 5}}])
        }

        if (req.user_id) {
            const token = generateToken(req.user_id);
            return res.status(200).json({ questions: questions, token: token });

        } else {
        return res.status(200).json({ questions: questions })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(404).json({ message: error || 'An error occurred'})
    }
};

const QuestionController = {
    createQuiz: createQuiz,
};


export { QuestionController };