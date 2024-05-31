import { Question } from '../models/questionModel';
import { Request, Response } from 'express';
// import { generateToken } from "middleware/token";

interface CustomRequest extends Request {
    user_id?: string;
}
const createQuiz = async (req: CustomRequest, res: Response): Promise<Response> => {
    
    try { 
        const queryCategory: string = req.body.category;
        const questions = await Question.find({ category: queryCategory }).limit(5);
        return res.status(200).json({ questions: questions })
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