// import 'regenerator-runtime/runtime';
import App from './App';
import Navigo from "navigo";
import Question from './components/Question/Question';
import Answer from './components/Answer/Answer';


const router = new Navigo("/");

router.on("/question/:id", async (match) => {
  const id = match?.data?.id;
  if(id){
    await App();
    Answer(id);
  }else{
    router.navigate(`${(process.env.BASE_PUBLIC || '/')}`);
  }
});

router.on('*',async () => {
  router.navigate(`${process.env.BASE_PUBLIC || '/'}`);
  await App();
  Question();
})

router.resolve();

// Load app
