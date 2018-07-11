import React from 'react'
import { startGetUserQuizzes } from './quizzes'
// import api from '../api'
import * as awsCognito from 'amazon-cognito-identity-js'
export const login = user => ({
  type: 'LOGIN',
  user
})

export const startLogin = credentials => {
  return async dispatch => {
    console.log('credentials', credentials)
    await dispatch(login(credentials))
    // localStorage.setItem('token', credentials.token)

    return await dispatch(startGetUserQuizzes(credentials.username))
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  // removes everything from aws
  localStorage.clear()
  dispatch(logout())
}
