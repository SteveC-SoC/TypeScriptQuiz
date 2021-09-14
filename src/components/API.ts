import { shuffleArray } from "./Utils";

export type Question = {
    catagoty: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] };


export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const fetchQuizQuestions = async (
    amount: number,
    difficulty: Difficulty
    ) => {
    console.log('made it to the fetch')
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => (
        {
           ...question,
           answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ))
}