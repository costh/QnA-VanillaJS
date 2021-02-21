import {  } from "../Utils/apiInterface";
import { getAnswers } from "../Utils/apiInterface";

export const buildAnswerFragments = async (qid) => {
	if(!qid) {
		return;
	}
	const answerFragment = new DocumentFragment();

	const answersObject = await getAnswers(qid);

	const question = answersObject.question;

	const answers = answersObject.answers;

	const template = document.createElement('template');

	template.innerHTML = `
	  <article class="card">
	  	<div class="card-body">
		  <h1 class="card-title"> ${question.title} </h1>
		  <span>Posted by  ${question.firstName} ${question.lastName} </span>
		  <p class="card-text"> ${question.content} </h1>
		  <span> ${question.firstName} ${question.lastName} </span>
		  <span> ${question.timeStamp} </span>
		</div>
	  </article>
	  <div id="answersContainer">

	  <div>
	`
	answerFragment.appendChild(template.content.cloneNode(true));

	const answerContainer = answerFragment.getElementById("answersContainer");

	answers.forEach(answers => {
		const template = document.createElement('template')
		template.innerHTML = `
		  <article class="answer">
			  <p> ${answers.content} </h1>
			  <span> ${answers.firstName} ${answers.lastName} </span>
			  <span> ${answers.timeStamp} </span>
		  </article>
		`
		answerContainer.appendChild(template.content.cloneNode(true));
	});


	return answerFragment;
}