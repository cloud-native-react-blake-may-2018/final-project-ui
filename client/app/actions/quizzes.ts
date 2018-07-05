import React from 'react'
import api from '../path-list'

export const startEditQuiz = quiz => dispatch =>
  api.quizzes.edit(quiz).then(quiz => dispatch(editQuiz(quiz)))

export const editQuiz = quiz => ({
  type: 'EDIT_QUIZ',
  quiz
})
