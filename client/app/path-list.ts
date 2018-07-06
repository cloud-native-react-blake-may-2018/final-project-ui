import axios from 'axios'

const authAxios = axios.create()
authAxios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.token
  return config
})

const addQuestionUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question'

const editQuestionUrl = ''

const addQuizUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz'

const displayQuizzes =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/author/'

const editQuizUrl = ''

const deleteQuizUrl = ''

export default {
  create: {
    addQuestion: newQuestion =>
      axios.post(addQuestionUrl, newQuestion).then(res => res.data),
    addQuiz: newQuiz => axios.post(addQuizUrl, newQuiz).then(res => res.data)
  },

  quizzes: {
    edit: quiz => axios.post(editQuizUrl, { quiz }).then(res => res.data),
    delete: quiz => axios.post(deleteQuizUrl, { quiz }).then(res => res.data),
    display: author => axios.get(displayQuizzes + author).then(res => res.data)
  },

  questions: {
    edit: question =>
      axios.post(editQuestionUrl, { question }).then(res => res.data)
  }
}
