import { DexieDatabase } from "../DataBase/dexie";

export const getAllQuestions = async () => {
    const getQuestionsArray = await DexieDatabase.getAllQuestions()

    return getQuestionsArray || [];
}

export const getAnswers = async (qId) => {
    return await DexieDatabase.getAllAnswers(qId);
}

export const saveQuestion = async (title, content, firstName, lastName) => {
    DexieDatabase.addQuestion(title, content, firstName, lastName)
}

export const saveAnswer = async (qId) => {

}