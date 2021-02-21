import { getAllQuestions, saveQuestion } from "../Utils/apiInterface";
import { buildQuestionForm, attachQuestionFormListener } from "./QuestionForm";
import { buildQuestionsFragments } from "./QuestionFragments";

const Question = async () => {
	const questionParent = document.getElementById('main');

	if(!questionParent) return; 

	const getQuestionFrag = await buildQuestionsFragments();

	questionParent.appendChild(getQuestionFrag);
	questionParent.appendChild(buildQuestionForm());

	attachQuestionFormListener();

};

export default Question;
