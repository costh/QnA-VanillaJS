// import 'regenerator-runtime/runtime';
import App from './App';
import Navigo from "navigo";
import Question from './components/Question/Question';
import Answer from './components/Answer/Answer';


const router = new Navigo("/");
App();

router.on("/question/:id", (match) => {
  const id = match?.data?.id;
  if(id){
    Answer(id);
  }else{
    router.navigate('/');
  }
});

router.on('*', (match) => {
  router.navigate('/');
  Question();
})

router.resolve();

// Load app
