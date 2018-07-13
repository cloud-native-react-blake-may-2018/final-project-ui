import axios from 'axios'
import { authInterceptor } from '../app/interceptors/auth.interceptor'
// const authAxios = axios.create();
// authAxios.interceptors.request.use(config => {
//   config.headers.Authorization = localStorage.token;
//   return config;
// });

const addQuestionUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question'

const batchAddQuestionsUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question/batch'

const editQuestionUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question/edit'

const addQuizUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz'

const addJunctionUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz'

const displayQuizzesURL =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/author/'

const displayQuizQuestionsURL =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/'

const displayQuizTagsURL =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/uuid/'

const editQuizUrl = ''

const deleteQuizUrl = ''

const searchByAuthorUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/author/'

const searchByTagUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/tag/'

const searchByUuidUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/'

const getQuizAttempt =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/'

const sendQuizAttempt =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/'

const deleteQuestionUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question/author'

// const deleteJunctionUrl = // this is done automatically in deleteQuestion
//   "https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz";

const addTagsToQuestionsUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question/batch/tag'

const addTagsToQuizUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/tag/batch'

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
        .then(res => res.data),

    addTagsToQuestions: arrOfPairs =>
      axios.post(addTagsToQuestionsUrl, arrOfPairs).then(res => res.data),

    addTagsToQuiz: (quizID, tags) =>
      axios
        .post(addTagsToQuizUrl, { quizUUID: quizID, tags: tags })
        .then(res => res.data)
  },

  quizzes: {
    edit: quiz => axios.post(editQuizUrl, quiz).then(res => res.data),

    delete: quiz => axios.post(deleteQuizUrl, quiz).then(res => res.data),

    display: author =>
      axios.get(displayQuizzesURL + author).then(res => res.data),

    searchByAuthor: author =>
      axios.get(searchByAuthorUrl + author).then(res => res.data),

    searchByTag: tag => axios.get(searchByTagUrl + tag).then(res => res.data),

    searchByUuid: uuid =>
      axios.get(searchByUuidUrl + uuid).then(res => res.data),

    startQuizAttempt: (quizUUID, username) =>
      authInterceptor
        .get(`${getQuizAttempt}${quizUUID}/user/${username}`)
        .then(res => res.data),

    submitQuizAttempt: (quizUUID, user, attemptUUID, answerArray) =>
      axios
        .post(
          `${sendQuizAttempt}${quizUUID}/user/${user}/attempt/${attemptUUID}`,
          answerArray
        )
        .then(res => res.data)
  },

  questions: {
    edit: question =>
      axios.post(editQuestionUrl, question).then(res => res.data),

    display: quizUUID =>
      axios.get(displayQuizQuestionsURL + quizUUID).then(res => res.data),

    displayTags: quizUUID =>
      axios.get(displayQuizTagsURL + quizUUID).then(res => res.data),

    deleteQuestion: (author, title) =>
      axios
        .delete(`${deleteQuestionUrl}/${author}/title`, { data: { title } })
        .then(res => res.data)

    // deleteJunction: (quizUUID, questionUUID) =>
    //   axios
    //     .delete(`${deleteJunctionUrl}/${quizUUID}/question/${questionUUID}`)
    //     .then(res => res.data)
  }
}
