import { saveAnswer } from "../Utils/apiInterface";
import { reRenderAnswers } from "./Answer";

export const buildAnswerForm = (questionId) => {
	const template = document.createElement('template')
	template.innerHTML = `
	<form id="answerForm" action="" method="get" class="row g-3" >
		<header>
			<h1 class="h3"> Reply to this Question<h1>
		</header>
		<input name="questionId" value="${questionId}" type="hidden">
		<div class="col-md-6">
			<label class="form-label"  for="firstName">Enter your firstname: </label>
			<input class="form-control" type="text" name="firstName" id="name" required aria-required="true">
		</div>
		<div class="col-md-6">
			<label class="form-label"  for="lastName">Enter your lastName: </label>
			<input class="form-control" type="text" name="lastName" required aria-required="true">
		</div>
		<div class="col-md-10">
			<label class="form-label"  for="content">Content: </label>
			<textarea class="form-control" cols="80 rows ="5" name="content" required aria-required="true"></textarea>
		</div>
		<div class="col-md-5 pt-4">
			<input class="btn btn-primary" type="submit" value="Post your Answer!">
		</div>
	</form>
	`
	return template.content.cloneNode(true);
}

export const attachAnswerFormListener = () => {
	document.getElementById("answerForm").addEventListener('submit', answerSubmitForm);
}

const answerSubmitForm = async (event) => {
	event.preventDefault();
	const formItems = event.target.elements;
	const form = event.target;
	try {
		await saveAnswer (
		formItems['questionId']?.value,
		formItems['content']?.value, 
		formItems['firstName']?.value,
		formItems['lastName']?.value
		)

		reRenderAnswers(formItems['questionId']?.value);
		form.reset() // Clear values
	}catch(e) {
		console.error(e)
	}
}
