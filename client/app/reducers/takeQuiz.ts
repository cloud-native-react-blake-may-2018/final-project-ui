import React from 'react'

interface ITakeQuiz {
  questionNumber: number
  quizAttemptInfoObj: any
  answerArray: object[]
}

const initialState: ITakeQuiz = {
  questionNumber: 0,
  quizAttemptInfoObj: null,
  answerArray: []
}

export const takeQuizReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'ADD_ANSWER_TO_OBJECT':
      console.log('answer ', action.answerObj)
      return {
        ...state,
        answerArray: [...state.answerArray, action.answerObj]
      }

    case 'CHANGE_QUESTION_NUMBER':
      console.log('questions ', action.questionNumber)
      return {
        ...state,
        questionNumber: action.questionNumber
      }

    case 'QUIZ_ATTEMPT_INFO':
      console.log('questions ', action.quizAttemptInfo)
      return {
        ...state,
        quizAttemptInfoObj: action.quizAttemptInfo
      }

    default:
      return state
  }
}
