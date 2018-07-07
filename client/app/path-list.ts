import axios from "axios";

const authAxios = axios.create();
authAxios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.token;
  return config;
});

const addQuestionUrl =
  "https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question";

const batchAddQuestionsUrl =
  "https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question/batch";

const addQuizUrl =
  "https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz";

const addJunctionUrl =
  "https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz";

export default {
  create: {
    addQuestion: newQuestion =>
      axios.post(addQuestionUrl, newQuestion).then(res => res.data),
    addQuiz: newQuiz => axios.post(addQuizUrl, newQuiz).then(res => res.data),
    batchAddQuestion: newQuestions =>
      axios.post(batchAddQuestionsUrl, newQuestions).then(res => res.data),
    addJunction: (quizID, questionIDs) =>
      axios
        .post(`${addJunctionUrl}/${quizID}/batch`, questionIDs)
        .then(res => res.data)
  }
};
