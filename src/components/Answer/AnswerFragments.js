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
			<span>Posted by  ${question.firstName} ${question.lastName} on 		 
			 <span class="text-muted"> ${ new Date(question.timeStamp).toLocaleDateString()} </span>
		  </span>
		  <p class="card-text"> ${question.content} </h1>
		</div>
	  </article>
	  <div id="answersContainer" class="list-group">

	  <div>
	`
	answerFragment.appendChild(template.content.cloneNode(true));

	const answerContainer = answerFragment.getElementById("answersContainer");

	answers.forEach(answers => {
		const tpl = document.createElement('template')
		tpl.innerHTML = `
		  <article class="list-group-item ">
			<p class="mb-1">${answers.content}</p>
			<div class="d-flex w-80 justify-content-between">
				<small class="text-muted"> ${answers.firstName} ${answers.lastName}</small>
				<small class="text-muted">${new Date(answers.timeStamp).toLocaleDateString()}</small>
			</div>
		  </article>
		`
		answerContainer.appendChild(tpl.content.cloneNode(true));
	});


	return answerFragment;
}