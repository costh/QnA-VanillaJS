import Header from './components/Header'
import { getAllQuestions, getAnswers } from './components/Utils/apiInterface';
import { DexieDatabase } from './components/DataBase/dexie';
import Question from './components/Question';


async function appInit() {
  await DexieDatabase.init();

  const template = document.createElement('template')
  template.innerHTML = `
    <div class="container">
      ${Header()}
    </div>
  `
  document.getElementById('header')?.appendChild(template.content.cloneNode(true));

}

async function App() {
  await appInit();
  Question();
}

export default App;