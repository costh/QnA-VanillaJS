import Header from './components/Header'
import { DexieDatabase } from './components/DataBase/dexie';

async function appInit() {
  await DexieDatabase.init();

  const template = document.createElement('template')
  template.innerHTML = `
    <div>
      ${Header()}
    </div>
  `
  document.getElementById('header')?.appendChild(template.content.cloneNode(true));

}

async function App() {
  await appInit();
}

export default App;