import { getAllQuestions } from "../Utils/apiInterface";

export const buildQuestionsFragments = async (questionsArr) => {

	const questionFragment = new DocumentFragment();

	questionsArr.forEach(question => {
		const template = document.createElement('template')
        template.innerHTML = `
        <div class="col-xs col-lg-6">
            <article class="card">
                <div class="card-body">
                        <a class="" href="/question/${question.id}" data-navigo> 
                            <h1 class="card-title"> 
                                ${question.title}
                            </h1>
                        </a>
                        <p class="card-text">
                            ${question.content} 
                        </p>
                        <div class="">
                            <div class="">
                                ${new Date(question.timeStamp).toLocaleDateString()} 
                            </div>
                            <div class="">
                                <div class="">
                                    Posted by ${question.firstName} ${question.lastName}
                                </div>
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