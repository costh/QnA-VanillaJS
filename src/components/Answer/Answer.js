
import { buildAnswerForm, attachAnswerFormListener } from "./AnswerForm";
import { buildQuestionFragment, buildAnswerFragment } from "./AnswerFragments";
import { getAnswers } from "../Utils/apiInterface";


const Answer = async (qid) => {
	const answerParent = document.getElementById('main');

	if(!answerParent || !qid) return; 

	const answersObj = await getAnswers(qid);

	const question = answersObj.question;
	const answersArr = answersObj.answers;

	const getQuestionFrag = await buildQuestionFragment(question);

	answerParent.appendChild(getQuestionFrag);
	answerParent.appendChild(buildAnswerForm(qid));
	
	buildAnswerFragment(answersArr);
	attachAnswerFormListener();

};

export const reRenderAnswers = async (qid) => {
	const answersObj = await getAnswers(qid);
	const answersArr = answersObj.answers;
	buildAnswerFragment(answersArr);
}

export default Answer;	
