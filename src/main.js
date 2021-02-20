// import 'regenerator-runtime/runtime';

import App from './App';

const app = async () => {
  document.getElementById('app').appendChild(await App());
};
// Load app
app();
