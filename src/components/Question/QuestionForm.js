import { saveQuestion } from "../Utils/apiInterface";

export const buildQuestionForm = (questionParent) => {
	const template = document.createElement('template')
	template.innerHTML = `
	<form id="questionForm" action="" method="get" class="row g-3">
		<div class="col-md-6">
			<label class="form-label" for="firstName">Enter your firstname: </label>
			<input class="form-control" type="text" name="firstName" id="name" required>
		</div>
		<div class="col-md-6">
			<label class="form-label" for="lastName">Enter your lastName: </label>
			<input class="form-control" type="text" name="lastName" required>
		</div>
		<div class="col-md-8">
			<label class="form-label" for="title">Title: </label>
			<input class="form-control" type="text" name="title" required>
		</div>
		<div class="col-md-8">
			<label class="form-label" for="content">Content: </label>
			<textarea class="form-control" cols="80" rows ="5" name="content" required></textarea>
		</div>
		<div class="">
			<input class="btn btn-primary" type="submit" value="Ask Question!">
		</div>
	</form>
	`
	return template.content.cloneNode(true);
}

export const attachQuestionFormListener = () => {
	document.getElementById("questionForm").addEventListener('submit', questionFormSubmit);
}

const questionFormSubmit = async (event) => {
	event.preventDefault();
	const formItems = event.target.elements;
	const form = event.target;
	try {
		await saveQuestion (
		formItems['title']?.value, 
		formItems['content']?.value, 
		formItems['firstName']?.value,
		formItems['lastName']?.value)

		// Send Toast of sucess
		// Re-render new element or All?
		form.reset() // Clear values
	}catch(e) {
		console.log(e)
	}
}
