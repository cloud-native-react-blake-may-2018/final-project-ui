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
