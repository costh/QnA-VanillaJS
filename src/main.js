// import 'regenerator-runtime/runtime';
import App from './App';
import Navigo from "navigo";

const router = new Navigo("/");

App();

router.on("/question/:id", (match) => {
  document.getElementById("app").innerHTML = `<pre>${JSON.stringify(
    match,
    null,
    2
  )}</pre>`;
});

// Load app
