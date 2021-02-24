// import 'regenerator-runtime/runtime';
import App from './App';
import Navigo from "navigo";
import Question from './components/Question/Question';
import Answer from './components/Answer/Answer';

const BASE_URL = (`${process.env.BASE_PUBLIC}` || '/');

const router = new Navigo(BASE_URL);

router.on("/question/:id", async (match) => {
  const id = match?.data?.id;
  if(id){
    await App();
    Answer(id);
  }else{
    router.navigate(BASE_URL);
  }
});

router.on('*',async () => {
  router.navigate(BASE_URL);
  await App();
  Question();
})

router.resolve();

// Load app
