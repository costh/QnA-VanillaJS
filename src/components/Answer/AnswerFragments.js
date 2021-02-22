
export const buildQuestionFragment = async (question) => {
	if(!question) return;
	const answerDocFrag = new DocumentFragment();

	const template = document.createElement('template');

	template.innerHTML = `
	  <article class="card">
	  	<div class="card-body">
			<h1 class="card-title display-3"> ${question.title} </h1>
			  
			<div class="d-flex w-80">
		 	 <span> ${question.firstName} ${question.lastName}, <small class="text-muted">${new Date(question.timeStamp).toLocaleString() }</small> </span>
			</div>

		   <p class="card-text pt-4"> ${question.content} </p>
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
	const tpl = document.createElement('template')

	tpl.innerHTML = `<span class="h5"> ${answerArray.length} Answer${ (answerArray.length === 1) ? '' : 's'} </span>`
	answerDocFrag.appendChild(tpl.content.cloneNode(true));

	answerArray.forEach(answers => {
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