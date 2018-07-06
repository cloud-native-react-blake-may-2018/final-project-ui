import React from 'react'
import pathList from '../path-list'

export const startEditQuiz = quiz => dispatch =>
  pathList.quizzes.edit(quiz).then(quiz => dispatch(editQuiz(quiz)))

export const editQuiz = quiz => ({
  type: 'EDIT_QUIZ',
  quiz
})

export const startDisplayQuizzes = author => dispatch =>
  pathList.quizzes.display(author).then(quiz => dispatch(displayQuizzes(quiz)))

export const displayQuizzes = quiz => ({
  type: 'DISPLAY_QUIZZES',
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
