import React from 'react'
import pathList from '../path-list'

export const startEditQuiz = quiz => dispatch =>
  pathList.quizzes.edit(quiz).then(quiz => dispatch(editQuiz(quiz)))

export const editQuiz = quiz => ({
  type: 'EDIT_QUIZ',
  quiz
})

export const startGetUserQuizzes = author => dispatch => {
  console.log('getting user quizzes')
  pathList.quizzes.display(author).then(async quizzes => {
    const all = await Promise.all(
      quizzes.map(async quiz => {
        const questions = await pathList.questions.display(quiz.uuid)
        const tags = await pathList.questions.displayTags(quiz.uuid)

        // will contain quiz details, its questions, and tags
        return { ...quiz, questions, tags }
      })
    )
    dispatch(getUserQuizzes(all))
  })
}

export const getUserQuizzes = quizzes => ({
  type: 'ALL_QUIZZES',
  quizzes
})

// DELETE
export const startDisplayQuizQuestions = quizUUID => dispatch =>
  pathList.questions
    .display(quizUUID)
    .then(questions => dispatch(displayQuizQuestions(questions)))

// DELETE
export const displayQuizQuestions = questions => ({
  type: 'DISPLAY_QUIZ_QUESTIONS',
  questions
})

// DELETE
export const startDisplayQuizTags = quizUUID => dispatch =>
  pathList.questions.displayTags(quizUUID)
// .then(tags => dispatch(displayQuizTags(tags)))

export const displayQuizTags = tags => ({
  type: 'DISPLAY_QUIZ_TAGS',
  tags
})
