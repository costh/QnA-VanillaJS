import { DexieDatabase } from "../DataBase/dexie";

export const getAllQuestions = async () => {
    const getQuestionsArray = await DexieDatabase.getAllQuestions()

    return getQuestionsArray || [];
}

export const getQuestion = async (qId) => {
    const getQuestionArray = await DexieDatabase.getQuestion(qId)

    return getQuestionArray || [];
}

export const getAnswers = async (qId) => {
    const getAnswersArray = await DexieDatabase.getAllAnswersforQuestion(qId);

    return getAnswersArray || {};
}

export const saveQuestion = async (title, content, firstName, lastName) => {
    DexieDatabase.addQuestion(title, content, firstName, lastName)
}

export const saveAnswer = async (qId, content, firstName, lastName) => {
    DexieDatabase.addAnswer(qId, content, firstName, lastName)
}