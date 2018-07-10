import React from 'react'
import pathList from '../path-list'

export const startEditQuiz = quiz => dispatch =>
  pathList.quizzes.edit(quiz).then(quiz => dispatch(editQuiz(quiz)))

export const editQuiz = quiz => ({
  type: 'EDIT_QUIZ',
  quiz
})

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

export const startAddAnswerToArray = answerObj => dispatch =>
  dispatch(addAnswerToArray(answerObj))

export const addAnswerToArray = answerObj => ({
  type: 'ADD_ANSWER_TO_OBJECT',
  answerObj
})

export const changeQuestionNumber = questionNumber => dispatch =>
  dispatch(startChangeQuestionNumber(questionNumber))

export const startChangeQuestionNumber = questionNumber => ({
  type: 'CHANGE_QUESTION_NUMBER',
  questionNumber
})
