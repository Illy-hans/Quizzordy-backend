import { Question } from '../models/questionModel';
import { Request, Response } from 'express';
import { generateToken } from "../middleware/token";
import axios from 'axios';

interface CustomRequest extends Request {
    user_id?: string;
}
const createQuiz = async (req: CustomRequest, res: Response): Promise<Response> => {

    const queryCategory: string = req.body.category || null;

    try { 
        let questions; 
            if ( queryCategory ) { 
                questions = await Question.find({ queryCategory }).limit(5);
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

// const getQuestions = async (req: Request, res: Response): Promise<Response> => {

//     const options = {
//         method: 'GET', 
//         url: 'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple',
//     };

//     try {
//         const response = await axios.request(options);
//         console.log("Data received:", response.data);
//         return res.status(200).json(response.data); 

//     } catch (error) {
//         if (error.response) {
//             console.error(`HTTP error: ${error.response.status}`);
//             return res.status(error.response.status).json({ error: `HTTP error: ${error.response.status}` });
//         } else if (error.request) {
//             console.error("Request error: No response received");
//             return res.status(500).json({ error: "Request error: No response received" });
//         } else {
//             console.error("Error:", error.message);
//             return res.status(500).json({ error: error.message });
//         }
//     }
// };


const QuestionController = {
    createQuiz: createQuiz,
};


export { QuestionController };