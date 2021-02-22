
export const buildQuestionFragment = async (question) => {
	if(!question) return;
	const answerDocFrag = new DocumentFragment();

	const template = document.createElement('template');

	template.innerHTML = `
	  <article class="card">
	  	<div class="card-body">
		  <h1 class="card-title"> ${question.title} </h1>
			<span>Posted by  ${question.firstName} ${question.lastName} on 		 
			<span class="text-muted"> ${ new Date(question.timeStamp).toLocaleDateString()} </span>
		  </span>
		  <br/>
		  <p class="card-text"> ${question.content} </h1>
		</div>
	  </article>
	  <div id="answersContainer" class="list-group">
	  <div>
	`
	answerDocFrag.appendChild(template.content.cloneNode(true));

	return answerDocFrag;
}

export const buildAnswerFragment = async (answerArray) => {
	const answerContainerEl = document.getElementById("answersContainer");
	
	const answerDocFrag = new DocumentFragment();

	answerArray.forEach(answers => {
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
		answerDocFrag.appendChild(tpl.content.cloneNode(true));
	});
	answerContainerEl.textContent = '';
	answerContainerEl.appendChild(answerDocFrag)
}