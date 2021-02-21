import { saveAnswer } from "../Utils/apiInterface";

export const buildAnswerForm = (questionId) => {
	const template = document.createElement('template')
	template.innerHTML = `
	<form id="answerForm" action="" method="get" class="">
		<input name="questionId" value="${questionId}" type="hidden">
		<div class="">
			<label for="firstName">Enter your firstname: </label>
			<input type="text" name="firstName" id="name" required>
		</div>
		<div class="">
			<label for="lastName">Enter your lastName: </label>
			<input type="text" name="lastName" required>
		</div>
		<div class="">
			<label for="content">Content: </label>
			<textarea class="text" cols="80" rows ="20" name="content" required></textarea>
		</div>
		<div class="">
			<input type="submit" value="Post your Answer!">
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
	console.log("coming in here")
	try {
		await saveAnswer (
		formItems['questionId']?.value,
		formItems['content']?.value, 
		formItems['firstName']?.value,
		formItems['lastName']?.value
		)

		// Send Toast of sucess
		// Re-render new element or All?
		form.reset() // Clear values
	}catch(e) {
		console.log(e)
	}
}
