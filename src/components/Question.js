import { getAllQuestions, saveQuestion } from "./Utils/apiInterface";

const buildQuestionForm = (questionParent) => {
	const template = document.createElement('template')
	template.innerHTML = `
	<form id="questionForm" action="" method="get" class="">
		<div class="">
			<label for="firstName">Enter your firstname: </label>
			<input type="text" name="firstName" id="name" required>
		</div>
		<div class="">
			<label for="lastName">Enter your lastName: </label>
			<input type="text" name="lastName" required>
		</div>
		<div class="">
			<label for="title">Title: </label>
			<input type="text" name="title" required>
		</div>
		<div class="">
			<label for="content">Content: </label>
			<textarea class="text" cols="80" rows ="20" name="content" required></textarea>
		</div>
		<div class="">
			<input type="submit" value="Ask Question!">
		</div>
	</form>
	`
	return template.content.cloneNode(true);
}

const attachQuestionFormListener = () => {
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
	}catch {

	}
}

const buildQuestionsFromApi = async () => {
	const questionsArray = await getAllQuestions()

	const questionFragment = new DocumentFragment();

	questionsArray.forEach(question => {
		const template = document.createElement('template')
		template.innerHTML = `
		  <article class="container">
			  <h1> ${question.title} </h1>
			  <p> ${question.content} </h1>
			  <span> ${question.firstName} ${question.lastName} </span>
			  <span> ${question.timeStamp} </span>
		  </article>
		`
		questionFragment.appendChild(template.content.cloneNode(true));
	});

	if(questionsArray.length === 0) {
		const template = document.createElement('template')
		template.innerHTML = `
		  <article class="container">
			  <span> No Questions have been asked yet </span>
		  </article>
		`
		questionFragment.appendChild(template.content.cloneNode(true));
	}

	return questionFragment;
}

const Question = async () => {
	const questionParent = document.getElementById('question');

	if(!questionParent) return; 

	questionParent.appendChild(buildQuestionsFromApi());
	questionParent.appendChild(buildQuestionForm());

	attachQuestionFormListener();
};

export default Question;
