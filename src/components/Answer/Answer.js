import { getAllQuestions, saveQuestion } from "../Utils/apiInterface";
import { buildAnswerForm, attachAnswerFormListener } from "./AnswerForm";
import { buildAnswerFragments } from "./AnswerFragments";

const Answer = async (qid) => {
	const answerParent = document.getElementById('main');

	if(!answerParent || !qid) return; 

	const getAnswerFrag = await buildAnswerFragments(qid);

	answerParent.appendChild(getAnswerFrag);
	answerParent.appendChild(buildAnswerForm(qid));

	attachAnswerFormListener();

};

export default Answer;
