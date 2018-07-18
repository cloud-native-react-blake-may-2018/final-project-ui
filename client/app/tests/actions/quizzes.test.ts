import React, { Component } from 'react'
import { editQuiz } from '../../actions/quizzes'

test('should test search action', () => {
  const quiz = {
    quizID: '2341241242124124',
    question: 'quiz-question'
  }
  const action = editQuiz(quiz)

  expect(action).toEqual({
    type: 'EDIT_QUIZ',
    quiz
  })
})
