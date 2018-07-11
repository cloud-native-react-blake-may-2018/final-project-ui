import React from 'react'
import { addMultipleChoiceAnswer } from '../actions/quizzes'

interface ITakeQuiz {
  questionNumber: number
  quizAttemptInfoObj: any
  multipleChoiceAnswer: any
  multipleSelectAnswer: any
  answerArray: any[]
}

const initialState: ITakeQuiz = {
  questionNumber: 0,
  quizAttemptInfoObj: null,
  multipleChoiceAnswer: null,
  multipleSelectAnswer: {
    author: '',
    title: '',
    answer: []
  },
  answerArray: []
}

export const takeQuizReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'ADD_ANSWER_TO_OBJECT':
      console.log('answer ', action.answerObj)
      return {
        ...state,
        answerArray: [...state.answerArray, action.answerObj],
        multipleSelectAnswer: {
          author: '',
          title: '',
          answer: []
        },
        multipleChoiceAnswer: null
      }

    case 'CHANGE_QUESTION_NUMBER':
      return {
        ...state,
        questionNumber: action.questionNumber
      }

    case 'ADD_MULTIPLE_SELECT_ANSWER':
      console.log('multiple select ', action.answerObj.answer)
      return {
        ...state,
        multipleSelectAnswer: {
          author: action.answerObj.author,
          title: action.answerObj.title,
          answer: action.answerObj.answer
        }
      }
    case 'UPDATE_MULTIPLE_SELECT_ANSWER':
      console.log('multiple select ', action.answerArray)
      return {
        ...state,
        multipleSelectAnswer: {
          ...state.multipleSelectAnswer,
          answer: action.answerArray
        }
      }
    case 'ADD_MULTIPLE_CHOICE_ANSWER':
      console.log('multiple choice ', action.answerObj)
      return {
        ...state,
        multipleChoiceAnswer: action.answerObj
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
