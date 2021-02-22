import { getAllQuestions } from "../Utils/apiInterface";
import { buildQuestionForm, attachQuestionFormListener } from "./QuestionForm";
import { buildQuestionsFragments } from "./QuestionFragments";

const Question = async () => {
	const mainParentEl = document.getElementById('main');
	const questionsWrapper = document.createElement('div');
	questionsWrapper.setAttribute("id", "questionsWrapper");
	questionsWrapper.classList = "row gx-4 gy-4"

	const questionsArray = await getAllQuestions();
	
	if(!mainParentEl) return; 

	const getQuestionFrag = await buildQuestionsFragments(questionsArray);

	questionsWrapper.appendChild(getQuestionFrag);
	mainParentEl.appendChild(questionsWrapper);
	mainParentEl.appendChild(buildQuestionForm());

	attachQuestionFormListener();

};

export const reRenderQuestions = async () => {
 const questionsWrapper = document.getElementById("questionsWrapper");
 const questionsArray = await getAllQuestions();
 const getQuestionFrag = await buildQuestionsFragments(questionsArray);

 questionsWrapper.textContent = '';

 questionsWrapper.appendChild(getQuestionFrag);

}

export default Question;
