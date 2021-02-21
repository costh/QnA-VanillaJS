let { Dexie } = require('dexie');

const getAnswerObject = (id, title, content, firstName, lastName) => {
  return { 
    questionId: id,
    title: title,
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

    this.questions.add(getQuestionObj("My First Question", "Why is the earth round?", "Hayden", "Costa"));
    this.answers.add(getAnswerObject(1,"My Content", "My Content lalalala", "Max", "Loch"))
    this.answers.add(getAnswerObject(1,"My Content2", "My Content hsjkadhkjsa", "Matt", "Jenkins"))

    this.questions.add(getQuestionObj("My second Question 2", "Why is the earth square?", "Lynod", "Verse"));
    this.answers.add(getAnswerObject(2,"Hello", "My Content lalalala", "Max", "Loch"))
    this.answers.add(getAnswerObject(2,"My friend", "My Content hsjkadhkjsa", "Matt", "Jenkins"))
  }

  async addQuestion(title='', message = '', firstName = '', lastName = '') {
    return this.questions.add(getQuestionObj(title, message, firstName, lastName));
  }

  async addAnswer(questionId, title, message, firstName, lastName) {
    const isQuestionAvailable = await this.questions.get(questionId);

    if(isQuestionAvailable) {
      return this.answers.add(getAnswerObject(questionId, title, message, firstName, lastName));
    }
  }

  async getAllQuestions() {
    return this.questions.orderBy('timeStamp').reverse().toArray();
  }

  async getAllAnswers(id) {
    // TODO: return a promise, can just return the answers instead
    return this.answers.where({questionId:id}).toArray();
  }

}


export const DexieDatabase = new Database(); 
