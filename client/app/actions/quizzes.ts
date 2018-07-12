import React from 'react'
import pathList from '../path-list'

export const startEditQuiz = quiz => dispatch =>
  pathList.quizzes.edit(quiz).then(quiz => dispatch(editQuiz(quiz)))

export const editQuiz = quiz => ({
  type: 'EDIT_QUIZ',
  quiz
})

export const editStoreQuiz = quizzes => dispatch => {
  return dispatch({
    type: 'EDIT_STORE_QUIZ',
    quizzes
  })
}

export const startGetUserQuizzes = author => async dispatch =>
  pathList.quizzes.display(author).then(async quizzes => {
    const all = await Promise.all(
      quizzes.map(async quiz => {
        const questions = await pathList.questions.display(quiz.uuid)
        const tags = await pathList.questions.displayTags(quiz.uuid)

        // will contain quiz details, its questions, and its tags
        return { ...quiz, questions, tags }
      })
    )
    dispatch(getUserQuizzes(all))
  })

export const getUserQuizzes = quizzes => ({
  type: 'ALL_QUIZZES',
  quizzes
})

export const startGetSearchedQuiz = uuid => async dispatch =>
  pathList.quizzes.searchByUuid(uuid).then(async meta => {
    const questions = await pathList.questions.display(meta.uuid)
    const tags = await pathList.questions.displayTags(meta.uuid)

    // will contain quiz details, its questions, and its tags
    const quiz = { ...meta, questions, tags }
    dispatch(getSearchedQuiz(quiz))
  })

export const getSearchedQuiz = quiz => ({
  type: 'SEARCHED_QUIZ',
  quiz
})

export const startDisplayQuizQuestions = quizUUID => dispatch =>
  pathList.questions
    .display(quizUUID)
    .then(questions => dispatch(displayQuizQuestions(questions)))

export const displayQuizQuestions = questions => ({
  type: 'DISPLAY_QUIZ_QUESTIONS',
  questions
})

export const startDisplayQuizTags = quizUUID => dispatch =>
  pathList.questions
    .displayTags(quizUUID)
    .then(tags => dispatch(displayQuizTags(tags)))

export const displayQuizTags = tags => ({
  type: 'DISPLAY_QUIZ_TAGS',
  tags
})
export const startUpdateQuestionsDisplay = clickedQuestion => dispatch =>
  dispatch(displayQuizTags(clickedQuestion))

export const UpdateQuestionsDisplay = clickedQuestion => ({
  type: 'DISPLAY_CLICKED_QUESTION',
  clickedQuestion
})

export const startAddAnswerToArray = answerObj => async dispatch =>
  await dispatch(addAnswerToArray(answerObj))

export const addAnswerToArray = answerObj => ({
  type: 'ADD_ANSWER_TO_OBJECT',
  answerObj
})

export const addMultipleSelectAnswer = answerObj => dispatch =>
  dispatch(startAddMultipleSelectAnswer(answerObj))

export const startAddMultipleSelectAnswer = answerObj => ({
  type: 'ADD_MULTIPLE_SELECT_ANSWER',
  answerObj
})
export const updateMultipleSelectAnswer = answerArray => dispatch =>
  dispatch(startUpdateMultipleSelectAnswer(answerArray))

export const startUpdateMultipleSelectAnswer = answerArray => ({
  type: 'UPDATE_MULTIPLE_SELECT_ANSWER',
  answerArray
})

export const addMultipleChoiceAnswer = answerObj => dispatch =>
  dispatch(startAddMultipleChoiceAnswer(answerObj))

export const startAddMultipleChoiceAnswer = answerObj => ({
  type: 'ADD_MULTIPLE_CHOICE_ANSWER',
  answerObj
})

export const updateAnswerArray = answerArray => dispatch =>
  dispatch(startupdateAnswerArray(answerArray))

export const startupdateAnswerArray = answer => ({
  type: 'UPDATE_ANSWER_ARRAY',
  answerArray: answer.answerArray,
  done: answer.done
})

export const changeQuestionNumber = questionNumber => dispatch =>
  dispatch(startChangeQuestionNumber(questionNumber))

export const startChangeQuestionNumber = questionNumber => ({
  type: 'CHANGE_QUESTION_NUMBER',
  questionNumber
})
export const startQuizAttempt = (
  quizUUID: any,
  username: string,
  reset: number
) => dispatch =>
  pathList.quizzes
    .startQuizAttempt(quizUUID, username)
    .then(quizAttemptInfo => dispatch(beginQuizAttempt(quizAttemptInfo, reset)))

export const beginQuizAttempt = (quizAttemptInfo, reset) => ({
  type: 'QUIZ_ATTEMPT_INFO',
  quizAttemptInfo,
  reset
})
export const submitQuizAttempt = (
  quizUUID: string,
  user: string,
  attemptUUID: string,
  answerArray: any[]
) => dispatch =>
  pathList.quizzes
    .submitQuizAttempt(quizUUID, user, attemptUUID, answerArray)
    .then(quizResults => dispatch(startSubmitQuizAttempt(quizResults)))

export const startSubmitQuizAttempt = quizResults => ({
  type: 'SUBMIT_QUIZ_ATTEMPT',
  quizResults
})

export const clearQuizAttempt = reset => dispatch =>
  dispatch(startclearQuizAttempt(reset))

export const startclearQuizAttempt = reset => ({
  type: 'CLEAR_QUIZ_ATTEMPT',
  reset
})
