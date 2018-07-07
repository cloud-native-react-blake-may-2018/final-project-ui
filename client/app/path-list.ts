import axios from 'axios'

const authAxios = axios.create()
authAxios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.token
  return config
})

const addQuestionUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question'

const batchAddQuestionsUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question/batch'

const editQuestionUrl = ''

const addQuizUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz'

const addJunctionUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/'

const displayQuizzesURL =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/author/'

const displayQuizQuestionsURL =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/'

const displayQuizTagsURL =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/uuid/'

const editQuizUrl = ''

const deleteQuizUrl = ''

export default {
  create: {
    addQuestion: newQuestion =>
      axios.post(addQuestionUrl, newQuestion).then(res => res.data),
    addQuiz: newQuiz => axios.post(addQuizUrl, newQuiz).then(res => res.data),
    batchAddQuestion: newQuestions =>
      axios.post(batchAddQuestionsUrl, newQuestions).then(res => res.data),
    addJunction: (quizID, questionID) =>
      axios
        .post(`${addJunctionUrl}/${quizID}/${questionID}`, quizID, questionID)
        .then(res => res.data)
  },

  quizzes: {
    edit: quiz => axios.post(editQuizUrl, { quiz }).then(res => res.data),
    delete: quiz => axios.post(deleteQuizUrl, { quiz }).then(res => res.data),
    display: author =>
      axios.get(displayQuizzesURL + author).then(res => res.data)
  },

  questions: {
    edit: question =>
      axios.post(editQuestionUrl, { question }).then(res => res.data),
    display: quizUUID =>
      axios.get(displayQuizQuestionsURL + quizUUID).then(res => res.data),
    displayTags: quizUUID =>
      axios.get(displayQuizTagsURL + quizUUID).then(res => res.data)
  }
}
