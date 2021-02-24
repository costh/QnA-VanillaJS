export const buildQuestionsFragments = async (questionsArr) => {

	const questionFragment = new DocumentFragment();

	questionsArr.forEach(question => {
		const template = document.createElement('template')
        template.innerHTML = `
        <div class="col-xs col-lg-6">
            <article class="card">
                <div class="card-body">
                        <a class="text-reset" href="${process.env.BASE_ABSOLUTE_PUBLIC || '/'}question/${question.id}" data-navigo> 
                            <h1 class="card-title display-6"> 
                                ${question.title}
                            </h1>
                        </a>
                        <p class="card-text text-truncate">
                            ${question.content} 
                        </p>
                        <div class="divider">
                            <div class="d-flex w-80 justify-content-between">
                                <small class="text-muted"> ${question.firstName} ${question.lastName}</small>
                                <small class="text-muted">${new Date(question.timeStamp).toLocaleString()}</small>
                             </div>
                        </div>
                    </div>
            </article>
        </div>
		`
		questionFragment.appendChild(template.content.cloneNode(true));
	});

	if(questionsArr.length === 0) {
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