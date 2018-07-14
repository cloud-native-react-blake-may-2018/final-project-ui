import axios from 'axios'
import { authInterceptor } from '../app/interceptors/auth.interceptor'
// const authAxios = axios.create();
// authAxios.interceptors.request.use(config => {
//   config.headers.Authorization = localStorage.token;
//   return config;
// });

const baseUrl = 'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/'

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

const displayQuizAttemptsURL =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quizAttempt/user/'

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

const addTagsToSingleQuestionUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/question/tag/batch'

const addTagsToQuizUrl =
  'https://eyc3l7k6w1.execute-api.us-east-2.amazonaws.com/dev/quiz/tag/batch'

export default {
  create: {
    addQuestion: newQuestion =>
      authInterceptor.post(addQuestionUrl, newQuestion).then(res => res.data),

    addQuiz: newQuiz =>
      authInterceptor.post(addQuizUrl, newQuiz).then(res => res.data),

    batchAddQuestion: newQuestions =>
      authInterceptor
        .post(batchAddQuestionsUrl, newQuestions)
        .then(res => res.data),

    addJunction: (quizID, questionIDs) =>
      authInterceptor
        .post(`${addJunctionUrl}/${quizID}/batch`, questionIDs)
        .then(res => res.data),

    addTagsToQuestions: arrOfPairs =>
      authInterceptor
        .post(addTagsToQuestionsUrl, arrOfPairs)
        .then(res => res.data),

    addTagsToQuiz: (quizID, tags) =>
      authInterceptor
        .post(addTagsToQuizUrl, { quizUUID: quizID, tags: tags })
        .then(res => res.data)
  },

  quizzes: {
    edit: quiz => authInterceptor.post(editQuizUrl, quiz).then(res => res.data),

    delete: quiz =>
      authInterceptor.post(deleteQuizUrl, quiz).then(res => res.data),

    display: author =>
      authInterceptor.get(displayQuizzesURL + author).then(res => res.data),

    displayQuizAttempts: user =>
      authInterceptor.get(displayQuizAttemptsURL + user).then(res => res.data),

    searchByAuthor: author =>
      authInterceptor.get(searchByAuthorUrl + author).then(res => res.data),

    searchByTag: tag =>
      authInterceptor.get(searchByTagUrl + tag).then(res => res.data),

    searchByUuid: uuid =>
      authInterceptor.get(searchByUuidUrl + uuid).then(res => res.data),

    getForeignQuiz: quiz =>
      authInterceptor
        .get(`${baseUrl}quiz/${quiz.uuid}/user/${quiz.username}`)
        .then(res => res.data),

    startQuizAttempt: (quizUUID, username) =>
      authInterceptor
        .get(`${getQuizAttempt}${quizUUID}/user/${username}`)
        .then(res => res.data),

    submitQuizAttempt: (quizUUID, user, attemptUUID, answerArray) =>
      authInterceptor
        .post(
          `${sendQuizAttempt}${quizUUID}/user/${user}/attempt/${attemptUUID}`,
          answerArray
        )
        .then(res => res.data)
  },

  questions: {
    addNewTags: tags =>
      authInterceptor
        .post(addTagsToSingleQuestionUrl, tags)
        .then(res => res.data),

    edit: question =>
      authInterceptor.post(editQuestionUrl, question).then(res => res.data),

    display: quizUUID =>
      authInterceptor
        .get(displayQuizQuestionsURL + quizUUID)
        .then(res => res.data),

    displayTags: quizUUID =>
      authInterceptor.get(displayQuizTagsURL + quizUUID).then(res => res.data),

    deleteQuestion: (author, title) =>
      authInterceptor
        .delete(`${deleteQuestionUrl}/${author}/title`, { data: { title } })
        .then(res => res.data)

    // deleteJunction: (quizUUID, questionUUID) =>
    //   axios
    //     .delete(`${deleteJunctionUrl}/${quizUUID}/question/${questionUUID}`)
    //     .then(res => res.data)
  }
}
