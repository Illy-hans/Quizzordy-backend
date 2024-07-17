import { Question } from '../models/questionModel';
import { connectToDatabase, closeDatabaseConnection } from '../config/db_connection';
import axios, { AxiosResponse } from 'axios';
import he from 'he';

const addQuestions = async (category: string): Promise<void> => {

        const options = {
            method: 'GET',
            url: `https://opentdb.com/api.php?amount=20&category=${category}&difficulty=easy&type=multiple`,
        };

        try {
            const response: AxiosResponse = await axios.request(options);
            console.log(response.data.response_code)
            const questions = response.data.results.map((q: any) => ({
                question: he.decode(q.question),
                category: q.category,
                correct_answer: he.decode(q.correct_answer),
                incorrect_answers: q.incorrect_answers.map((answer: string) => he.decode(answer)),
            }));

            await Question.insertMany(questions);
            console.log(`Added ${questions.length} questions for category: ${category}`);
        } catch (error) {
            console.error(`Error fetching questions for category ${category}:`, error.message);
        }
};


const runScript = async (): Promise<void> => {
    try {
        await connectToDatabase();
        const category = '27'; 
        await addQuestions(category);

    } catch (error) {
        console.error("Error during database operations:", error);
    } finally {
        await closeDatabaseConnection();
    }
};

runScript();

// List of categories with corresponding IDs in project:

// "id": 9,
// "name": "General Knowledge"

// "id": 11,
// "name": "Entertainment: Film"

// "id": 14,
// "name": "Entertainment: Television"

// "id": 23,
// "name": "History"






