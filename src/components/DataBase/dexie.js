let { Dexie } = require('dexie');

const getAnswerObject = (id, content, firstName, lastName) => {
  return { 
    questionId: id,
    content: content, 
    firstName: firstName,  
    lastName: lastName, 
    timeStamp: new Date() 
  }
}

const getQuestionObj = (title, content, firstName, lastName) => {
  return { 
    title: title,
    content: content,
    firstName: firstName,  
    lastName: lastName, 
    timeStamp: new Date() 
  }
}

class Database extends Dexie {
  constructor() {
    super('QnADB');
  }

  async init() {
    this.version(1).stores({
      questions: '++id,title, content,firstName,lastName,timeStamp',
      answers: '++id, questionId, title, content, firstName, lastName, timeStamp'
    });
    
    this.questions = this.table('questions');
    this.answers = this.table('answers');

    await this.addMockData();
  }

  async addMockData(){
    //opening IXDB readwrite transaction to the question table, .add returns a promise
    const questionTableCount = await this.questions.count();
    if(questionTableCount >= 1) return;

    this.questions.add(getQuestionObj("Hello World", "Why is the earth round?", "Hayden", "Costa"));
    this.answers.add(getAnswerObject(1,"Random answer here", "Max", "Loch"))
    this.answers.add(getAnswerObject(1,"this is a really cool question", "Matt", "Jenkins"))

    this.questions.add(getQuestionObj("My second Question", "Why is the earth square?", "Lynod", "Verse"));
    this.answers.add(getAnswerObject(2, "My Content lalalala", "Max", "Loch"));
    this.answers.add(getAnswerObject(2,"This is not a great question", "Matt", "Jenkins"));
  }

  async addQuestion(title='', message = '', firstName = '', lastName = '') {
    return this.questions.add(getQuestionObj(title, message, firstName, lastName));
  }

  async addAnswer(questionId, message, firstName, lastName) {
    const qid = parseInt(questionId);
    const isQuestionAvailable = await this.questions.get(qid);

    if(isQuestionAvailable) {
      return this.answers.add(getAnswerObject(qid, message, firstName, lastName));
    }
  }

  async getAllQuestions() {
    return this.questions.orderBy('timeStamp').reverse().toArray();
  }

  async getAllAnswersforQuestion(id) {
    const getQuestion = await this.questions.get(parseInt(id));
    const getAnswer = await this.answers.where({"questionId":parseInt(id)}).toArray();

    return {
      question: getQuestion,
      answers: getAnswer
    }
  }

}


export const DexieDatabase = new Database(); 
